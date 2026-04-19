#!/usr/bin/env bash

set -euo pipefail

print_result() {
  local label="$1"
  local value="$2"
  printf '%-20s %s\n' "$label" "$value"
}

find_browser() {
  local candidates=(
    "google-chrome"
    "google-chrome-stable"
    "chromium"
    "chromium-browser"
    "microsoft-edge"
    "microsoft-edge-stable"
    "msedge"
  )

  for browser in "${candidates[@]}"; do
    if command -v "$browser" >/dev/null 2>&1; then
      echo "$browser"
      return 0
    fi
  done

  return 1
}

print_result "node" "$(node --version 2>/dev/null || echo 'missing')"

if command -v npm >/dev/null 2>&1; then
  print_result "npm" "$(npm --version)"
else
  print_result "npm" "missing"
fi

if command -v pnpm >/dev/null 2>&1; then
  print_result "pnpm" "$(pnpm --version)"
else
  print_result "pnpm" "(optional, trainer)"
fi

if command -v git >/dev/null 2>&1; then
  print_result "git" "$(git --version)"
else
  print_result "git" "missing"
fi

if browser="$(find_browser)"; then
  print_result "browser" "$browser"
else
  print_result "browser" "missing"
fi

