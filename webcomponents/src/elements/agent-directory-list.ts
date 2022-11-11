import {html, LitElement} from "lit";
import {property, state} from "lit/decorators.js";
import { contextProvided } from '@lit-labs/context';
import {ScopedElementsMixin} from "@open-wc/scoped-elements";
import {agentDirectoryContext, AgentDirectoryPerspective, AgentDirectoryViewModel} from "../agent_directory.vm";


/**
 * @element agent-directory-list
 */
export class AgentDirectoryList extends ScopedElementsMixin(LitElement) {
  /** Ctor */
  constructor() {
    super();
  }


  /** -- Fields -- */

  @state() private _initialized = false;

  @contextProvided({ context: agentDirectoryContext, subscribe: true })
  @property({ type: Object, attribute: false })
  _viewModel!: AgentDirectoryViewModel; // WARN: is actually undefined at startup


  @property({type: Object, attribute: false, hasChanged: (_v, _old) => true})
  perspective!: AgentDirectoryPerspective;


  /** -- Methods -- */

  /** After first call to render() */
  async firstUpdated() {
    this._viewModel.subscribe(this, 'perspective');
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
    await this._viewModel.probeDht();
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
