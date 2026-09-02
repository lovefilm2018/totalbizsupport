import os
import sys
import base64
import argparse
import re
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

SCOPES = [
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.modify'
]

def find_token():
    # Check current directory, project roots, and central locations
    paths = [
        os.path.join(os.getcwd(), "token.json"),
        r"C:\Users\TotalBiz\Documents\totalbizsupport\token.json",
        r"C:\Users\TotalBiz\Documents\LoveFilm\token.json",
        r"C:\Users\TotalBiz\Documents\Bijou\token.json",
        r"C:\Users\TotalBiz\Documents\DogField\token.json",
        r"C:\Users\TotalBiz\Documents\GBPublishing\token.json",
        r"C:\Users\TotalBiz\Documents\QuietSpace\token.json",
        r"C:\Users\TotalBiz\.gemini\gmail_token.json"
    ]
    for p in paths:
        if os.path.exists(p):
            return p
    return None

def get_service():
    token_file = find_token()
    if not token_file:
        print("Error: token.json not found in any workspace or central path.")
        sys.exit(1)
    creds = Credentials.from_authorized_user_file(token_file, SCOPES)
    if creds.expired and creds.refresh_token:
        from google.auth.transport.requests import Request
        try:
            creds.refresh(Request())
            with open(token_file, 'w') as f:
                f.write(creds.to_json())
        except Exception as e:
            print(f"Warning: Could not auto-refresh token: {e}")
    return build('gmail', 'v1', credentials=creds)

def extract_clean_text(payload):
    def _extract(p):
        if 'parts' in p:
            for part in p['parts']:
                if part.get('mimeType') == 'text/plain' and 'data' in part.get('body', {}):
                    return base64.urlsafe_b64decode(part['body']['data']).decode('utf-8', errors='replace')
                res = _extract(part)
                if res:
                    return res
        elif 'body' in p and 'data' in p['body']:
            raw = base64.urlsafe_b64decode(p['body']['data']).decode('utf-8', errors='replace')
            if p.get('mimeType') == 'text/html':
                clean = re.sub(r'<style.*?</style>', '', raw, flags=re.DOTALL)
                clean = re.sub(r'<script.*?</script>', '', clean, flags=re.DOTALL)
                clean = re.sub(r'<[^>]+>', ' ', clean)
                clean = re.sub(r'\s+', ' ', clean).strip()
                return clean
            return raw
        return None
    return _extract(payload)

def search_messages(query, max_results=10):
    service = get_service()
    res = service.users().messages().list(userId='me', q=query, maxResults=max_results).execute()
    messages = res.get('messages', [])
    if not messages:
        print(f"\n🔍 No messages found matching query: '{query}'")
        return

    print(f"\n🔍 Found {len(messages)} messages for '{query}':")
    print("=" * 85)
    for m in messages:
        msg = service.users().messages().get(
            userId='me', id=m['id'], format='metadata', 
            metadataHeaders=['From', 'To', 'Subject', 'Date']
        ).execute()
        headers = {h['name']: h['value'] for h in msg.get('payload', {}).get('headers', [])}
        print(f"Message ID: {m['id']}  |  Thread ID: {m['threadId']}")
        print(f"Date:       {headers.get('Date')}")
        print(f"From:       {headers.get('From')}")
        print(f"To:         {headers.get('To')}")
        print(f"Subject:    {headers.get('Subject')}")
        print(f"Snippet:    {msg.get('snippet', '')[:110]}...")
        print("-" * 85)

def read_thread(thread_id):
    service = get_service()
    t = service.users().threads().get(userId='me', id=thread_id, format='full').execute()
    messages = t.get('messages', [])
    
    print("\n" + "=" * 85)
    print(f"🧵 COMPLETE THREAD CONVERSATION HISTORY ({len(messages)} Messages)")
    print(f"Thread ID: {thread_id}")
    print("=" * 85)

    for i, msg in enumerate(messages, 1):
        headers = {h['name']: h['value'] for h in msg.get('payload', {}).get('headers', [])}
        body = extract_clean_text(msg.get('payload', {}))
        
        print(f"\n--- [MESSAGE {i}/{len(messages)}] (ID: {msg['id']}) ---")
        print(f"Date:    {headers.get('Date')}")
        print(f"From:    {headers.get('From')}")
        print(f"To:      {headers.get('To')}")
        print(f"Subject: {headers.get('Subject')}")
        print("-" * 50)
        if body:
            print(body[:2500])
            if len(body) > 2500:
                print("\n... [Truncated remaining content] ...")
        else:
            print(f"Snippet: {msg.get('snippet')}")
    print("\n" + "=" * 85)

