import {DnaViewModel} from "@ddd-qc/dna-client";
import {AgentDirectoryZvm} from "./agent_directory.zvm";
import {AppSignalCb} from "@holochain/client";


/**
 * DnaViewModel fo the agent_directory DNA holding just this zome
 */
export class AgentDirectoryDvm extends DnaViewModel {
    /** -- DnaViewModel Interface -- */
    static readonly DEFAULT_ROLE_ID = "agent_directory";
    static readonly ZVM_DEFS = [AgentDirectoryZvm]
    readonly signalHandler?: AppSignalCb;

    /** */
    get zvm(): AgentDirectoryZvm { return this.getZomeViewModel(AgentDirectoryZvm.DEFAULT_ZOME_NAME) as AgentDirectoryZvm};

    /** -- ViewModel Interface -- */

    /** */

    protected hasChanged(): boolean {return true}

    get perspective(): unknown {return}

}