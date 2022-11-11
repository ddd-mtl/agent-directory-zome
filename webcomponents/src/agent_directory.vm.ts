import {createContext} from "@lit-labs/context";
import {AgentPubKeyB64} from '@holochain-open-dev/core-types';
import {serializeHash} from "@holochain-open-dev/utils";

import {AgentDirectoryBridge} from "./agent_directory.bridge";
import {DnaClient} from "@ddd-qc/dna-client";

/** Global Context */
export const agentDirectoryContext = createContext<AgentDirectoryViewModel>('zome_view_model/agent_directory');


/** */
export interface AgentDirectoryPerspective {
  agents: AgentPubKeyB64[],
}


/**
 *
 */
export class AgentDirectoryViewModel  {
  /** Ctor */
  constructor(protected dnaClient: DnaClient) {
    this._bridge = new AgentDirectoryBridge(dnaClient);
  }

  /** */
  hasChanged(): boolean {
    if (!this._previousPerspective) return true;
    let hasChanged = JSON.stringify(this.perspective.agents) !== JSON.stringify(this._previousPerspective.agents)
    return hasChanged
  }


  /** -- Fields -- */

  private _bridge : AgentDirectoryBridge
  private _agents: AgentPubKeyB64[] = [];
  private _hosts: [any, PropertyKey][] = [];

  private _previousPerspective?: AgentDirectoryPerspective;

  /** -- Methods -- */

  /* */
  get perspective(): any {
    return {agents: this._agents}
  }


  /** */
  private notify() {
    if (!this.hasChanged()) return;
    for (const [host, propName] of this._hosts) {
      //host.requestUpdate()
      host[propName] = this.perspective;
    }
    this._previousPerspective = this.perspective
  }


  /** */
  subscribe(host: any, propName: PropertyKey) {
    host[propName] = this.perspective;
    this._hosts.push([host, propName])
  }


  /** */
  unsubscribe(candidat: any) {
    let index  = 0;
    for (const [host, _propName] of this._hosts) {
      if (host === candidat) break;
      index += 1;
    }
    if (index > -1) {
      this._hosts.splice(index, 1);
    }
  }



  /** */
  async probeDht() {
    await this.probeRegisteredAgents();
  }


  /** */
  async probeRegisteredAgents() {
    let agents = await this._bridge.getAllAgents();
    this._agents = agents.map((agentKey) => serializeHash(agentKey));
    //this._agents.push(String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 26)))
    this.notify()
  }

}
