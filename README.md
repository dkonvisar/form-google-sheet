Code to insert to App Script

```javascript
function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  // Honeypot check
  if (data.website && data.website.trim() !== '') {
    return ContentService.createTextOutput(JSON.stringify({ result: 'spam' })).setMimeType(
      ContentService.MimeType.JSON
    );
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  sheet.appendRow([new Date(), data.name, data.email]);

  return ContentService.createTextOutput(JSON.stringify({ result: 'success' })).setMimeType(
    ContentService.MimeType.JSON
  );
}
```
