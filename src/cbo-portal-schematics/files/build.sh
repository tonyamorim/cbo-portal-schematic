#!/bin/bash
set -euo pipefail
IFS=$'\n\t'

###############################
# Docker images build script
#
###############################

ATF_BASE='atf.intranet.bb.com.br:5333'
TAG=$(jq '.tag' image.json | cut -d'"' -f2)
REPOSITORY=$(jq '.repository' image.json | cut -d'"' -f2)
SCRIPT_NAME=$(basename "$0")

echo "[$SCRIPT_NAME] >> Searching for pre-build tests ..."
if [ -x "./tests/prebuild.sh" ]; then
  ./tests/prebuild.sh
else
  echo "[$SCRIPT_NAME] >> ./test/prebuild.sh not found. Ignoring pre-build tests."
  echo ''
fi

echo "[$SCRIPT_NAME] >> Validating Dockerfile ..."
docker run --rm -i atf.intranet.bb.com.br:5001/hadolint/hadolint:v1.16.3 < Dockerfile
echo ''

echo "[$SCRIPT_NAME] >> Building the image ..."
docker build \
       --rm \
       --tag="$ATF_BASE/bb/$REPOSITORY:$TAG" \
       -f Dockerfile .
echo ''

echo "[$SCRIPT_NAME] >> Searching for post-build tests ..."
if [ -x "./tests/postbuild.sh" ]; then
  docker run \
         --rm \
         --volume "$PWD"/tests:/tests \
         --name postbuild-test \
         --user root \
         "$ATF_BASE/bb/$REPOSITORY:$TAG" \
         /tests/postbuild.sh
else
  echo ''
  echo "[$SCRIPT_NAME] >> ./test/postbuild.sh not found. Ignoring post-build tests."
fi
