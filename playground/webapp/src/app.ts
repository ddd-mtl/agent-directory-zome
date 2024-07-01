import { html } from "lit";
import { state } from "lit/decorators.js";
import {cellContext, HappElement, HvmDef} from "@ddd-qc/lit-happ";
import {ContextProvider} from "@lit-labs/context";
import {AgentDirectoryDvm} from "./agent_directory.dvm";
import {AdminWebsocket, AppWebsocket, InstalledAppId} from "@holochain/client";


/** */
export class DashboardApp extends HappElement {

  // /** Ctor */
  // constructor() {
  //   super(Number(process.env.HC_APP_PORT));
  // }

  /** All arguments should be provided when constructed explicity */
  constructor(appWs?: AppWebsocket, private _adminWs?: AdminWebsocket, readonly appId?: InstalledAppId) {
    /** Figure out arguments for super() */
    const appPort: number = Number(process.env.HC_APP_PORT);
    const adminUrl = _adminWs
      ? undefined
      : process.env.HC_ADMIN_PORT
        ? new URL(`ws://localhost:${process.env.HC_ADMIN_PORT}`)
        : undefined;
    super(appWs? appWs : appPort, appId, adminUrl, 10 * 1000);
  }


  /** HvmDef */
  static HVM_DEF: HvmDef = {
    id: 'playground',
    dvmDefs: [{ctor: AgentDirectoryDvm, baseRoleName: "playground", isClonable: false}],
  };


  @state() loaded = false;


  /** */
  async hvmConstructed(): Promise<void> {
    console.log("hvmConstructed()")
    new ContextProvider(this, cellContext, this.hvm.getDvm("playground")!.cell);
    /** Probe */
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
    await this.hvm.dumpCallLogs();
    //await this.hvm.dumpSignalLogs();
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
}
