# Agent Directory

A holochain zome module that registers agents to a known directory path on agent init.

# API

### EntryTypes
None

### LinkTypes

 - `Agent`: Used for the Path `"registered_agents"/{AgentPubKey}`

### Zome Functions
 - `get_registered_agents()`: Returns a list of known registered agent-keys.

### Signals
None


# Design

We store AgentPubKeys as a PathEntry from `"registered_agents"`

This is done buy converting the key's raw bytes into create a PathComponent.


# TODO

 - Add signaling when new agents are discovered

# Dev Setup

`bash ./scripts/install-hc-tools.sh`

`npm install`

`npm run build:all`