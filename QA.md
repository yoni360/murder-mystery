# CASE FILES — spoiler-free QA

Prepared on 18 October 2026. This report contains no story solution.

The game targets a first investigation of 60–90 minutes at medium difficulty: five functional applications, fourteen A4 dossier pages in each language, twenty-four digital records and three case-specific generated location photographs. Hebrew is the default; English is complete. The default content exclusions from the interview were applied.

| Area | Result | Evidence and limits |
| --- | --- | --- |
| Application and browser gameplay | Passed | 16 end-to-end Chromium checks: launch, desktop, dragging, stacking, window controls, search and empty states, attachments, bookmarks, notes, timeline editing, persistence, languages, PDFs, hints, reports, explicit reveal, reset confirmation and narrow layouts. No renderer runtime errors. |
| Core checks and production build | Passed | TypeScript and Vite production build; 10 core tests executed, 10 passed, none skipped in this environment. |
| Story chronology | Passed | Private event chronology, calibrated record times, travel intervals, observation ordering, medical/call windows and source references checked. Witness claims are distinct from established facts. |
| Clue accessibility and dependency graph | Passed | Essential conclusions resolve to accessible starting materials. Graph is acyclic; no hidden prerequisite or impossible unlock is required. |
| Independent blind solver | Passed | A separate agent context read only player-visible materials, not the model, runtime validator or parent conversation. Its private theory matched the authoritative conclusion. Minor clarity recommendations were corrected and reviewed again using only player materials. This was an evidence-limited agent review, not a human playtest or a guarantee that every player will solve the case. |
| Alternative interpretations | Passed | Reviewer compared competing explanations and found no critical remaining ambiguity. The accepted answer does not require unsupported conversational details, exact physical mechanics or prior planning. |
| Duration and difficulty | Estimated | Internal gameplay budget is 75 minutes including reading, exploration, comparison, timeline reconstruction, alternatives and the final report. Blind review estimated 50–75 minutes for the evidence; desktop navigation and the interactive final reconstruction add work beyond that text-only review. No timed human playtest was performed. |
| Cross-media consistency | Passed | 38 shared evidence identifiers, valid references and attachments, matched photographs, and complementary paper/digital sources. All physical pages are also readable in Files. |
| Hebrew and English | Passed | Paired content throughout the five applications, reports, guidance and ending. Tests compare every explicit clock value and date across all materials. RTL/LTR switching preserves notes and selected evidence. User-written notes remain in their original language. |
| PDF rendering | Passed | Four editions: Hebrew, English and two low-ink variants. All are 14 A4 pages. Browser layout checks found no footer overlap; PDF extraction verified text and page bounds on every page. Rendered cover typography was inspected. Fonts and photographs are local. Printer hardware output was not tested. |
| Native Electron | Passed | 7 checks in Electron 44.9.0 under Linux/Xvfb: isolated preload, offline reload and case load, IPC report/hint handling, local disk saves, process-restart recovery, fullscreen and PDF routing. The OS PDF viewer was substituted in the bridge test; its actual Windows file association is outside this test. Container-only display flags were used; they are not added to the Windows launcher. |
| Packaged Linux application | Passed | The same 7 native checks passed against the packaged application, including an offline reload and process-restart persistence. Packaged PDF paths and the runtime resource were exercised. |
| Windows packaging | Built | Portable Windows x64 EXE cross-built with Electron Builder; archive integrity test and SHA-256 verification passed. Payload matches the current main process, runtime resource and player assets. All four PDFs are included. Authoring notes and application renderer source maps are excluded. |
| Windows execution | Not run | No actual Windows machine was available. The portable executable is unsigned. Windows startup, OS PDF associations and system-specific behaviour require an on-device check. The optional NSIS installer target was not completed in this Linux environment; a Windows build command is provided. |
| Reusable cloud setup | Saved | `install_script` and `start_skill` saved in the environment draft. Frozen-lockfile dependency installation and build were executed successfully. Saving a draft does not publish the environment or validate restoration in a new task. |

The release is a complete implemented game with the above platform-testing limit. The portable EXE is the player entry point; development dependencies and servers are unnecessary during normal play. The local main-process resource discourages accidental spoilers, but is not cryptographic protection against inspection by the owner of the computer.

To reproduce checks, see [README.md](README.md). To build on Windows, double-click `Build-Windows.cmd` after installing Node.js 22.12 or later.
