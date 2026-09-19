#!/usr/bin/env bash
# ─── install-git-save.sh — installeer git-save op deze machine ─────────────
#
# Eenmalig per machine. Maakt het commando 'git-save' overal beschikbaar.
# Werkt op Linux, macOS en Windows (Git Bash).
#
# Gebruik:
#   bash scripts/install-git-save.sh

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/git-save"

if [ ! -f "$SRC" ]; then
  echo "Fout: $SRC niet gevonden. Start dit script vanuit de repo." >&2
  exit 1
fi

# Op Windows is ~/bin niet standaard op PATH; ~/.local/bin evenmin.
# Daarom installeren we op de plek die op dit systeem wél werkt.
case "$(uname -s)" in
  MINGW*|MSYS*|CYGWIN*) DEST="$HOME/bin" ;;   # Git Bash
  *)                    DEST="$HOME/.local/bin" ;;
esac

mkdir -p "$DEST"
cp "$SRC" "$DEST/git-save"
chmod +x "$DEST/git-save"

echo "✅ git-save geïnstalleerd in: $DEST/git-save"

# ── PATH-check ─────────────────────────────────────────────────────────────
if command -v git-save >/dev/null 2>&1 && [ "$(command -v git-save)" = "$DEST/git-save" ]; then
  echo "   Staat al op je PATH — je kunt meteen 'git-save' gebruiken."
  exit 0
fi

if ! echo ":$PATH:" | grep -q ":$DEST:"; then
  echo ""
  echo "⚠️  $DEST staat NIET op je PATH."
  echo ""
  echo "Voeg dit toe aan ~/.bashrc:"
  echo ""
  echo "    export PATH=\"\$HOME/bin:\$HOME/.local/bin:\$PATH\""
  echo ""
  echo "Daarna: source ~/.bashrc"
  echo "Of gebruik het volledige pad: $DEST/git-save \"bericht\""
fi
