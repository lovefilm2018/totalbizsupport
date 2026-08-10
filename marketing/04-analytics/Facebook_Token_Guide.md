# Guide: Generating a Facebook Page Access Token (Meta API v19+)

This guide provides step-by-step instructions for generating a **Page Access Token** to automate posts on your Facebook Page. As you noted, the `manage_pages` and `publish_pages` permissions are deprecated. In modern Meta API versions (v19+), these have been replaced by more granular permissions.

---

## 1. Understanding the "Invalid Scopes" Error
The error `Invalid Scopes: manage_pages` occurs because Meta has deprecated this permission. To publish posts and manage a page today, you must use the following modern permissions:
*   **`pages_manage_posts`**: Allows the app to create, edit, and delete posts on the Page.
*   **`pages_read_engagement`**: Allows the app to read engagement data (likes, comments) on Page posts.
*   **`pages_show_list`**: Allows the app to see the list of Pages the user manages.
*   **`pages_manage_metadata`**: (Optional) Allows managing Page settings and information.

---

## 2. Meta App Configuration
Before using the Graph API Explorer, ensure your Meta App is configured correctly in the [Meta App Dashboard](https://developers.facebook.com/apps/):

1.  **App Type**: Ensure your app is a **Business** app type or has the **Facebook Login for Business** product added.
2.  **Use Cases**: Meta now organizes permissions into "Use Cases." Navigate to **Use Cases** in the left sidebar.
3.  **Add Use Case**: Click "Customize" or "Add" on the **Other** or **Manage your business** use case.
4.  **Permissions**: Ensure `pages_manage_posts` and `pages_read_engagement` are added to your app's requested permissions list.

---

## 3. Generating the Token in Graph API Explorer
Follow these steps in the [Graph API Explorer](https://developers.facebook.com/tools/explorer/):

### Step A: Initial Setup
1.  **Meta App**: Select your app (e.g., *TotalBiz Support Marketing*) from the dropdown.
2.  **User or Page**: Select **Get User Access Token**.
3.  **Permissions**: In the "Permissions" section, add the following:
    *   `pages_manage_posts`
    *   `pages_read_engagement`
    *   `pages_show_list`
    *   `public_profile`
4.  **Generate**: Click **Generate Access Token**. Follow the Facebook Login prompts and ensure you select the specific Page (*TotalBiz Support*) you want to manage.

### Step B: Switch to Page Token
1.  Once the User Token is generated, click the **User or Page** dropdown again.
2.  Under **Page Tokens**, select your specific Facebook Page (*TotalBiz Support*).
3.  The token in the "Access Token" field will now change to a **Page Access Token**.

---

## 4. Converting to a "Never-Expiring" Page Token
Tokens generated in the Explorer are "short-lived" (expire in ~1-2 hours). For an automated backend script, you need a "long-lived" token.

### Method 1: Using the Access Token Tool
1.  Copy the Page Access Token you just generated.
2.  Go to the [Access Token Tool](https://developers.facebook.com/tools/accesstoken/).
3.  Find your app and click **Debug** next to the token.
4.  Click **Extend Access Token**. This will give you a token valid for 60 days.

### Method 2: The "Permanent" Page Token Flow
To get a Page Token that **never expires**, follow this logic:
1.  **Get a Long-Lived User Token**: Exchange your short-lived User Token for a long-lived one (60 days) using the `/oauth/access_token` endpoint.
2.  **Request Page Accounts**: Use that long-lived User Token to call the `/me/accounts` endpoint.
3.  **Result**: The Page Access Tokens returned from this call (when using a long-lived User Token) **do not have an expiration date**.

---

## 5. Testing the Token
To verify your token works for publishing, try a `POST` request in the Explorer:
*   **Endpoint**: `/{page-id}/feed`
*   **Method**: `POST`
*   **Parameters**: `message` = "Hello from Meta API v19!"
*   **Submit**: If successful, you will receive a JSON response with a post ID.

> **Pro Tip**: Always use the latest API version (e.g., `v19.0` or higher) in the dropdown at the top of the Graph API Explorer to ensure compatibility with modern permissions.
