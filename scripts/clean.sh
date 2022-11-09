#!/bin/bash
# TOP LEVEL
rm .hc_live*
# WEBCOMPONENTS
rm -rf webcomponents/dist
rm webcomponents/tsconfig.tsbuildinfo
# PLAYGROUND DNA
rm playground.dna
rm playground.happ
# PLAYGROUND WEB-APP
rm -rf playground/webapp/dist
rm -rf playground/webapp/out-tsc
rm playground/webapp/tsconfig.tsbuildinfo
rm playground/webapp/ui.zip