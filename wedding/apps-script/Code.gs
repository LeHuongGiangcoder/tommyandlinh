/**
 * Tommy & Linh — RSVP backend (replaces the n8n webhook).
 *
 * Setup:
 * 1. Open the "[Tommy & Linh] RSVP Output" sheet → Extensions → Apps Script.
 * 2. Paste this file into Code.gs and save.
 * 3. Deploy → New deployment → type "Web app"
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the Web app URL (ends in /exec) and use it as the RSVP endpoint.
 *
 * After editing this script, use Deploy → Manage deployments → Edit → New version
 * so the same /exec URL serves the new code.
 */

const SHEET_NAME = 'Response';

// Sheet columns: A Full name | B Will you attend? | C Number of guests |
//                D Meal Preference | E Dietary Restrictions | F Message to the us | G Submitted at
const MEAL_LABELS = { standard: 'Standard', vegetarian: 'Vegetarian', vegan: 'Vegan' };
const ATTENDANCE_LABELS = { yes: 'Yes', no: 'No' };

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = parseBody_(e);
    const name = clean_(data.guest_name);
    const attendance = clean_(data.attendance).toLowerCase();

    if (!name || !ATTENDANCE_LABELS[attendance]) {
      return json_({ ok: false, error: 'Missing name or attendance' });
    }

    const guests = attendance === 'yes' ? Math.min(Math.max(parseInt(data.num_guests, 10) || 1, 1), 10) : 0;
    const meal = clean_(data.meal_preference).toLowerCase();

    const sheet = getSheet_();
    if (!sheet.getRange('G1').getValue()) sheet.getRange('G1').setValue('Submitted at');

    sheet.appendRow([
      name,
      ATTENDANCE_LABELS[attendance],
      guests,
      attendance === 'yes' ? (MEAL_LABELS[meal] || meal) : '',
      clean_(data.dietary_restrictions),
      clean_(data.message),
      new Date(),
    ]);

    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Lets you open the /exec URL in a browser to check the deployment is live.
function doGet() {
  return json_({ ok: true, service: 'tommy-linh-rsvp' });
}

function parseBody_(e) {
  if (e && e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (_) {
      // fall through to form-encoded parameters
    }
  }
  return (e && e.parameter) || {};
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error('Sheet "' + SHEET_NAME + '" not found');
  return sheet;
}

// Trims, caps length, and neutralises values that Sheets would treat as formulas.
function clean_(value) {
  let s = value == null ? '' : String(value).trim().slice(0, 1000);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
