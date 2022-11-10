import {AgentPubKey} from "@holochain/client";
import {DnaClient} from "@ddd-qc/dna-client";


/**
 *
 */
export class AgentDirectoryBridge {
  /** Ctor */
  constructor(protected dnaClient: DnaClient){}

  private _zomeName = 'agent_directory';

  /** Zome API */

  async getAllAgents(): Promise<AgentPubKey[]> {
    return this.dnaClient.callZome(this._zomeName,  'get_registered_agents', null);
  }
}
