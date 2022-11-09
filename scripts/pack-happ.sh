#!/bin/bash

# Compile the WASM
#cargo build --release --target wasm32-unknown-unknown
# test zome
hc dna pack --output=playground.dna playground/workdir
hc app pack --output=playground.happ playground/workdir
