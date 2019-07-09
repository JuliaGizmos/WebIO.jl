#!/bin/bash
set -e

WEBIO_DIR=$(dirname $0)
PACKAGES_DIR="$WEBIO_DIR/packages"

if [ ! -d "$PACKAGES_DIR" ]; then
  echo "ERROR: Cannot find packages dir: $PACKAGES_DIR" >&2
fi

VERSION=$(julia -e "using Pkg.TOML; print(TOML.parsefile(\"$WEBIO_DIR/Project.toml\")[\"version\"])")
echo "Publishing WebIO@$VERSION"

npm -C "$PACKAGES_DIR" run build-prod
