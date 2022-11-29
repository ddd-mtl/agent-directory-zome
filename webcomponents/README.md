# Agent Directory

A holochain zome module that registers agents to a known directory path on agent init.


# API

Uses [dna-client](https://www.npmjs.com/package/@ddd-qc/dna-client) framework.
Provides a ZomeProxy and ZomeViewModel.

### Perspective

```typescript
interface AgentDirectoryPerspective {
    agents: AgentPubKeyB64[], // List of registered agents
}
```

### ZomeViewModel
 - `probeAll()`: Check the DHT for any kind of new data.
 - `probeRegisteredAgents()`: Check the DHT for new registered agents.


# Custom Elements
- `<agent-directory-list>`: A `ul` of all the AgentPubKeys found by `get_registered_agents()`
