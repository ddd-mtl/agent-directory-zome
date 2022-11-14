import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import {AgentDirectoryList, AgentDirectoryViewModel} from "@agent-directory/elements";
import {DnaViewModel} from "@ddd-qc/dna-client";


let APP_ID = 'playground'
let HC_PORT:any = process.env.HC_PORT;


console.log("HC_PORT = " + HC_PORT + " || " + process.env.HC_PORT);


/** */
export class DashboardApp extends ScopedElementsMixin(LitElement) {

  @state() loaded = false;

  private _dnaViewModel!: DnaViewModel;

  /** */
  async firstUpdated() {
    this._dnaViewModel = await DnaViewModel.new(this, HC_PORT, APP_ID);
    await this._dnaViewModel.addZomeViewModel(AgentDirectoryViewModel)
    await this._dnaViewModel.probeAll();
    /** Done */
    this.loaded = true;
  }

  /** */
  async onRefresh(e: any) {
    //console.log("onDumpRequest() CALLED", e)
    this._dnaViewModel.probeAll();
  }


  /** */
  async onDumpRequest(e: any) {
    //console.log("onDumpRequest() CALLED", e)
    this._dnaViewModel.dumpLogs();
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
        <input type="button" value="refresh" @click=${this.onRefresh}>
      </div>
    `
  }


  static get scopedElements() {
    return {
      "agent-directory-list": AgentDirectoryList,
    };
  }
}
