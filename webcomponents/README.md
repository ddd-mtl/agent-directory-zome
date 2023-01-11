# Agent Directory

A holochain zome module that registers agents to a known directory path on agent init.


# API

Uses [lit-happ](https://www.npmjs.com/package/@ddd-qc/lit-happ) framework.
Provides a ZomeProxy and ZomeViewModel.

### Perspective

```typescript
interface AgentDirectoryPerspective {
    agents: AgentPubKeyB64[], // List of registered agents
}
```

### ZomeViewModel
 - `probeRegisteredAgents()`: Check the DHT for new registered agents.


# Custom Elements
- `<agent-directory-list>`: A `ul` of all the AgentPubKeys found by `get_registered_agents()`
