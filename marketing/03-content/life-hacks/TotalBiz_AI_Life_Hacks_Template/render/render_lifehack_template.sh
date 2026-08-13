#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./render_lifehack_template.sh /absolute/path/to/new_tutorial.mp4 output_lifehack.mp4
#
# Before rendering, update the title and step copy in lifehack_filter_template.txt.

TEMPLATE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TUTORIAL_VIDEO="${1:?Provide a vertical tutorial recording path as the first argument.}"
OUTPUT_VIDEO="${2:-${TEMPLATE_DIR}/output/totalbiz_ai_life_hack.mp4}"

mkdir -p "$(dirname "$OUTPUT_VIDEO")"

ffmpeg -y \
  -i "$TUTORIAL_VIDEO" \
  -loop 1 -i "$TEMPLATE_DIR/assets/phone_in_hand_green_screen.png" \
  -loop 1 -i "$TEMPLATE_DIR/assets/presenter_portrait.png" \
  -loop 1 -i "$TEMPLATE_DIR/assets/totalbiz_logo_dark_blended.png" \
  -filter_complex_script "$TEMPLATE_DIR/render/lifehack_filter_template.txt" \
  -map '[final]' -map 0:a? \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p \
  -c:a aac -b:a 160k -shortest -movflags +faststart \
  "$OUTPUT_VIDEO"

echo "Created: $OUTPUT_VIDEO"
