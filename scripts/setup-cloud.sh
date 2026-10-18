#!/usr/bin/env bash
set -euo pipefail
cd /workspace/murder-mystery
export npm_config_cache=/workspace/.npm-cache
export ELECTRON_CACHE=/workspace/.cache/electron
export ELECTRON_BUILDER_CACHE=/workspace/.cache/electron-builder
export XDG_CACHE_HOME=/workspace/.cache
export NODE_USE_ENV_PROXY=1
if [ -n "${HTTPS_PROXY:-}" ]; then
  export ELECTRON_GET_USE_PROXY=1
  export GLOBAL_AGENT_HTTP_PROXY="$HTTPS_PROXY"
fi
npm ci --no-audit --no-fund
node node_modules/electron/install.js
npm run build
