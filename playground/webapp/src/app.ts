import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import {CellId, InstalledCell} from "@holochain/client";
import {HolochainClient} from "@holochain-open-dev/cell-client";
import {ContextProvider} from "@lit-labs/context";
import {AppWebsocket} from "@holochain/client";
import {AgentDirectoryList, AgentDirectoryViewModel, agentDirectoryContext} from "@agent-directory/elements";



let APP_ID = 'agentDashboard'
let HC_PORT:any = process.env.HC_PORT;
let NETWORK_ID: any = null

console.log("HC_PORT = " + HC_PORT + " || " + process.env.HC_PORT);


/** */
export class TaskerApp extends ScopedElementsMixin(LitElement) {

  @state() loaded = false;

  private _cellId: CellId | null = null;
  //private _cells: InstalledCell[] = []



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
    /** Setup Tasker */
    const appInfo = await hcClient.appWebsocket.appInfo({installed_app_id});
    this._cellId  = appInfo.cell_data[0].cell_id;
    const agentDirectoryViewModel = new AgentDirectoryViewModel(hcClient, this._cellId);
    new ContextProvider(this, agentDirectoryContext, this.agentDirectoryViewModel);
    /** 
    this._cells = Object.values(appInfo.cell_data);
    for (const cell of this._cells) {
      let dnaInfo = await this.getDnaInfo(hcClient, cell.cell_id, "membranes");
      for (const zomeName of dnaInfo) {
        this.appEntryTypeStore[zomeName] = await this.getEntryDefs(hcClient, cell.cell_id, zomeName);
      }
    } */
    /** Done */
    this.loaded = true;
  }


  render() {
    console.log("agent-dashobard-app render() called!")
    if (!this.loaded) {
      return html`<span>Loading...</span>`;
    }

    return html`
      <div>
      <agent-directory-list></agent-directory-list>
      </div>
    `
  }


  static get scopedElements() {
    return {
      "agent-directory-list": AgentDirectoryList,
    };
  }
}
