#!/usr/bin/env bash
set -euo pipefail

OUT_DIR="docs/context"
TREE_FILE="$OUT_DIR/tree.txt"
FILE_LIST="$OUT_DIR/file-list.txt"
SOURCE_BUNDLE="$OUT_DIR/source-files.md"

mkdir -p "$OUT_DIR"

echo "Creating AstroBlog context snapshot..."

# 1. Capture a clean project tree, excluding generated/dependency folders.
if command -v tree >/dev/null 2>&1; then
  tree \
    -I 'node_modules|dist|.git|.astro|lh-reports|coverage|.wrangler|.pnpm|pagefind|.playwright-mcp|.agents' \
    > "$TREE_FILE"
else
  find . \
    -path './node_modules' -prune -o \
    -path './dist' -prune -o \
    -path './.git' -prune -o \
    -path './.astro' -prune -o \
    -path './lh-reports' -prune -o \
    -path './coverage' -prune -o \
    -path './.playwright-mcp' -prune -o \
    -path './.agents' -prune -o \
    -path './contact-worker/.wrangler' -prune -o \
    -type f \
    -print \
    | sort > "$TREE_FILE"
fi

# 2. Collect source/context files only.
find . \
  -path './node_modules' -prune -o \
  -path './dist' -prune -o \
  -path './.git' -prune -o \
  -path './.astro' -prune -o \
  -path './lh-reports' -prune -o \
  -path './coverage' -prune -o \
  -path './.playwright-mcp' -prune -o \
  -path './.agents' -prune -o \
  -path './contact-worker/.wrangler' -prune -o \
  -path './docs/context' -prune -o \
  -type f \( \
    -name '*.astro' -o \
    -name '*.ts' -o \
    -name '*.js' -o \
    -name '*.mjs' -o \
    -name '*.cjs' -o \
    -name '*.md' -o \
    -name '*.mdx' -o \
    -name '*.json' -o \
    -name '*.jsonc' -o \
    -name '*.css' -o \
    -name '*.toml' -o \
    -name '*.yml' -o \
    -name '*.yaml' -o \
    -name '*.txt' \
  \) \
  -print \
  | sort > "$FILE_LIST"

# 3. Bundle the files into one Markdown document.
{
  echo "# AstroBlog Source Context Snapshot"
  echo
  echo "Generated on: $(date)"
  echo
  echo "This file is an AI-readable source snapshot for project review."
  echo
  echo "Generated/dependency folders are intentionally excluded."
  echo
  echo "## Project Tree"
  echo
  echo '```txt'
  cat "$TREE_FILE"
  echo '```'
  echo
  echo "## Included Files"
  echo
  echo '```txt'
  cat "$FILE_LIST"
  echo '```'
  echo

  while IFS= read -r file; do
    # Remove leading ./ for cleaner headings.
    clean_file="${file#./}"

    echo
    echo "---"
    echo
    echo "## $clean_file"
    echo

    case "$file" in
      *.astro) lang="astro" ;;
      *.ts) lang="ts" ;;
      *.js|*.mjs|*.cjs) lang="js" ;;
      *.md|*.mdx) lang="md" ;;
      *.json|*.jsonc) lang="json" ;;
      *.css) lang="css" ;;
      *.toml) lang="toml" ;;
      *.yml|*.yaml) lang="yaml" ;;
      *.txt) lang="txt" ;;
      *) lang="txt" ;;
    esac

    echo "\`\`\`$lang"
    cat "$file"
    echo
    echo "\`\`\`"
  done < "$FILE_LIST"
} > "$SOURCE_BUNDLE"

echo "Done."
echo
echo "Created:"
echo "  $TREE_FILE"
echo "  $FILE_LIST"
echo "  $SOURCE_BUNDLE"
