import {createContext} from "@lit-labs/context";
import {AgentPubKeyB64} from '@holochain-open-dev/core-types';
import {serializeHash} from "@holochain-open-dev/utils";

import {AgentDirectoryBridge} from "./agent_directory.bridge";
import {DnaClient, ZomeViewModel} from "@ddd-qc/dna-client";

/** Global Context */
export const agentDirectoryContext = createContext<AgentDirectoryViewModel>('zome_view_model/agent_directory');


/** */
export interface AgentDirectoryPerspective {
  agents: AgentPubKeyB64[],
}



/**
 *
 */
export class AgentDirectoryViewModel extends ZomeViewModel<AgentDirectoryPerspective> {
  /** Ctor */
  constructor(protected dnaClient: DnaClient) {
    super();
    this._bridge = new AgentDirectoryBridge(dnaClient);
  }

  /** -- Fields -- */

  private _bridge : AgentDirectoryBridge
  private _agents: AgentPubKeyB64[] = [];


  /** -- Methods -- */

  /* */
  get perspective(): AgentDirectoryPerspective {
    return {agents: this._agents}
  }


  /** */
  protected hasChanged(): boolean {
    if (!this._previousPerspective) return true;
    let hasChanged = JSON.stringify(this.perspective.agents) !== JSON.stringify(this._previousPerspective.agents)
    return hasChanged
  }


  /** */
  async probeDht(): Promise<void> {
    await this.probeRegisteredAgents()
  }


  /** */
  async probeRegisteredAgents() {
    let agents = await this._bridge.getAllAgents();
    this._agents = agents.map((agentKey) => serializeHash(agentKey));
    // Debug add a random string to the perspective
    // this._agents.push(String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 26)))
    this.notify()
  }

}
