#!/bin/bash
# Convert HEIC files to PNG using macOS sips
# Usage: ./scripts/convert-heic.sh <input.heic> <output.png>
#    or: ./scripts/convert-heic.sh <directory>  (converts all HEIC files in-place to PNG)

set -euo pipefail

if [ $# -eq 0 ]; then
  echo "Usage:"
  echo "  $0 <input.heic> <output.png>   Convert a single file"
  echo "  $0 <directory>                  Convert all HEIC files in directory to PNG"
  exit 1
fi

if [ $# -eq 2 ]; then
  sips -s format png "$1" --out "$2"
  echo "Converted $1 -> $2"
elif [ -d "$1" ]; then
  for f in "$1"/*.HEIC "$1"/*.heic; do
    [ -f "$f" ] || continue
    out="${f%.*}.png"
    sips -s format png "$f" --out "$out"
    echo "Converted $f -> $out"
  done
else
  echo "Error: '$1' is not a directory and no output path was provided"
  exit 1
fi
