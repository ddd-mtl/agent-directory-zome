#!/bin/bash

# Compile the WASM
#cargo build --release --target wasm32-unknown-unknown
# test zome
hc dna pack --output=agentDashboard.dna playground/workdir
hc app pack --output=agentDashboard.happ playground/workdir
