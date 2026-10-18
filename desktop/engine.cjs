const fs = require('node:fs');
const path = require('node:path');
const model = JSON.parse(require('node:zlib').gunzipSync(fs.readFileSync(path.join(__dirname, '../private/runtime.dat'))).toString('utf8'));
function validate(input = {}) {
  const keys = Object.keys(model.answers);
  if (!keys.every(k => typeof input[k] === 'string')) return {ok:false,code:'incomplete'};
  const refs = Array.isArray(input.evidence) ? [...new Set(input.evidence.filter(x => typeof x === 'string'))] : [];
  const minimum = [2,1,2,2,1,1];
  const supported = model.evidenceGroups.every((g,i) => g.filter(x => refs.includes(x)).length >= minimum[i]);
  const sequence = Array.isArray(input.sequence) && input.sequence.length === model.sequence.length && model.sequence.every((v,i)=>input.sequence[i]===v);
  const coherent = keys.every(k => input[k] === model.answers[k]) && sequence;
  return {ok:coherent && supported, code: !coherent ? 'review' : !supported ? 'support' : 'accepted'};
}
function reveal(input) {
  if (input?.confirm !== true) throw new Error('Explicit confirmation required');
  return model.reveal;
}
const hints = {
  timing: [
    ['נסו לבנות ציר זמן אחד ממקורות שמשתמשים בשעונים שונים.','Try building one timeline from sources that use different clocks.'],
    ['השוו את דוח הכיול בתיק לרישומי הגישה במאגר.','Compare the dossier clock report with the Records access log.'],
    ['P13 מציג שעון מכשיר ושעון ייחוס. קבעו מי מקדים, תקנו את R01 ואז השוו ל־R05 ול־P05.','P13 gives device and reference times. Establish which is fast, correct R01, then compare with R05 and P05.']
  ],
  access: [
    ['הפרידו בין בעלות על כרטיס לבין החזקתו באותו ערב.','Separate ownership of a badge from possession that evening.'],
    ['בדקו הודעות צוות, מסירת מפתחות והבדל בין יציאה בחזית לחזרה מאחור.','Check staff messages, key custody, and the difference between leaving at the front and returning at the rear.'],
    ['הצליבו C01 ו־P12 עם R02–R03. מה כל מקור מוכיח, ומה הוא רק מאפשר?','Cross-check C01 and P12 against R02–R03. What does each prove, and what does it merely permit?']
  ],
  motive: [
    ['מניע זקוק למסמך תומך; מריבה לבדה אינה מספיקה.','A motive needs documentary support; an argument alone is insufficient.'],
    ['בדקו את המקור לחשבונית, את ההרשאות ואת תגובת הנמען לדוח.','Check the invoice origin, approval rights and the recipient’s response to the report.'],
    ['השוו P11 ל־F04–F05 ולשרשור M01–M02. הבחינו בין חשבונית שטרם שולמה לבין תשלומים קודמים.','Compare P11 with F04–F05 and M01–M02. Distinguish the unpaid invoice from earlier payments.']
  ],
  alternatives: [
    ['בחנו הסבר חלופי רציני לפני הגשת הדוח.','Test a serious alternative before submitting.'],
    ['אילו מקורות מאמתים מיקום, ואילו רק חוזרים על דברי אדם?','Which sources independently verify location, and which merely repeat a claim?'],
    ['R04 ו־R06 מציגים אימותים חיצוניים. בדקו אם כל הסבר שוקל גם מניע וגם אפשרות פיזית להגיע.','R04 and R06 contain external checks. Consider both motive and physical opportunity in every explanation.']
  ],
  synthesis: [
    ['הציבו בטבלה טענה, ראיה תומכת והסבר חלופי.','Make a table of claim, supporting evidence and alternative explanation.'],
    ['חפשו הסבר שמחבר יחד זמן, גישה, מניע וממצא פיזי, בלי להמציא פרט חסר.','Seek an account connecting time, access, motive and physical findings without inventing a missing detail.'],
    ['בדוח הסופי תמכו בכל סוג טענה: כיול וגישה, חזקת כרטיס, מסלול חזרה, חשבונות, אימות מיקום ומעבדה. אין צורך לנחש את תוכן השיחה.','Support every kind of claim: clock and access, badge custody, return route, accounts, location checks and laboratory findings. You need not invent the conversation.']
  ]
};
function hint(input={}) {
  const seen=new Set(Array.isArray(input.seen)?input.seen:[]);
  const group = !seen.has('P13') || !seen.has('R01') ? 'timing' : !seen.has('C01') || !seen.has('R02') || !seen.has('R03') ? 'access' : !seen.has('F04') || !seen.has('F05') ? 'motive' : !seen.has('R04') ? 'alternatives' : 'synthesis';
  const level=Math.min(3,Math.max(1,Number(input.level)||1));
  const [he,en]=hints[group][level-1]; return {group,level,text:{he,en}};
}
module.exports={validate,reveal,hint};
