# Instagram API Credentials — TotalBiz Support

## 1. Account Details
- **Instagram Handle:** `@TotalBiz_Support`
- **Instagram Business Account ID:** `17841437512971881`
- **Linked Facebook Page:** TotalBiz Support (`1207871262402389`)
- **Page Access Token (Permanent / Long-Lived):** `EAAT9dJ4m67cBSDpkk3W4am24Tl5U2EKmpyXbyDZCiqGaIqZCN6wZAc293ebKgWQEJy2S3KfbOv8TTSf3BYZCmYldoR35RUBStp3h2wRQRdmi0ZCyKWeENHMBPZA0qc2VAB70bSGKDzB3kwS6MZCiJQAfC7VZCli4qAqu0Lr2nT77bAHMDWSQr2KeW6G3ARKv9Mk3meUjdYsMFivZBnT80nNRQL0WB3XKgjsEjwiLd27ktPLceMFNp9JikZAZCR8GwZDZD`

---

## 2. Configured Meta Permissions
- `pages_show_list`
- `pages_manage_posts`
- `pages_read_engagement`
- `pages_manage_engagement`
- `instagram_basic`
- `instagram_content_publish`
- `instagram_manage_insights`
- `instagram_manage_comments`
- `read_insights`

---

## 3. Automated Reel Publishing Protocol
- **Container Endpoint:** `POST /v19.0/17841437512971881/media`
  - Parameters: `media_type=REELS`, `video_url=<PUBLIC_HTTPS_URL>`, `caption=<CAPTION_TEXT>`
- **Publish Endpoint:** `POST /v19.0/17841437512971881/media_publish`
  - Parameters: `creation_id=<CONTAINER_ID>`
