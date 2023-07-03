import {html} from "lit";
import {property, state, customElement} from "lit/decorators.js";
import {ZomeElement} from "@ddd-qc/lit-happ";
import {AgentDirectoryPerspective, AgentDirectoryZvm} from "../agent_directory.zvm";

/**
 * @element agent-directory-list
 */
@customElement("agent-directory-list")
export class AgentDirectoryList extends ZomeElement<AgentDirectoryPerspective, AgentDirectoryZvm> {
  /** Ctor */
  constructor() {
    super(AgentDirectoryZvm.DEFAULT_ZOME_NAME);
  }


  /** -- Fields -- */

  @state() private _initialized = false;



  /** -- Methods -- */

  /** After first call to render() */
  async firstUpdated() {
    //this._viewModel.subscribe(this, 'perspective');
    await this.refresh();
    this._initialized = true;
  }


  /** After each call to render() */
  async updated(changedProperties: any) {
    // n/a
  }


  /** */
  async refresh(_e?: any) {
    //console.log("refresh(): Pulling data from DHT")
    await this._zvm.probeAll();
  }


  /** */
  render() {
    console.log("agent-directory-list render() START");

    if (!this._initialized) {
      return html`<span>Loading...</span>`;
    }

    /* Agents */
    const agentLi = Object.entries(this.perspective.agents).map(
        ([_index, agentIdB64]) => {
          //console.log("" + index + ". " + agentIdB64)
          return html `<li value="${agentIdB64}">${agentIdB64}</li>`
        }
    )

    /** render all */
    return html`     
        <ul>
          ${agentLi}
        </ul>
    `;
  }
}
