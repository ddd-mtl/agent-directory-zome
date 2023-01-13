# Agent Directory

A holochain zome module that registers agents to a known directory path on agent init.

# ZOME API

### EntryTypes
None

### LinkTypes

 - `Agent`: Used for the Path `"registered_agents"/{AgentPubKey}`
    - Validation: Only self is allowed to publish the PathEntry to self's key.

### Zome Functions
 - `get_registered_agents()`: Returns a list of known registered agent-keys.

### Signals
None


# [Web API](webcomponents/README.md)

# Design

AgentPubKeys are "stored" as a PathEntry from `"registered_agents"`

This is done by converting the key's raw bytes into create a PathComponent.


# TODO

 - Add signaling when new agents are discovered

# Dev Setup

`bash ./scripts/install-hc-tools.sh`

`npm install`

`npm run devtest`