/**
 * Google Sheets API Integration
 * 
 * This function submits form data to Google Sheets using Google Apps Script Web App.
 * 
 * Setup Instructions:
 * 1. Create a Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Create a new script with the following code:
 * 
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   sheet.appendRow([new Date(), data.name, data.email, data.message]);
 *   return ContentService.createTextOutput(JSON.stringify({success: true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Deploy as Web App (Execute as: Me, Who has access: Anyone)
 * 5. Copy the Web App URL and set it as VITE_GOOGLE_SHEETS_URL in .env
 */

export const submitToGoogleSheets = async (data) => {
  const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL;

  if (!scriptUrl) {
    console.warn("Google Sheets URL not configured. Form submission will be simulated.");
    // Simulate successful submission for development
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true };
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors", // Google Apps Script requires no-cors
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // With no-cors, we can't read the response, so we assume success
    // In production, you might want to use a backend proxy to handle this properly
    return { success: true };
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

