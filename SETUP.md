# Portfolio Setup Guide

## ✅ Features Implemented

Your portfolio now includes all the requested features:

### Core Features
- ✅ Hero Section with animated introduction, social links, and CV download
- ✅ About Me section with professional summary and strengths
- ✅ Skills section with interactive progress bars and circular indicators
- ✅ Projects section with GitHub integration and filtering
- ✅ Experience & Education timeline
- ✅ GitHub Activity Chart
- ✅ Instagram Feed Carousel
- ✅ Contact Form with Google Sheets integration
- ✅ Dark/Light mode toggle
- ✅ Particle background animations
- ✅ Glassmorphism design
- ✅ Fully responsive and mobile-friendly
- ✅ SEO optimization

## 📋 Setup Instructions

### 1. CV/Resume File

Place your CV file in the `public/resume/` directory:
```
public/
  resume/
    Dakhin_Tudu_Resume.pdf
```

The download button in the Hero section will automatically link to this file.

### 2. Google Sheets Integration (Contact Form)

To enable the contact form to save submissions to Google Sheets:

#### Step 1: Create a Google Sheet
1. Create a new Google Sheet
2. Add headers in the first row: `Timestamp`, `Name`, `Email`, `Message`

#### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete the default code and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Message']);
    }
    
    // Append the form data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message
    ]);
    
    return ContentService.createTextOutput(
      JSON.stringify({success: true})
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({success: false, error: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

#### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" → **Web app**
3. Set:
   - **Description**: Contact Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web App URL**

#### Step 4: Add Environment Variable
1. Create a `.env` file in the root directory
2. Add your Web App URL:
```
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

3. Restart your development server

### 3. Instagram Feed (Optional)

The Instagram feed currently uses placeholder data. To integrate real Instagram posts:

#### Option A: Instagram Basic Display API
1. Create a Facebook App at https://developers.facebook.com/
2. Get Instagram Basic Display API credentials
3. Update `src/components/InstagramFeed.tsx` with your API endpoint

#### Option B: Use a Third-Party Service
- EmbedSocial
- SnapWidget
- Elfsight

Update the `fetchPosts` function in `InstagramFeed.tsx` accordingly.

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
# Google Sheets Integration
VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec

# Optional: Instagram API
# VITE_INSTAGRAM_ACCESS_TOKEN=your_token_here
```

**Important**: Add `.env` to your `.gitignore` file to keep your credentials secure.

## 🚀 Deployment

### Netlify
1. Build command: `npm run build` or `bun run build`
2. Publish directory: `dist`
3. Add environment variables in Netlify dashboard

### Vercel
1. Import your repository
2. Framework preset: Vite
3. Add environment variables in project settings

## 📝 Customization

### Update Personal Information
- Edit `src/pages/Index.tsx` for meta tags
- Update social links in each component
- Modify experience/education data in `ExperienceSection.tsx`

### Styling
- Colors: `src/index.css` (CSS variables)
- Components: `src/components/`
- Tailwind config: `tailwind.config.ts`

## 🔧 Troubleshooting

### Contact Form Not Working
- Check that `VITE_GOOGLE_SHEETS_URL` is set correctly
- Verify Google Apps Script is deployed and accessible
- Check browser console for errors

### CV Download Not Working
- Ensure file exists at `public/resume/Dakhin_Tudu_Resume.pdf`
- Check file name matches exactly (case-sensitive)

### GitHub Activity Chart Not Showing
- The chart uses an external service (ghchart.rshah.org)
- It should work automatically with your GitHub username

## 📚 Additional Resources

- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Framer Motion Documentation](https://www.framer.com/motion/)

