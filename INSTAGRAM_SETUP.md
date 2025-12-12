# Instagram Feed Setup Guide

## Current Status
The Instagram feed is currently showing **placeholder images**. To display your real Instagram posts, choose one of the options below.

## Option 1: Instagram RSS Feed (Simplest - No API)

### Using RSS2JSON Service
1. The component already has code commented out for RSS feed
2. Uncomment the RSS feed code in `InstagramFeed.jsx`
3. The service `rss2json.com` provides a free API to convert Instagram RSS to JSON

**Pros:**
- Free
- No authentication needed
- Simple setup

**Cons:**
- May have rate limits
- Requires CORS proxy
- May not always work reliably

## Option 2: Third-Party Services (Recommended - Easiest)

### EmbedSocial
1. Sign up at https://www.embedsocial.com/
2. Connect your Instagram account
3. Get embed code
4. Replace the carousel with the embed code

### SnapWidget
1. Visit https://snapwidget.com/
2. Create a free widget
3. Copy the embed code
4. Add to your component

### Elfsight Instagram Feed
1. Visit https://elfsight.com/instagram-feed/
2. Create widget
3. Get embed code

## Option 3: Instagram Basic Display API (Most Control)

### Requirements:
- Backend server (Node.js, Python, etc.)
- Instagram App setup
- OAuth authentication

### Steps:
1. Create Instagram App at https://developers.facebook.com/
2. Set up OAuth flow
3. Get access token
4. Create backend endpoint to fetch posts
5. Update `InstagramFeed.jsx` to call your backend

### Backend Example (Node.js):
```javascript
// Backend endpoint
app.get('/api/instagram-posts', async (req, res) => {
  const response = await fetch(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,permalink&access_token=${ACCESS_TOKEN}`
  );
  const data = await response.json();
  res.json(data.data);
});
```

## Option 4: Hide the Section (If Not Needed)

If you don't want to show Instagram posts, you can:
1. Remove `<InstagramFeed />` from `src/pages/Index.jsx`
2. Or comment it out

## Quick Fix: Use Better Placeholders

For now, you can replace placeholder URLs with actual images:
- Upload images to your `public` folder
- Update `media_url` in the mockPosts array

Example:
```javascript
media_url: "/images/instagram-post-1.jpg",
```

## Recommended Approach

For a production portfolio, I recommend:
1. **Short term**: Use better placeholder images or hide the section
2. **Long term**: Use EmbedSocial or SnapWidget for easy integration
3. **Advanced**: Set up Instagram Basic Display API if you need full control

