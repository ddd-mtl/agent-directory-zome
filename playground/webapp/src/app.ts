import { html } from "lit";
import { state } from "lit/decorators.js";
import {cellContext, HappElement, HvmDef} from "@ddd-qc/dna-client";
import {AgentDirectoryList} from "@agent-directory/elements";
import {AgentDirectoryDvm} from "@ddd-qc/agent-directory";
import {ContextProvider} from "@lit-labs/context";


/** */
export class DashboardApp extends HappElement {

  /** Ctor */
  constructor() {
    super(Number(process.env.HC_PORT));
  }

  /** HvmDef */
  static HVM_DEF: HvmDef = {
    id: 'playground',
    dvmDefs: [[AgentDirectoryDvm, "playground"]],
  };

  @state() loaded = false;


  /** */
  async firstUpdated(): Promise<void> {
    new ContextProvider(this, cellContext, this.hvm.getDvm("playground")!.installedCell);
    await this.hvm.probeAll();
    /** Done */
    this.loaded = true;
  }

  /** */
  async onRefresh(e: any): Promise<void> {
    //console.log("onDumpRequest() CALLED", e)
    await this.hvm.probeAll();
  }


  /** */
  async onDumpRequest(e: any): Promise<void> {
    //console.log("onDumpRequest() CALLED", e)
    await this.hvm.dumpLogs();
  }

  /** */
  render() {
    console.log("<agent-dashobard-app> render()")
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

  /** */
  static get scopedElements() {
    return {
      "agent-directory-list": AgentDirectoryList,
    };
  }
}
