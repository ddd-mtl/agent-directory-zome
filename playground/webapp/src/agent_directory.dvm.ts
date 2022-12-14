import {DnaViewModel} from "@ddd-qc/lit-happ";
import {AppSignalCb} from "@holochain/client";
import {AgentDirectoryZvm} from "@ddd-qc/agent-directory";


/**
 * DnaViewModel fo the agent_directory DNA holding just this zome
 */
export class AgentDirectoryDvm extends DnaViewModel {
    /** -- DnaViewModel Interface -- */
    static readonly DEFAULT_BASE_ROLE_NAME = "agent_directory";
    static readonly ZVM_DEFS = [AgentDirectoryZvm]
    readonly signalHandler?: AppSignalCb;

    /** */
    get zvm(): AgentDirectoryZvm { return this.getZomeViewModel(AgentDirectoryZvm.DEFAULT_ZOME_NAME) as AgentDirectoryZvm};

    /** -- ViewModel Interface -- */

    /** */

    protected hasChanged(): boolean {return true}

    get perspective(): unknown {return}

}