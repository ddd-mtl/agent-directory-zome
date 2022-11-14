import {AgentPubKey} from "@holochain/client";
import {ZomeBridge} from "@ddd-qc/dna-client";


/**
 *
 */
export class AgentDirectoryBridge extends ZomeBridge {
  zomeName = 'agent_directory';

  async getAllAgents(): Promise<AgentPubKey[]> {
    return this.call('get_registered_agents', null);
  }
}
