import {createContext} from "@lit-labs/context";
import {LitElement} from "lit";
import {writable, Writable, get} from "svelte/store";

import {CellId} from "@holochain/client";
import {AgentPubKeyB64} from '@holochain-open-dev/core-types';
import {AgnosticClient} from '@holochain-open-dev/cell-client';
import {serializeHash} from "@holochain-open-dev/utils";

import {AgentDirectoryBridge} from "./agent_directory.bridge";
import {DnaClient} from "@ddd-qc/dna-client";
import {Subscriber} from "svelte/types/runtime/store";

/** Global Context */
export const agentDirectoryContext = createContext<AgentDirectoryViewModel>('agent_directory/service');


/**
 *
 */
export class AgentDirectoryViewModel {
  /** Ctor */
  constructor(protected dnaClient: DnaClient) {
    this._bridge = new AgentDirectoryBridge(dnaClient);
  }

  /** -- Fields -- */

  private _bridge : AgentDirectoryBridge
  private _agentStore: Writable<AgentPubKeyB64[]> = writable([]);


  /** -- Methods -- */

  /** */
  agents(): AgentPubKeyB64[] {
    return get(this._agentStore);
  }

  /** */
  subscribe(fn: Subscriber<AgentPubKeyB64[]>) {
    this._agentStore.subscribe(fn);
  }


  /** */
  async pullAllFromDht() {
    await this.pullAllRegisteredAgents();
  }


  /** */
  async pullAllRegisteredAgents() {
    let agents = await this._bridge.getAllAgents();
    this._agentStore.update(store => {
      store = agents.map((agentKey) => serializeHash(agentKey));
      return store;
    })
  }

}
