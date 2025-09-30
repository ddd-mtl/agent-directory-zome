# Agent Directory

A [holochain](https://github.com/holochain/holochain) zome module that registers agents to a public directory path on agent init.

## ZOME API

### EntryTypes
None

### LinkTypes

 - `Agent`: Used for the Path `"registered_agents"/{AgentPubKey}`
    - Validation: Only self is allowed to publish the PathEntry to self's key.

### Zome Functions
 - `get_registered_agents()`: Returns a list of known registered agent-keys.

### Signals
None


## [Web API](webcomponents/README.md)

## Design

AgentPubKeys are "stored" as a PathEntry from the `"registered_agents"` anchor.

This is done by converting the key's raw bytes into create a PathComponent.


## TODO

 - Add signaling when new agents are discovered

## Dev Setup

**Requirements**: Having [nix](https://developer.holochain.org/docs/install) installed.

run:
- `nix develop`
- `npm install` 

## Running Tests

`npm run devtest`