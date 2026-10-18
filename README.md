# CASE FILES

חקירת בלש לשחקן יחיד, בעברית ובאנגלית. רצח בדיוני, רמת קושי בינונית, כ־60–90 דקות בחקירה ראשונה. ללא אלימות גרפית. זהו משחק בדיוני וכל הדמויות והארגונים מומצאים.

## לשחק ב־Windows 11

1. פתחו את `release/Case-Files-1.0.0-Windows.exe` במחשב Windows בעל מעבד x64. זהו יישום נייד; אין צורך ב־Node.js, בשרת או בחשבון.
2. בחרו שפה. בתפריט הראשי פתחו **תיק החקירה להדפסה** ובחרו PDF בעברית או באנגלית. אפשר לבחור גרסה חסכונית בדיו. מומלץ להדפיס בגודל A4, בקנה מידה 100%.
3. התחילו חקירה חדשה. אפשר לקרוא את כל דפי התיק גם בסייר הקבצים במחשב המשחק.
4. ההתקדמות נשמרת מקומית. להפסקה חזרו לתפריט; בפתיחה הבאה בחרו **המשך חקירה**. איפוס מחייב אישור.

היישום פועל ללא אינטרנט לאחר ההורדה. שפת הממשק ניתנת להחלפה תוך שמירת ההתקדמות. הגשת דוח אינה חושפת את הפתרון; נדרשת בחירה מפורשת נוספת.

קובץ Windows נבנה בסביבת Linux ואינו חתום בחתימה דיגיטלית. הרצה על Windows אמיתי לא אומתה כאן. סטטוס הבדיקות מפורט ב־[QA.md](QA.md).

## Play in English

Open `release/Case-Files-1.0.0-Windows.exe` on Windows 11 x64. Select English, open **Print investigation file**, then begin a new investigation. All four PDF editions are also in `public/dossiers`. No account, terminal, server or internet is required during play. Progress is stored in the operating system's per-user application-data folder; keep playing under the same Windows user account.

The executable is unsigned and was cross-built on Linux. Actual Windows execution has not been verified in this environment. See [QA.md](QA.md).

## Development — no story spoilers

Requires Node.js 22.12+ and npm. Use the existing checkout; cloud tasks are already isolated and do not need a worktree.

```sh
npm ci
npm run dev
```

The development command starts the React workstation and its loopback-only validation service together. The normal Windows application uses Electron IPC and starts no web server.

```sh
npm run check         # TypeScript, production bundle and core checks
npm run test:ui       # Full browser gameplay checks; run while npm run dev is active
npm run pdf           # Regenerate four dossier editions; requires Chromium
npm run package:win   # Build a portable Windows x64 EXE
npm run package:installer # Optional NSIS installer; build on Windows
```

On Windows, `Build-Windows.cmd` performs the portable build with a double click after Node.js is installed. Build dependencies require internet; gameplay does not. PDFs, fonts and photographs are included locally. `CHROMIUM_PATH` can select a Chromium executable for PDF and browser checks.

`npm start` launches the built Electron application. Native GUI tests (`npm run test:native`) require a working graphical desktop or X server and are separate from browser validation.

Do not open development-only authoring material before playing. The renderer contains player evidence only. Answer validation and the explicit ending are handled in the main process using a separate runtime resource. This prevents casual spoilers; it is not a security boundary against inspection by the machine owner. No application renderer source maps are distributed.

Notes and timeline entries remain in the language in which the player wrote them. All authored game material has matched Hebrew and English versions. Investigation duration is an estimate, not a measured human playtest guarantee.
