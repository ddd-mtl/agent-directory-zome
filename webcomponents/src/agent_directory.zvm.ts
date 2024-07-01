import {ZomeViewModel, AgentId} from "@ddd-qc/lit-happ";
import {AgentDirectoryProxy} from "./bindings/agent_directory.proxy";


/** */
export interface AgentDirectoryPerspective {
  agents: AgentId[],
}


/**
 *
 */
export class AgentDirectoryZvm extends ZomeViewModel {

  static readonly ZOME_PROXY = AgentDirectoryProxy;

  get zomeProxy(): AgentDirectoryProxy {
    return this._zomeProxy as AgentDirectoryProxy;
  }


  /** -- Fields -- */

  private _agents: AgentId[] = [];


  /** -- Methods -- */

  /* */
  get perspective(): AgentDirectoryPerspective {
    return {agents: this._agents}
  }


  /** */
  protected hasChanged(): boolean {
    if (!this._previousPerspective) return true;
    let hasChanged = JSON.stringify(this.perspective.agents) !== JSON.stringify((this._previousPerspective as AgentDirectoryPerspective).agents)
    return hasChanged
  }


  /** */
  async probeAllInner(): Promise<void> {
    await this.probeRegisteredAgents()
  }


  /** */
  async probeRegisteredAgents() {
    let agents = await this.zomeProxy.getRegisteredAgents();
    this._agents = agents.map((agentKey) => new AgentId(agentKey));
    // Debug add a random string to the perspective
    // this._agents.push(String.fromCharCode("A".charCodeAt(0) + Math.floor(Math.random() * 26)))
    this.notifySubscribers()
  }

}
