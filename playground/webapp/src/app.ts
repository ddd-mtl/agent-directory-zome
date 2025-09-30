import { html } from "lit";
import { state, customElement } from "lit/decorators.js";
import {cellContext, HappElement, HvmDef} from "@ddd-qc/lit-happ";
import {ContextProvider} from "@lit/context";
import {AgentDirectoryDvm} from "./agent_directory.dvm";
import {AdminWebsocket, AppWebsocket, InstalledAppId} from "@holochain/client";


/** */
@customElement("dashboard-app")
export class DashboardApp extends HappElement {

  /** HvmDef */
  static HVM_DEF: HvmDef = {
      id: 'playground',
      dvmDefs: [{ctor: AgentDirectoryDvm, baseRoleName: "playground", isClonable: false}],
  };

  /** state */
  @state() loaded = false;


  /** All arguments should be provided when constructed explicity */
  constructor(appWs?: AppWebsocket, private adminWs?: AdminWebsocket, readonly appId?: InstalledAppId) {
    /** Figure out arguments for super() */
    const appPort: number = Number(process.env.HC_APP_PORT);
    const adminUrl = adminWs
      ? undefined
      : process.env.HC_ADMIN_PORT
        ? new URL(`ws://localhost:${process.env.HC_ADMIN_PORT}`)
        : undefined;
    super(appWs? appWs : appPort, appId, adminUrl, 10 * 1000);
  }

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
    await this.hvm.probeAll();
  }


  /** */
  async onDumpRequest(e: any): Promise<void> {
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
