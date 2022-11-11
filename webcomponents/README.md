# Agent Directory

A holochain zome module that registers agents to a known directory path on agent init.


# API

## ViewModel
 - `subscribe(fn)`: Host can provide a function to be called when data store has been updated.
 - `pullAllFromDht()`: Check the DHT for any kind of new data.
 - `pullAllRegisteredAgents()`: Check the DHT for new registered agents.
 - `agents()`: Getter for the list of registered agents.


# Custom Elements
- `<agent-directory-list>`: A `ul` of all the AgentPubKeys found by `get_registered_agents()`