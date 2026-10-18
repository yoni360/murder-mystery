# Working on CASE FILES

Keep chat, terminal summaries, screenshots, filenames and change summaries spoiler-free. Never print the private case model, answer data, ending text or a player's solved report. All names and evidence interpretations belong inside the game, not development summaries.

The source checkout is `/workspace/murder-mystery`. Cloud tasks already run in an isolated environment. Use this checkout; do not create a Git worktree unless explicitly requested.

This is a bilingual Hebrew-default / English offline game. Use stable evidence IDs in both translations. Preserve RTL layout and local font/image/PDF paths. Story runtime resources must stay outside the renderer and public HTTP routes. Authoring notes are excluded from packaged applications.

Use `npm ci` and `npm run check`. `npm run dev` runs both development services. With that command running, `npm run test:ui` checks gameplay without displaying the solution. Browser tests require Chromium; native Electron checks additionally need a working GUI. Review `QA.md` for actual platform coverage. Never claim Windows execution was tested merely because cross-compilation succeeded.

Only an explicitly requested isolated blind review may read player-visible material in a separate context. It must not receive author notes or the main-process validation resource before its attempt is complete.
