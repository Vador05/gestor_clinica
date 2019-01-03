#!/usr/bin/env bash

# Output colors
NORMAL='\033[0m' # No Color
RED='\033[0;31m'
BLUE='\033[0;34m'
DIR=`pwd`

# INTERNAL USAGE
log() {
    echo -e "${BLUE}${1}${NORMAL}"
}
# INTERNAL USAGE
error() {
    echo -e "${RED}ERROR - ${1}${NORMAL}"
    return -1
}
check_exit() {
    rc=$?; if [[ $rc != 0 ]]; then
        error "Something wrong happened. Check logs :(";
        exit $rc;
    fi
}
install() {
    log "Install STARTED"
    npm install
    check_exit
    $(npm bin)/bower install --allow-root
    check_exit
    log "Install ENDED"
    build
    check_exit
}

build() {
    log "Build STARTED"
    $(npm bin)/grunt
    log "Build ENDED"
}

watch() {
    $(npm bin)/grunt watch
}

help() {
  echo -e -n "$BLUE"
  echo "-----------------------------------------------------------------------"
  echo "-                     Available commands                              -"
  echo "-----------------------------------------------------------------------"
  echo "   > install - Resolve npm and bower packages"
  echo "   > build - generates dist directory"
  echo "   > watch - watch for changes"
  echo "-----------------------------------------------------------------------"
  echo -e -n "$NORMAL"
}
if [ ! -f command.sh ]; then
    error "Script must be run from project root-dir (ri-backoffice)"
    exit -1
fi
if [ -z "$*" ]; then
    help
else
    $*
fi
