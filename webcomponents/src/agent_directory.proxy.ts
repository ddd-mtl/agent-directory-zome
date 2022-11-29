import {AgentPubKey} from "@holochain/client";
import {ZomeProxy} from "@ddd-qc/dna-client";


/**
 *
 */
export class AgentDirectoryProxy extends ZomeProxy {
  static readonly DEFAULT_ZOME_NAME = 'agent_directory';

  async getAllAgents(): Promise<AgentPubKey[]> {
    return this.call('get_registered_agents', null);
  }
}