def read_message(message_id):
    service = get_service()
    msg = service.users().messages().get(userId='me', id=message_id, format='full').execute()
    headers = {h['name']: h['value'] for h in msg.get('payload', {}).get('headers', [])}
    body = extract_clean_text(msg.get('payload', {}))
    
    print("\n" + "=" * 85)
    print(f"📧 MESSAGE: {message_id}  |  Thread ID: {msg.get('threadId')}")
    print("=" * 85)
    print(f"From:    {headers.get('From')}")
    print(f"To:      {headers.get('To')}")
    print(f"Subject: {headers.get('Subject')}")
    print(f"Date:    {headers.get('Date')}")
    print("-" * 85)
    if body:
        print(body)
    else:
        print(f"Snippet: {msg.get('snippet')}")
    print("=" * 85)

def reply_message(message_id, reply_body):
    service = get_service()
    orig = service.users().messages().get(userId='me', id=message_id, format='metadata', metadataHeaders=['From', 'Subject', 'Message-ID']).execute()
    headers = {h['name']: h['value'] for h in orig.get('payload', {}).get('headers', [])}
    
    from_sender = headers.get('From', '')
    orig_subject = headers.get('Subject', '')
    orig_msg_id = headers.get('Message-ID', '')
    thread_id = orig.get('threadId')

    subject = orig_subject if orig_subject.lower().startswith('re:') else f"Re: {orig_subject}"

    msg = MIMEMultipart()
    msg['To'] = from_sender
    msg['From'] = "Alex Poxon <totalbizsupport@gmail.com>"
    msg['Subject'] = subject
    if orig_msg_id:
        msg['In-Reply-To'] = orig_msg_id
        msg['References'] = orig_msg_id
    
    msg.attach(MIMEText(reply_body, 'plain'))
    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode('utf-8')

    draft_body = {
        'message': {
            'raw': raw,
            'threadId': thread_id
        }
    }
    draft = service.users().drafts().create(userId='me', body=draft_body).execute()
    print("\n" + "=" * 85)
    print("🎉 DRAFT REPLY CREATED IN GMAIL!")
    print(f"Draft ID:    {draft.get('id')}")
    print(f"Thread ID:   {thread_id}")
    print(f"Replying To: {from_sender}")
    print(f"Subject:     {subject}")
    print("=" * 85)
    print("Open Gmail to review the draft and click Send!")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Universal Gmail CLI Tool")
    subparsers = parser.add_subparsers(dest='cmd')

    # search / list
    p_search = subparsers.add_parser('search')
    p_search.add_argument('query', nargs='?', default='in:inbox', help='Search query across all mail')
    p_search.add_argument('--count', '-n', type=int, default=8, help='Max results')

    # list (alias)
    p_list = subparsers.add_parser('list')
    p_list.add_argument('--query', '-q', default='in:inbox', help='Search query')
    p_list.add_argument('--count', '-n', type=int, default=5, help='Max results')

    # thread
    p_thread = subparsers.add_parser('thread')
    p_thread.add_argument('id', help='Thread ID to read entire history of')

    # read
    p_read = subparsers.add_parser('read')
    p_read.add_argument('id', help='Message ID')

    # reply
    p_reply = subparsers.add_parser('reply')
    p_reply.add_argument('id', help='Message ID to reply to')
    p_reply.add_argument('body', help='Reply body text')

    args = parser.parse_args()
    if args.cmd == 'search':
        search_messages(args.query, max_results=args.count)
    elif args.cmd == 'list':
        search_messages(args.query, max_results=args.count)
    elif args.cmd == 'thread':
        read_thread(args.id)
    elif args.cmd == 'read':
        read_message(args.id)
    elif args.cmd == 'reply':
        reply_message(args.id, args.body)
    else:
        search_messages('in:inbox', 5)
