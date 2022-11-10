import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import {HolochainClient} from "@holochain-open-dev/cell-client";
import {ContextProvider} from "@lit-labs/context";
import {AppWebsocket, Dna} from "@holochain/client";
import {AgentDirectoryList, AgentDirectoryViewModel, agentDirectoryContext} from "@agent-directory/elements";
import {DnaClient} from "@ddd-qc/dna-client";


let APP_ID = 'playground'
let HC_PORT:any = process.env.HC_PORT;
let NETWORK_ID: any = null

console.log("HC_PORT = " + HC_PORT + " || " + process.env.HC_PORT);


/** */
export class DashboardApp extends ScopedElementsMixin(LitElement) {

  @state() loaded = false;

  private _dnaClient?: DnaClient;

  /** */
  async firstUpdated() {
    const wsUrl = `ws://localhost:${HC_PORT}`
    const installed_app_id = NETWORK_ID == null || NETWORK_ID == ''
      ? APP_ID
      : APP_ID + '-' + NETWORK_ID;
    console.log({installed_app_id})
    const appWebsocket = await AppWebsocket.connect(wsUrl);
    console.log({appWebsocket})
    const hcClient = new HolochainClient(appWebsocket)
    /** Setup Context */
    const appInfo = await hcClient.appWebsocket.appInfo({installed_app_id});
    const cellId  = appInfo.cell_data[0].cell_id;
    this._dnaClient = new DnaClient(hcClient, cellId);
    const agentDirectoryViewModel = new AgentDirectoryViewModel(this._dnaClient);
    new ContextProvider(this, agentDirectoryContext, agentDirectoryViewModel);
    /** Done */
    this.loaded = true;
  }


  /** */
  async onDumpRequest(e: any) {
    //console.log("onDumpRequest() CALLED", e)
    this._dnaClient!.dumpLogs();
  }

  /** */
  render() {
    console.log("agent-dashobard-app render() called!")
    if (!this.loaded) {
      return html`<span>Loading...</span>`;
    }

    return html`
      <div style="margin:10px;">
      <h2>Agent Directory Playground</h2>
      <agent-directory-list></agent-directory-list>
        <input type="button" value="dump logs" @click=${this.onDumpRequest}>  
      </div>
    `
  }


  static get scopedElements() {
    return {
      "agent-directory-list": AgentDirectoryList,
    };
  }
}
