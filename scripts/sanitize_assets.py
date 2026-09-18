import os
import sys
from PIL import Image

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSET_DIRS = [
    os.path.join(BASE, 'client', 'public'),
    os.path.join(BASE, 'marketing', '03-content')
]

def sanitize_file(fpath):
    ext = os.path.splitext(fpath)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png']:
        return False
    with open(fpath, 'rb') as fp:
        raw = fp.read()
    has_c2pa = b'c2pa' in raw.lower()
    has_xmp = b'http://ns.adobe.com/xap' in raw
    if has_c2pa or has_xmp:
        fname = os.path.basename(fpath)
        print(f'Sanitizing {fname} (C2PA: {has_c2pa}, XMP: {has_xmp})')
        im = Image.open(fpath)
        mode = 'RGBA' if ext == '.png' and 'A' in im.mode else 'RGB'
        im_converted = im.convert(mode)
        clean_im = Image.new(mode, im_converted.size)
        clean_im.putdata(list(im_converted.getdata()))
        if ext in ['.jpg', '.jpeg']:
            clean_im.save(fpath, 'JPEG', quality=95, optimize=True)
        else:
            clean_im.save(fpath, 'PNG', optimize=True)
        with open(fpath, 'rb') as fp:
            new_raw = fp.read()
        still_c2pa = b'c2pa' in new_raw.lower()
        print(f'  -> Successfully sanitized {fname}! REMAINING_C2PA: {still_c2pa}')
        return True
    return False

def main():
    total = 0
    cleaned = 0
    for d in ASSET_DIRS:
        if not os.path.exists(d):
            continue
        print(f'\nChecking directory: {d}')
        for fname in os.listdir(d):
            fpath = os.path.join(d, fname)
            if os.path.isfile(fpath):
                total += 1
                if sanitize_file(fpath):
                    cleaned += 1
    print(f'\nDone! Scanned {total} files. Sanitized {cleaned} files.')

if __name__ == '__main__':
    main()
