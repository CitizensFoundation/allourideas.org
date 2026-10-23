import{_ as e,n as t,o as i,s as o,G as n,x as r,H as s,I as a,J as d,N as l,K as c,L as h,M as p,O as m,P as g,Q as u,i as f,t as v,Y as y,R as x,r as b,q as A,T as C,p as w,f as I,U as M,V as $,W as _,E as S,B as k}from"./BjU_bnxK.js";import{E,d as z,V as T,R,a as O,L as N,G as D,P as L,b as P}from"./CPmTabcj.js";
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */class j extends o{get item(){return this.items[0]??null}get menu(){return this.menus[0]??null}constructor(){super(),this.anchorCorner=n.START_END,this.menuCorner=n.START_START,this.hoverOpenDelay=400,this.hoverCloseDelay=400,this.isSubMenu=!0,this.previousOpenTimeout=0,this.previousCloseTimeout=0,this.onMouseenter=()=>{clearTimeout(this.previousOpenTimeout),clearTimeout(this.previousCloseTimeout),this.menu?.open||(this.hoverOpenDelay?this.previousOpenTimeout=setTimeout((()=>{this.show()}),this.hoverOpenDelay):this.show())},this.onMouseleave=()=>{clearTimeout(this.previousCloseTimeout),clearTimeout(this.previousOpenTimeout),this.hoverCloseDelay?this.previousCloseTimeout=setTimeout((()=>{this.close()}),this.hoverCloseDelay):this.close()},this.addEventListener("mouseenter",this.onMouseenter),this.addEventListener("mouseleave",this.onMouseleave)}render(){return r`
      <slot
        name="item"
        @click=${this.onClick}
        @keydown=${this.onKeydown}
        @slotchange=${this.onSlotchange}>
      </slot>
      <slot
        name="menu"
        @keydown=${this.onSubMenuKeydown}
        @close-menu=${this.onCloseSubmenu}
        @slotchange=${this.onSlotchange}>
      </slot>
    `}firstUpdated(){this.onSlotchange()}async show(){const e=this.menu;if(!e||e.open)return;e.addEventListener("closed",(()=>{this.item.ariaExpanded="false",this.dispatchEvent(s()),this.dispatchEvent(a()),e.ariaHidden="true"}),{once:!0}),"document"===e.positioning&&(e.positioning="absolute"),e.quick=!0,e.hasOverflow=!0,e.anchorCorner=this.anchorCorner,e.menuCorner=this.menuCorner,e.anchorElement=this.item,e.defaultFocus="first-item",e.removeAttribute("aria-hidden"),e.skipRestoreFocus=!1;const t=e.open;if(e.show(),this.item.ariaExpanded="true",this.item.ariaHasPopup="menu",e.id&&this.item.setAttribute("aria-controls",e.id),this.dispatchEvent(a()),this.dispatchEvent(d()),this.item.selected=!0,!t){let t=e=>{};const i=new Promise((e=>{t=e}));e.addEventListener("opened",t,{once:!0}),await i}}async close(){const e=this.menu;if(!e||!e.open)return;this.dispatchEvent(s()),e.quick=!0,e.close(),this.dispatchEvent(a());let t=e=>{};const i=new Promise((e=>{t=e}));e.addEventListener("closed",t,{once:!0}),await i}onSlotchange(){if(!this.item)return;this.item.ariaExpanded="false",this.item.ariaHasPopup="menu",this.menu?.id&&this.item.setAttribute("aria-controls",this.menu.id),this.item.keepOpen=!0;const e=this.menu;e&&(e.isSubmenu=!0,e.ariaHidden="true")}onClick(){this.show()}async onKeydown(e){const t=this.isSubmenuOpenKey(e.code);if(e.defaultPrevented)return;const i=t&&(l.LEFT===e.code||l.RIGHT===e.code);if((e.code===c.SPACE||i)&&(e.preventDefault(),i&&e.stopPropagation()),!t)return;const o=this.menu;if(!o)return;const n=o.items,r=h(n);return r?(await this.show(),r.tabIndex=0,void r.focus()):void 0}onCloseSubmenu(e){const{itemPath:t,reason:i}=e.detail;if(t.push(this.item),this.dispatchEvent(s()),i.kind===p.KEYDOWN&&i.key===m.ESCAPE)return e.stopPropagation(),void this.item.dispatchEvent(g());this.dispatchEvent(a())}async onSubMenuKeydown(e){if(e.defaultPrevented)return;const{close:t,keyCode:i}=this.isSubmenuCloseKey(e.code);t&&(e.preventDefault(),i!==l.LEFT&&i!==l.RIGHT||e.stopPropagation(),await this.close(),u(this.menu.items),this.item?.focus(),this.item.tabIndex=0,this.item.focus())}isSubmenuOpenKey(e){switch(e){case"rtl"===getComputedStyle(this).direction?l.LEFT:l.RIGHT:case c.SPACE:case c.ENTER:return!0;default:return!1}}isSubmenuCloseKey(e){switch(e){case"rtl"===getComputedStyle(this).direction?l.RIGHT:l.LEFT:case m.ESCAPE:return{close:!0,keyCode:e};default:return{close:!1}}}}e([t({attribute:"anchor-corner"})],j.prototype,"anchorCorner",void 0),e([t({attribute:"menu-corner"})],j.prototype,"menuCorner",void 0),e([t({type:Number,attribute:"hover-open-delay"})],j.prototype,"hoverOpenDelay",void 0),e([t({type:Number,attribute:"hover-close-delay"})],j.prototype,"hoverCloseDelay",void 0),e([t({type:Boolean,reflect:!0,attribute:"md-sub-menu"})],j.prototype,"isSubMenu",void 0),e([i({slot:"item",flatten:!0})],j.prototype,"items",void 0),e([i({slot:"menu",flatten:!0})],j.prototype,"menus",void 0);
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
const q=f`:host{position:relative;display:flex;flex-direction:column}
`
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let B=class extends j{};B.styles=[q],B=e([v("md-sub-menu")],B);var U=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};class F extends y{connectedCallback(){super.connectedCallback(),window.psAppGlobals.currentRunningAgentId=window.psAppGlobals.currentRunningAgentId,window.psAppGlobals.addCurrentAgentListener(this.handleAgentChange.bind(this))}disconnectedCallback(){window.psAppGlobals.removeCurrentAgentListener(this.handleAgentChange.bind(this)),super.disconnectedCallback()}handleAgentChange(e){this.currentRunningAgentId=e}}U([t({type:Number})],F.prototype,"currentRunningAgentId",void 0);var G=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let H=class extends F{constructor(){super(),this.posX=0,this.posY=0,this.api=new x}static get styles(){return[super.styles,f`


        .editButton {
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 1500;
        }

        .typeIconCore {
          position: absolute;
          bottom: 8px;
          left: 8px;
        }

        .middleIcon {
          position: absolute;
          bottom: 0;
          left: 51px;
        }

        .typeIcon {
          color: var(--md-sys-color-primary);
        }

        .typeIconUde {
          color: var(--md-sys-color-tertiary);
        }

        .typeIconRoot {
          color: var(--md-sys-color-on-primary);
        }

        md-icon-button[root-cause] {
          --md-icon-button-icon-color: var(--md-sys-color-on-primary);
        }

        md-circular-progress {
          --md-circular-progress-size: 28px;
          margin-bottom: 6px;
        }

        md-menu {
          --md-menu-z-index: 1000;
          z-index: 1000;
        }

        [hidden] {
          display: none !important;
        }
      `]}editNode(){this.fire("edit-node",{nodeId:this.nodeId,element:this})}};G([t({type:String})],H.prototype,"nodeId",void 0),G([t({type:Number})],H.prototype,"posX",void 0),G([t({type:Number})],H.prototype,"posY",void 0),H=G([v("ps-operations-base-node")],H);var W=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let Y=class extends H{constructor(){super(),this.running=!1,this.agentState="stopped",this.latestMessage="",this.menuOpen=!1,this.agentMemory=null,this.api=new x}firstUpdated(){this.agentConnectorMenu&&this.connectorMenuAnchor&&(this.agentConnectorMenu.anchorElement=this.connectorMenuAnchor),this.agentMainMenu&&this.mainMenuAnchor&&(this.agentMainMenu.anchorElement=this.mainMenuAnchor)}connectedCallback(){super.connectedCallback(),this.agent=window.psAppGlobals.getAgentInstance(this.agentId),this.updateAgentStatus()}disconnectedCallback(){super.disconnectedCallback(),this.stopStatusUpdates()}getSafeFileName(e){const t=e.toLowerCase().replace(/\s+/g,"_"),i=new Date;return`${t}_memory_${`${i.getFullYear()}${(i.getMonth()+1).toString().padStart(2,"0")}${i.getDate().toString().padStart(2,"0")}_${i.getHours().toString().padStart(2,"0")}${i.getMinutes().toString().padStart(2,"0")}`}.json`}async saveMemoryToFile(){try{const e=await this.api.getAgentMemory(this.groupId,this.agent.id);if(e){const t=this.getSafeFileName(this.agent.configuration.name),i=JSON.stringify(e,null,2),o=new Blob([i],{type:"application/json"}),n=URL.createObjectURL(o),r=document.createElement("a");r.href=n,r.download=t,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(n)}else console.error("No memory available to save")}catch(e){console.error("Error saving agent memory:",e)}}triggerFileInput(){this.fileInput.click()}handleFileSelect(e){const t=e.target.files?.[0];if(t){const e=new FileReader;e.onload=e=>{try{const t=JSON.parse(e.target?.result);this.confirmLoadMemory(t)}catch(e){console.error("Error parsing JSON file:",e)}},e.readAsText(t)}}confirmLoadMemory(e){window.appDialogs.getDialogAsync("confirmationDialog",(t=>{t.open(this.t("confirmLoadAndOverrideMemory"),(()=>this.loadMemoryFromContent(e)),!0,!0)}))}async loadMemoryFromContent(e){try{await this.api.replaceAgentMemory(this.groupId,this.agent.id,e),this.agentMemory=e,this.requestUpdate()}catch(e){console.error("Error loading agent memory:",e)}}toggleConnectorMenu(e){e.stopPropagation(),this.agentConnectorMenu&&(this.agentConnectorMenu.open=!this.agentConnectorMenu.open)}toggleMainMenu(e){e.stopPropagation(),this.agentMainMenu&&(this.agentMainMenu.open=!this.agentMainMenu.open)}async fetchAgentMemory(){try{const e=await this.api.getAgentMemory(this.groupId,this.agent.id);this.agentMemory=e,this.agentMemory||(this.agentMemory={error:"No memory available"})}catch(e){console.error("Error fetching agent memory:",e),this.agentMemory={error:"Failed to fetch agent memory"}}}openMemoryDialog(){this.fetchAgentMemory(),this.memoryDialog.show()}addInputConnector(){this.fire("add-connector",{agentId:this.agent.id,type:"input"}),this.menuOpen=!1}addOutputConnector(){this.fire("add-connector",{agentId:this.agent.id,type:"output"}),this.menuOpen=!1}addExistingConnector(e,t){this.fire("add-existing-connector",{agentId:this.agent.id,connectorId:e,type:t})}confirmDeleteAgent(){window.appDialogs.getDialogAsync("confirmationDialog",(e=>{e.open(this.t("confirmDeleteFromWorkflow"),(()=>this.deleteAgent()),!0,!0)}))}async deleteAgent(){try{await this.api.deleteAgent(this.groupId,this.agent.id),this.dispatchEvent(new CustomEvent("agent-deleted",{detail:{agentId:this.agent.id}}))}catch(e){console.error("Error deleting agent:",e)}}startStatusUpdates(){this.statusInterval=window.setInterval((()=>this.updateAgentStatus()),1e3)}stopStatusUpdates(){this.statusInterval&&(clearInterval(this.statusInterval),this.statusInterval=void 0)}async updateAgentStatus(){try{const e=await this.api.getAgentStatus(this.groupId,this.agent.id);e&&(this.agentState=e.state,this.progress=e.progress,this.latestMessage=e.messages[e.messages.length-1]||"","stopped"===this.agentState||"error"===this.agentState?this.stopStatusUpdates():"running"!==this.agentState||this.statusInterval||(console.log("Starting status updates from server"),this.startStatusUpdates()),this.requestUpdate(),this.fire("get-costs"),"running"===this.agentState?this.running=!0:this.running=!1)}catch(e){console.error("Failed to get agent status:",e)}}async startAgent(){try{await this.api.startAgent(this.groupId,this.agent.id),this.agentState="running",window.psAppGlobals.setCurrentRunningAgentId(this.agent.id),this.startStatusUpdates(),this.requestUpdate()}catch(e){console.error("Failed to start agent:",e)}}async pauseAgent(){try{await this.api.pauseAgent(this.groupId,this.agent.id),this.agentState="paused",this.requestUpdate()}catch(e){console.error("Failed to pause agent:",e)}}async stopAgent(){try{await this.api.stopAgent(this.groupId,this.agent.id),this.agentState="stopped",window.psAppGlobals.setCurrentRunningAgentId(void 0),this.stopStatusUpdates(),this.requestUpdate()}catch(e){console.error("Failed to stop agent:",e)}}editNode(){this.fire("edit-node",{nodeId:this.nodeId,element:this.agent})}renderMemoryDialog(){return r`
      <md-dialog id="memoryDialog">
        <div slot="headline">${this.t("agentMemoryExplorer")}</div>
        <div slot="content">
          ${this.agentMemory&&!this.agentMemory.error?r`
                <fleshy-jsoneditor
                  style="height: 100%;"
                  .json=${this.agentMemory}
                  mode="view"
                ></fleshy-jsoneditor>
              `:this.agentMemory&&this.agentMemory.error?r`${this.agentMemory.error}`:r`<md-linear-progress indeterminate></md-linear-progress>`}
        </div>
        <div slot="actions">
          <md-text-button @click=${()=>this.memoryDialog.close()}>
            ${this.t("close")}
          </md-text-button>
        </div>
      </md-dialog>
    `}renderActionButtons(){switch(this.agentState){case"running":return r`
          <md-icon-button hidden
            class="playButtons"
            @click="${this.pauseAgent}"
            disabled
            aria-label="Pause agent"
          >
            <md-icon>pause</md-icon>
          </md-icon-button>
          <md-icon-button
            class="playButtons"
            @click="${this.stopAgent}"
            aria-label="Stop agent"
          >
            <md-icon>stop</md-icon>
          </md-icon-button>
        `;case"paused":return r`
          <md-icon-button
            class="playButtons"
            @click="${this.startAgent}"
            aria-label="Start agent"
          >
            <md-icon>play_circle</md-icon>
          </md-icon-button>
          <md-icon-button
            class="playButtons"
            @click="${this.stopAgent}"
            aria-label="Stop agent"
          >
            <md-icon>stop</md-icon>
          </md-icon-button>
        `;case"stopped":case"completed":case"error":return r`
          <md-icon-button
            class="playButtons"
            @click="${this.startAgent}"
            aria-label="Start agent"
          >
            <md-icon>play_circle</md-icon>
          </md-icon-button>
        `}}renderProgress(){if(void 0===this.progress)return r`<md-linear-progress indeterminate></md-linear-progress>`;{const e=Math.min(1,Math.max(0,this.progress/100));return r`<md-linear-progress
        value="${e}"
      ></md-linear-progress>`}}renderConnectorMenu(){if(window.psAppGlobals.activeConnectorsInstanceRegistry){const e=Array.from(window.psAppGlobals.activeConnectorsInstanceRegistry.values()),t=new Set([...this.agent.InputConnectors?.map((e=>e.id))||[],...this.agent.OutputConnectors?.map((e=>e.id))||[]]),i=e.filter((e=>!t.has(e.id)));return r`
        <md-icon-button
          id="connectorMenuAnchor"
          @click="${this.toggleConnectorMenu}"
          aria-label="Add connector"
          aria-haspopup="menu"
          aria-controls="agentConnectorMenu"
        >
          <md-icon>add</md-icon>
        </md-icon-button>
        <md-menu
          has-overflow
          id="agentConnectorMenu"
          anchor="connectorMenuAnchor"
          positioning="popover"
          quick
        >
          <md-menu-item @click="${this.addInputConnector}">
            <div slot="headline">Add Input Connector</div>
          </md-menu-item>
          <md-menu-item @click="${this.addOutputConnector}">
            <div slot="headline">Add Output Connector</div>
          </md-menu-item>

          ${i.length>0?r`
                <md-divider></md-divider>
                <md-sub-menu positioning="popover">
                  <md-menu-item slot="item">
                    <div slot="headline">Add Existing Connector</div>
                    <md-icon slot="end">arrow_right</md-icon>
                  </md-menu-item>
                  <md-menu slot="menu" positioning="popover">
                    ${i.map((e=>r`
                        <md-sub-menu>
                          <md-menu-item slot="item">
                            <div slot="headline">
                              ${e.configuration.name}
                            </div>
                            <md-icon slot="end">arrow_right</md-icon>
                          </md-menu-item>
                          <md-menu slot="menu" positioning="popover">
                            <md-menu-item
                              @click="${()=>this.addExistingConnector(e.id,"input")}"
                            >
                              <div slot="headline">Add as Input</div>
                            </md-menu-item>
                            <md-menu-item
                              @click="${()=>this.addExistingConnector(e.id,"output")}"
                            >
                              <div slot="headline">Add as Output</div>
                            </md-menu-item>
                          </md-menu>
                        </md-sub-menu>
                      `))}
                  </md-menu>
                </md-sub-menu>
              `:""}
        </md-menu>
      `}return console.warn("activeConnectorsInstanceRegistry is not available"),C}renderMainMenu(){return r` <md-icon-button
        id="mainMenuAnchor"
        @click="${this.toggleMainMenu}"
        aria-label="Agent actions"
        aria-haspopup="menu"
        aria-controls="agentMainMenu"
      >
        <md-icon>more_horiz</md-icon>
      </md-icon-button>
      <md-menu id="agentMainMenu" positioning="popover">
        <md-menu-item @click="${this.editNode}">
          <div slot="headline">Settings</div>
        </md-menu-item>
        <md-menu-item @click="${this.saveMemoryToFile}">
          <div slot="headline">Save Memory to File</div>
        </md-menu-item>
        <md-menu-item @click="${this.triggerFileInput}">
          <div slot="headline">Load Memory from File</div>
        </md-menu-item>
        <md-menu-item @click="${this.openMemoryDialog}">
          <div slot="headline">Explore Memory</div>
        </md-menu-item>
        <md-divider></md-divider>
        <md-menu-item class="deleteMenuItem" @click="${this.confirmDeleteAgent}">
          <div slot="headline">${this.t("deleteFromWorkflow")}</div>
        </md-menu-item>
      </md-menu>
      <input
        type="file"
        id="fileInput"
        @change="${this.handleFileSelect}"
        accept=".json"
        style="display: none;"
      />`}render(){return this.agent?r`
      <div class="mainContainer" ?has-static-theme=${this.hasStaticTheme}>
        <img
          class="image"
          ?has-static-theme=${this.hasStaticTheme}
          src="${this.agent.Class?.configuration.imageUrl}"
          alt="${this.agent.Class?.name}"
        />
        <div class="contentContainer">
          <div class="agentClassName">${this.agent.Class?.name}</div>
          <div class="agentName">${this.agent.configuration.name}</div>
          ${"running"===this.agentState?this.renderProgress():C}
          <div class="statusMessage">${this.latestMessage}</div>
        </div>
        <div class="buttonContainer">
          ${this.renderConnectorMenu()}
          <div class="flex"></div>

          ${this.renderActionButtons()}
          <div class="flex"></div>

          ${this.renderMainMenu()}
        </div>
      </div>
      ${this.renderMemoryDialog()}
    `:C}static get styles(){return[super.styles,f`
        :host {
          display: block;
        }

        .playButtons {
          --md-icon-button-icon-size: 34px;
          width: 42px;
          height: 42px;
          margin-top: -16px;
        }

        #connectorMenuAnchor {
          margin-bottom: 4px;
        }

        #mainMenuAnchor {
          margin-bottom: 8px;
        }

        #memoryDialog {
          width: 95vw;
          height: 95vh;
          max-width: 97vw;
          max-height: 97vh;
        }

        .buttonContainer {
          display: flex;
          padding: 0px;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: absolute;
        }

        md-icon-button {
          margin: 0 4px;
        }

        :host {
          display: block;
          position: relative;
        }

        .mainContainer {
          position: relative;
        }

        md-menu {
          --md-menu-container-color: var(--md-sys-color-surface-container);
          --md-menu-container-elevation: 2;
          z-index: 2000;
        }

        md-linear-progress {
          margin: 16px;
          margin-bottom: 8px;
          margin-top: 8px;
        }

        .deleteMenuItem {
          color: var(--md-sys-color-error);
        }

        .mainContainer {
          height: 300px;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        .image {
          width: 100%;
          height: 113px;
          object-fit: cover;
          border-radius: 16px 16px 0 0;
        }

        .image[has-static-theme] {
          border-radius: 4px;
        }


        .mainContainer[has-static-theme] {
          border-radius: 4px;
        }

        .contentContainer {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          padding: 8px;
        }

        .agentClassName {
          font-size: 10px;
          text-align: left;
          margin: 8px;
          margin-top: 0;
          line-height: 15px;
          font-weight: 500;
          color: var(--md-sys-color-tertiary);
          text-transform: uppercase;
        }

        .agentName {
          font-size: 14px;
          text-align: left;
          font-weight: 700;
          margin: 0px;
          margin-top: 0;
          margin-bottom: 0;
          line-height: 22px;
          font-family: var(--md-ref-typeface-brand);
        }

        .statusMessage {
          font-size: 11px;
          text-align: center;
          margin-top: 2px;
          //border-radius: 16px;
          flex-grow: 1;
          color: var(--md-sys-color-on-surface-variant);
          overflow: hidden;
          text-overflow: ellipsis;
          height: 65px;
          max-height: 65px;
          max-width: 180px;
        }

        md-circular-progress {
          --md-circular-progress-size: 28px;
        }

        md-menu {
          --md-menu-z-index: 1000;
          z-index: 1000;
        }

        [hidden] {
          display: none !important;
        }
      `]}};W([t({type:Object})],Y.prototype,"agent",void 0),W([t({type:Number})],Y.prototype,"agentId",void 0),W([t({type:Boolean,reflect:!0})],Y.prototype,"hasStaticTheme",void 0),W([t({type:Number})],Y.prototype,"groupId",void 0),W([t({type:Boolean,reflect:!0})],Y.prototype,"running",void 0),W([b()],Y.prototype,"agentState",void 0),W([b()],Y.prototype,"latestMessage",void 0),W([b()],Y.prototype,"progress",void 0),W([b()],Y.prototype,"menuOpen",void 0),W([b()],Y.prototype,"agentMemory",void 0),W([A("#connectorMenuAnchor")],Y.prototype,"connectorMenuAnchor",void 0),W([A("#agentConnectorMenu")],Y.prototype,"agentConnectorMenu",void 0),W([A("#mainMenuAnchor")],Y.prototype,"mainMenuAnchor",void 0),W([A("#agentMainMenu")],Y.prototype,"agentMainMenu",void 0),W([A("#memoryDialog")],Y.prototype,"memoryDialog",void 0),W([A("#fileInput")],Y.prototype,"fileInput",void 0),Y=W([v("ps-agent-node")],Y);var X=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let K=class extends H{constructor(){super(...arguments),this.openInternalLinkInNewTab=!0}connectedCallback(){super.connectedCallback(),this.connector=window.psAppGlobals.getConnectorInstance(this.connectorId),this.connector.configuration.groupId?this.internalLink=`/group/${this.connector.configuration.groupId}`:"4b8c3d2e-5f6a-1a8b-9c0d-1ecf3afb536d"==this.connector.Class?.class_base_id?this.externalLink=`https://docs.google.com/spreadsheets/d/${this.connector.configuration.googleSheetsId}/`:"3a7b2c1d-4e5f-6a7b-8c9d-0e1f2a3b4c5d"==this.connector.Class?.class_base_id?this.externalLink=`https://docs.google.com/document/d/${this.connector.configuration.googleDocsId}/`:console.error(`No link for connector ${this.connectorId} ${this.connector.Class?.class_base_id}`)}static get styles(){return[super.styles,f`
        .image {
          width: 140px;
          height: 79px;
          border-radius: 16px 16px 0 0;
        }

        .image[has-static-theme] {
          border-radius: 4px;
        }

        .linkIcon {
          margin: 4px;
        }

        .name {
          height: 16px;
          margin-top: 8px;
          font-size: 14px;
          text-align: center;
          align-items: center;
        }

        .mainContainer {
          border-radius: 16px;
          height: 100%;
        }

        .mainContainer[has-static-theme] {
          border-radius: 4px;
        }

        .connectorType {
          font-size: 10px;
          text-align: left;
          margin: 8px;
          margin-top: 8px;
          line-height: 15px;
          font-weight: 500;
          color: var(--md-sys-color-tertiary);
          text-transform: uppercase;
        }

        .instanceName {
          font-size: 14px;
          text-align: left;
          font-weight: 700;
          margin: 8px;
          margin-top: 0;
          margin-bottom: 16px;
          line-height: 22px;
          font-family: var(--md-ref-typeface-brand);
        }

        md-icon-button[root-cause] {
          --md-icon-button-icon-color: var(--md-sys-color-on-primary);
        }

        md-circular-progress {
          --md-circular-progress-size: 28px;
          margin-bottom: 6px;
        }

        md-menu {
          --md-menu-z-index: 1000;
          z-index: 1000;
        }
      `]}editNode(){this.fire("edit-node",{nodeId:this.nodeId,element:this.connector})}toggleMenu(){const e=this.shadowRoot?.getElementById("menu");e.open=!e.open}renderImage(){return r`
      <div class="layout horizontal center-center">
        <img
          class="image"
          ?has-static-theme=${this.hasStaticTheme}
          src="${this.connector.Class?.configuration.imageUrl}"
          alt="${this.connector.Class?.name}"
        />
      </div>
    `}openInternalLink(){let e=this.internalLink;this.openInternalLinkInNewTab?(e=`${window.location.origin}${e}`,window.open(e,"_blank")):(this.fire("yp-change-header",{headerTitle:" ",documentTitle:this.agentName,headerDescription:"",backPath:"/group/"+this.groupId,keepOpenForGroup:`/group/${this.groupId}`}),w.redirectTo(e))}openExternalLink(){window.open(this.externalLink,"_blank")}render(){return this.connector?r`
        <div class="layout vertical mainContainer" ?has-static-theme=${this.hasStaticTheme}>
          ${this.renderImage()}
          <div class="name connectorType">${this.connector.Class?.name}</div>
          ${this.connector.configuration.name?r`<div class="instanceName">
                ${this.connector.configuration.name}
              </div>`:C}

          <div class="layout horizontal">
            <md-icon-button
              class="linkIcon"
              @click="${this.editNode}"
              aria-label="Connector settings"
              ><md-icon>settings</md-icon></md-icon-button
            >
            <div class="flex"></div>
            ${this.internalLink?r`
                  <md-icon-button
                    class="linkIcon"
                    @click="${this.openInternalLink}"
                    aria-label="Open connector"
                  >
                    <md-icon>read_more</md-icon>
                  </md-icon-button>
                `:C}
            ${this.externalLink?r`
                  <md-icon-button
                    class="linkIcon"
                    @click="${this.openExternalLink}"
                    aria-label="Open external connector link"
                  >
                    <md-icon>read_more</md-icon>
                  </md-icon-button>
                `:C}
          </div>
        </div>
      `:C}};X([t({type:Boolean,reflect:!0})],K.prototype,"hasStaticTheme",void 0),X([t({type:Object})],K.prototype,"connector",void 0),X([t({type:Number})],K.prototype,"connectorId",void 0),X([t({type:Number})],K.prototype,"groupId",void 0),X([t({type:String})],K.prototype,"agentName",void 0),X([t({type:String})],K.prototype,"internalLink",void 0),X([t({type:String})],K.prototype,"externalLink",void 0),X([t({type:Boolean})],K.prototype,"openInternalLinkInNewTab",void 0),K=X([v("ps-connector-node")],K);const J=new x;class V extends E{constructor(){super(...arguments),this.observer=null,this.updateNodePosition=z((()=>{const e=this.model.attributes.nodeType,t="agent"===e?this.model.attributes.agentId:this.model.attributes.connectorId,i=this.model.position();J.updateNodeConfiguration(this.model.attributes.groupId,e,t,{graphPosX:i.x,graphPosY:i.y})}),500)}remove(){return this.observer&&this.observer.disconnect(),super.remove(),this}render(){super.render(),this.model.get("markup");const e=this.model.attributes.nodeType;let t=200,i=300;"connector"===e&&(t=140,i=180);const o=T("foreignObject",{width:t,height:i,style:"overflow: visible; display: block;"}).node;return T(this.el).append(o),setTimeout((()=>{const t=document.createElement("div");t.setAttribute("class","html-element"),t.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),"agent"===e?(t.innerHTML=`<ps-agent-node\n          agentId="${this.model.attributes.agentId}"\n          groupId="${this.model.attributes.groupId}"\n          hasStaticTheme="${this.model.attributes.hasStaticTheme}"\n        >\n     </ps-agent-node>`,t.className="agentContainer",this.setupRunningObserver(t)):(t.innerHTML=`<ps-connector-node\n          connectorId="${this.model.attributes.connectorId}"\n          groupId="${this.model.attributes.groupId}"\n          agentName="${this.model.attributes.agentName}"\n          hasStaticTheme="${this.model.attributes.hasStaticTheme}"\n        >\n      </ps-connector-node>`,t.className="connectorContainer"),o.appendChild(t),o.getBoundingClientRect()}),0),this.listenTo(this.model,"change:position",this.updateNodePosition),this.update(),this}setupRunningObserver(e){const t=e.querySelector("ps-agent-node");t&&(this.observer=new MutationObserver((i=>{i.forEach((i=>{if("attributes"===i.type&&"running"===i.attributeName){t.hasAttribute("running")?e.classList.add("agentContainerRunning"):e.classList.remove("agentContainerRunning")}}))})),this.observer.observe(t,{attributes:!0,attributeFilter:["running"]}))}}class Q extends R{constructor(){super(...arguments),this.view=V}defaults(){return O({type:"html.AgentShape",attrs:{},markup:"<div></div>"},R.prototype.defaults)}}class Z extends R{constructor(){super(...arguments),this.view=V}defaults(){return O({type:"html.Connectorshape",attrs:{},markup:"<div></div>"},R.prototype.defaults)}}var ee=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let te=class extends F{constructor(){super(),this.minimizeWorkflow=!1,this.connectorRegistry={},this.elements={},this.selection=null,this.panning=!1,this.lastClientX=0,this.lastClientY=0,this.jointNamespace={},this.api=new x}async connectedCallback(){super.connectedCallback(),window.appGlobals.activity("Agent Ops - open"),window.addEventListener("resize",(()=>{this.updatePaperSize()}))}zoom(e,t,i){const o=this.paper.scale().sx*e,n=this.paper.getComputedSize(),r=e-1,s=(t-n.width/2)*r/e,a=(i-n.height/2)*r/e;this.paper.translate(this.paper.translate().tx-s,this.paper.translate().ty-a),this.paper.scale(o,o)}zoomIn(){const e=this.paper.getComputedSize();this.zoom(1.1,e.width/2,e.height/2)}zoomOut(){const e=this.paper.getComputedSize();this.zoom(.9,e.width/2,e.height/2)}resetZoom(){this.paper.scale(1,1)}firstUpdated(e){this.initializeJointJS(),this.paper.el.addEventListener("wheel",(e=>{e.shiftKey&&(e.preventDefault(),this.debounce&&clearTimeout(this.debounce),this.debounce=window.setTimeout((()=>{const t=this.paper.clientToLocalPoint({x:e.offsetX,y:e.offsetY}),i=e.deltaY<0?1.05:.95;this.zoom(i,t.x,t.y)}),5))}))}updated(e){super.updated(e),e.has("currentAgent")&&this.currentAgent&&(this.paper.freeze(),this.updateGraphWithAgentData(),this.paper.unfreeze())}disconnectedCallback(){super.disconnectedCallback(),window.appGlobals.activity("Agent Ops - close")}handleNodeDoubleClick(e,t=!1){const i=e.getBBox();if(t){const e=(i.x+i.width/2)*this.paper.scale().sx,t=(i.y+i.height/2)*this.paper.scale().sy,o=this.paper.scale().sx,n=1/4,r=Math.max(this.paper.options.zoom.min,o*n);this.zoom(r,e,t)}else{const e=i.x+i.width/2,t=i.y+i.height/2;this.zoom(2,e,t)}}createLink(e,t,i){if(!e||!t)return console.error(`source or target is null ${e} ${t}`),null;return new N({source:{id:i?t.id:e.id},target:{id:i?e.id:t.id},attrs:{line:{stroke:"var(--md-sys-color-on-surface)",strokeWidth:2,targetMarker:{type:"path",d:"M 10 -5 L 0 0 L 10 5 z",fill:"var(--md-sys-color-on-surface)"}}},z:1,router:{name:"manhattan",args:{step:20}},connector:{name:"rounded"}})}async initializeJointJS(){const e=this.shadowRoot?.getElementById("paper-container");if(!e)return void console.error("Paper container not found");this.graph=new D({},{cellNamespace:this.jointNamespace}),this.paper=new L({elementView:()=>V,el:e,model:this.graph,cellViewNamespace:this.jointNamespace,width:"100%",height:"100%",gridSize:20,panning:{enabled:!1,modifiers:"mouseMiddle"},zoom:{enabled:!0,mousewheel:!1,wheelEnabled:!0,max:2,min:.2,step:.2},async:!0,frozen:!0,sorting:L.sorting.APPROX,background:{color:"var(--md-sys-color-surface)"},clickThreshold:10,defaultConnector:{name:"rounded"},defaultRouter:{name:"manhattan",args:{step:15}}}),this.paper.on("element:pointerclick",(e=>{})),this.paper.on("element:pointerdblclick",((e,t)=>{const i=e.model;t.shiftKey&&this.handleNodeDoubleClick(i,!0),t.shiftKey&&t.ctrlKey&&this.handleNodeDoubleClick(i)})),this.paper.on("blank:pointerclick",((e,t)=>{})),T(e).prepend(T("style",{type:"text/css"}).text("\n      .joint-element .selection {\n          stroke: var(--md-sys-color-surface);\n      }\n      .joint-link .selection {\n          stroke: var(--md-sys-color-surface);\n          stroke-dasharray: 5;\n          stroke-dashoffset: 10;\n          animation: dash 0.5s infinite linear;\n      }\n      @keyframes dash {\n          to {\n              stroke-dashoffset: 0;\n          }\n      }\n    ")),Object.assign(this.jointNamespace,{myShapeGroup:{AgentsShapeView:V,AgentShape:Q,ConnectorShape:Z},standard:{Rectangle:R}}),this.paper.unfreeze(),this.updatePaperSize(),await this.updateComplete;const t=this.paper.el;t.addEventListener("mousedown",(e=>{1===e.button&&(this.panning=!0,this.lastClientX=e.clientX,this.lastClientY=e.clientY,t.style.cursor="move",e.preventDefault())})),t.addEventListener("mousemove",(e=>{if(this.panning){const t=e.clientX-this.lastClientX,i=e.clientY-this.lastClientY;this.lastClientX=e.clientX,this.lastClientY=e.clientY;const o=this.paper.translate();this.paper.translate(o.tx+t,o.ty+i)}})),t.addEventListener("mouseup",(e=>{this.panning&&1===e.button&&(this.panning=!1,t.style.cursor="default")})),t.addEventListener("mouseleave",(e=>{this.panning&&(this.panning=!1,t.style.cursor="default")}))}applyDirectedGraphLayout(){this.graph.getElements().forEach((e=>{}));const e=this.graph.getBBox(),t=100-e.x-e.width/2,i=100-e.y-e.height/2;this.graph.translate(t,i)}centerParentNodeOnScreen(e){const t=this.elements[e];if(!t)return void console.error(`Parent node with ID ${e} not found.`);const i=this.paper.scale().sx,o=t.getBBox(),n=this.paper.getComputedSize(),r=o.x+o.width/2,s=o.y+o.height/2,a=n.width/2-r*i,d=n.height/2-s*i;this.paper.translate(a-53.5,d-92.5)}updatePaperSize(){this.paper?this.paper.transformToFitContent({padding:78,minScaleX:.2,minScaleY:.2,maxScaleX:1.1,maxScaleY:1.1,preserveAspectRatio:!0,contentArea:this.graph.getBBox(),verticalAlign:"top",horizontalAlign:"middle"}):console.warn("Paper not initialized")}createAgentElement(e){if(this.elements[this.getUniqueAgentId(e)])return this.elements[this.getUniqueAgentId(e)];window.psAppGlobals.addToAgentsRegistry(e);const t=new Q({position:{x:e.configuration.graphPosX||600*Math.random(),y:e.configuration.graphPosY||400*Math.random()},label:e.Class?.configuration.description,text:e.Class?.configuration.description,agentId:e.id,groupId:this.groupId,hasStaticTheme:this.hasStaticTheme,nodeType:"agent",attrs:{},type:"html.Element"});return t.addTo(this.graph),t}createConnectorElement(e,t){let i,o,n=this.elements[this.getUniqueAgentId(t)];if(this.elements[this.getUniqueConnectorId(e)]?i=this.elements[this.getUniqueConnectorId(e)]:(window.psAppGlobals.addToConnectorsRegistry(e),o=new Z({position:{x:e.configuration.graphPosX||600*Math.random(),y:e.configuration.graphPosY||400*Math.random()},label:e.Class?.configuration.description,text:e.Class?.configuration.description,connectorId:e.id,agentName:t.configuration.name,hasStaticTheme:this.hasStaticTheme,groupId:this.groupId,nodeType:"connector",attrs:{},type:"html.Element"}),o.addTo(this.graph),i=o),n&&i&&t){const o=t.InputConnectors?.some((t=>t.id===e.id)),r=this.createLink(n,i,o);r?.addTo(this.graph)}else console.warn("Source or target element not found");return o}getUniqueConnectorId(e){return`connector-${e.id}`}getUniqueAgentId(e){return`agent-${e.id}`}updateGraphWithAgentData(){this.graph.clear(),this.elements={};const e=new Set;this.currentAgent.SubAgents&&this.currentAgent.SubAgents.length>0&&this.currentAgent.SubAgents.forEach((t=>{const i=this.createAgentElement(t);this.elements[this.getUniqueAgentId(t)]=i,e.add(this.getUniqueAgentId(t));[...t.InputConnectors,...t.OutputConnectors].forEach((i=>{const o=this.createConnectorElement(i,t);this.elements[this.getUniqueConnectorId(i)]=o,e.add(this.getUniqueConnectorId(i))}))}));[...this.currentAgent.InputConnectors,...this.currentAgent.OutputConnectors].forEach((t=>{const i=this.createConnectorElement(t,this.currentAgent);this.elements[this.getUniqueConnectorId(t)]=i,e.add(this.getUniqueConnectorId(t))})),setTimeout((()=>{this.applyDirectedGraphLayout(),this.updatePaperSize()}))}selectElement(e){this.selection&&(this.unhighlightCell(this.selection),this.graph.getLinks().forEach((e=>this.unhighlightCell(e)))),e?(this.highlightCell(e),this.selection=e):this.selection=null}highlightCell(e){const t=e.findView(this.paper);t&&P.add(t,e.isElement()?"body":"line","selection",{className:"selection"})}unhighlightCell(e){const t=e.findView(this.paper);t&&P.remove(t,"selection")}static get styles(){return[super.styles,f`
        md-fab {
          --md-fab-container-shape: 4px;
          --md-fab-label-text-size: 16px !important;
          --md-fab-label-text-weight: 600 !important;
          margin-bottom: 24px;
          --md-fab-container-elevation: 0;
          --md-fab-container-shadow-color: transparent;
        }

        .addAgentButton {
          width: 180px;
        }

        .addAgentButton {
          max-height: 36px;
          margin-top: 10px;
          margin-right: 16px;
        }

        md-fab:not([has-static-theme]) {
          --md-sys-color-primary-container: var(--md-sys-color-primary);
          --md-sys-color-on-primary-container: var(--md-sys-color-on-primary);
        }
        .agentHeaderImage {
          max-width: 72px;
          border-radius: 16px;
        }

        .agentHeaderText {
          font-size: 17px;
          padding: 8px;
          margin-left: 16px;
          margin-right: 16px;
          font-family: var(--md-ref-typeface-brand);
        }

        .agentHeader {
          margin-left: 16px;
        }

        .mainAgentPlayButton {
          margin-right: 10px;
        }

        .mainAgentStopButton {
          --md-filled-icon-button-selected-container-color: var(
            --md-sys-color-error
          );
          margin-right: 10px;
        }

        .navControls {
          margin-left: 16px;
        }

        .masterPlayConfigButtons {
          margin-right: 16px;
        }

        .agentContainer {
          color: var(--md-sys-color-on-surface);
          background-color: var(--md-sys-color-surface-container-high);
          padding: 0;
        }

        .agentContainer {
          background-color: var(--md-sys-color-surface-container-lowest);
          border-radius: 16px;
          border: 1px solid var(--md-sys-color-surface-container-high);
        }

        .agentContainer[has-static-theme] {
          border-radius: 4px;
        }

        .agentContainerRunning {
          color: var(--md-sys-color-on-surface);
          background-color: var(--md-sys-color-surface-container-highest);
          border-radius: 16px;
          padding: 0;
        }

        .agentContainerRunning {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-surface-container-highest);
        }

        .connectorContainer[has-static-theme] {
          border-radius: 4px;
        }

        .connectorContainer {
          color: var(--md-sys-color-on-surface);
          background-color: var(--md-sys-color-surface-container-low);
          padding: 0;
        }

        .connectorContainer[has-static-theme] {
          border-radius: 4px;
        }

        .connectorContainer {
          background-color: var(--md-sys-color-surface-container-lowest);
          border: 1px solid var(--md-sys-color-surface-container-highest);
        }

        /* Define your component styles here */
        .jointJSCanvas {
          width: 100vw !important;
          height: calc(500vh - 90px) !important;
          overflow-x: auto !important;
          overflow-y: auto !important;
          /* styles for the JointJS canvas */
        }

        .jointJSCanvas[minimize-workflow] {
          height: 100% !important;
          width: 920px !important;
          height: 500px !important;
        }

        .controlPanel {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin: 0 0;
          width: 100%;
          position: absolute;
          top: 198px;
          left: 0;
          width: 100%;
          padding: 0;
          opacity: 1;
          height: 52px;
          z-index: 1000;
          background: transparent;
          color: var(--md-sys-color-on-surface-variant);
        }

        md-filled-tonal-icon-button {
          margin-left: 8px;
          margin-right: 8px;
        }

        .firstButton {
          margin-left: 16px;
        }

        .lastButton {
          margin-right: 16px;
        }

        @keyframes fadeAwayAnimation {
          0% {
            opacity: 1;
          }
          8% {
            opacity: 0.1;
          }
          100% {
            opacity: 1;
          }
        }

        .fadeAway {
          animation: fadeAwayAnimation 60.5s;
        }

        .downloadButton {
          margin-right: 28px;
        }
      `]}pan(e){const t=this.paper.translate();let i=0,o=0;switch(e){case"left":i=25;break;case"right":i=-25;break;case"up":o=25;break;case"down":o=-25}this.paper.translate(t.tx+i,t.ty+o)}renderHeader(){return r`
      <div class="layout horizontal center-center agentHeader">
        <img
          src="${I.getImageFormatUrl(this.group.GroupLogoImages,0)}"
          class="agentHeaderImage"
          alt="${this.group.name}"
        />
        <div class="layout vertical agentHeaderText">${this.group.name}</div>
      </div>
    `}stop(){this.fireGlobal("pause-agent",{agentId:this.currentAgent.id}),window.psAppGlobals.setCurrentRunningAgentId(void 0)}start(){this.fireGlobal("run-agent",{agentId:this.currentAgent.id}),window.psAppGlobals.setCurrentRunningAgentId(this.currentAgent.id)}render(){return r`
      <div class="controlPanel" ?hidden="${this.minimizeWorkflow}">
        <div class="navControls">
          <md-icon-button
            @click="${this.zoomIn}"
            class="firstButton"
            aria-label="Zoom in"
            ><md-icon>zoom_in</md-icon></md-icon-button
          >
          <md-icon-button @click="${this.zoomOut}" aria-label="Zoom out"
            ><md-icon>zoom_out</md-icon></md-icon-button
          >
          <md-icon-button @click="${this.resetZoom}" aria-label="Reset zoom"
            ><md-icon>center_focus_strong</md-icon></md-icon-button
          >
          <md-icon-button
            @click="${this.updatePaperSize}"
            aria-label="Fit workflow to screen"
            ><md-icon>zoom_out_map</md-icon></md-icon-button
          >
        </div>

        <div class="flex"></div>

        <div class="masterPlayConfigButtons" ?hidden="${this.minimizeWorkflow}">
          ${this.currentRunningAgentId?r`<md-filled-icon-button
                class="mainAgentStopButton"
                @click="${this.stop}"
                aria-label="${this.t("stop")}"
                ><md-icon>stop</md-icon></md-filled-icon-button
              >`:r`<md-outlined-icon-button
                hidden
                class="mainAgentPlayButton"
                @click="${this.start}"
                aria-label="${this.t("start")}"
                ><md-icon>play_arrow</md-icon></md-outlined-icon-button
              >`}
          <md-fab
            ?has-static-theme="${this.hasStaticTheme}"
            lowered
            size="large"
            class="addAgentButton"
            variant="primary"
            @click="${()=>this.fire("add-agent")}"
            .label="   ${this.t("Add Agent")}"
          >
            <md-icon hidden slot="icon">addExistingConnector</md-icon></md-fab
          >
        </div>

        <div hidden ?hidden="${this.minimizeWorkflow}">
          <md-icon-button @click="${()=>this.pan("left")}" aria-label="Pan left"
            ><md-icon>arrow_back</md-icon></md-icon-button
          >

          <md-icon-button @click="${()=>this.pan("up")}" aria-label="Pan up"
            ><md-icon>arrow_upward</md-icon></md-icon-button
          >

          <md-icon-button @click="${()=>this.pan("down")}" aria-label="Pan down"
            ><md-icon>arrow_downward</md-icon></md-icon-button
          >

          <md-icon-button
            @click="${()=>this.pan("right")}"
            class="lastButton"
            aria-label="Pan right"
            ><md-icon>arrow_forward</md-icon></md-icon-button
          >
        </div>
      </div>
      <div
        class="jointJSCanvas"
        id="paper-container"
        ?minimize-workflow="${this.minimizeWorkflow}"
      ></div>
    `}};ee([t({type:Object})],te.prototype,"currentAgent",void 0),ee([t({type:Number})],te.prototype,"groupId",void 0),ee([t({type:Boolean})],te.prototype,"minimizeWorkflow",void 0),ee([t({type:Object})],te.prototype,"group",void 0),ee([t({type:Object})],te.prototype,"connectorRegistry",void 0),te=ee([v("ps-operations-view")],te);
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class ie extends M{constructor(){super(...arguments),this.fieldTag=$`md-filled-field`}}
/**
 * @license
 * Copyright 2024 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const oe=f`:host{--_text-field-active-indicator-color: var(--md-filled-select-text-field-active-indicator-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-active-indicator-height: var(--md-filled-select-text-field-active-indicator-height, 1px);--_text-field-container-color: var(--md-filled-select-text-field-container-color, var(--md-sys-color-surface-container-highest, #e6e0e9));--_text-field-disabled-active-indicator-color: var(--md-filled-select-text-field-disabled-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-active-indicator-height: var(--md-filled-select-text-field-disabled-active-indicator-height, 1px);--_text-field-disabled-active-indicator-opacity: var(--md-filled-select-text-field-disabled-active-indicator-opacity, 0.38);--_text-field-disabled-container-color: var(--md-filled-select-text-field-disabled-container-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-container-opacity: var(--md-filled-select-text-field-disabled-container-opacity, 0.04);--_text-field-disabled-input-text-color: var(--md-filled-select-text-field-disabled-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-input-text-opacity: var(--md-filled-select-text-field-disabled-input-text-opacity, 0.38);--_text-field-disabled-label-text-color: var(--md-filled-select-text-field-disabled-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-label-text-opacity: var(--md-filled-select-text-field-disabled-label-text-opacity, 0.38);--_text-field-disabled-leading-icon-color: var(--md-filled-select-text-field-disabled-leading-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-leading-icon-opacity: var(--md-filled-select-text-field-disabled-leading-icon-opacity, 0.38);--_text-field-disabled-supporting-text-color: var(--md-filled-select-text-field-disabled-supporting-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-supporting-text-opacity: var(--md-filled-select-text-field-disabled-supporting-text-opacity, 0.38);--_text-field-disabled-trailing-icon-color: var(--md-filled-select-text-field-disabled-trailing-icon-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-disabled-trailing-icon-opacity: var(--md-filled-select-text-field-disabled-trailing-icon-opacity, 0.38);--_text-field-error-active-indicator-color: var(--md-filled-select-text-field-error-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-active-indicator-color: var(--md-filled-select-text-field-error-focus-active-indicator-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-input-text-color: var(--md-filled-select-text-field-error-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-focus-label-text-color: var(--md-filled-select-text-field-error-focus-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-leading-icon-color: var(--md-filled-select-text-field-error-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-focus-supporting-text-color: var(--md-filled-select-text-field-error-focus-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-focus-trailing-icon-color: var(--md-filled-select-text-field-error-focus-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-active-indicator-color: var(--md-filled-select-text-field-error-hover-active-indicator-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-input-text-color: var(--md-filled-select-text-field-error-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-label-text-color: var(--md-filled-select-text-field-error-hover-label-text-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-hover-leading-icon-color: var(--md-filled-select-text-field-error-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-hover-state-layer-color: var(--md-filled-select-text-field-error-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-hover-state-layer-opacity: var(--md-filled-select-text-field-error-hover-state-layer-opacity, 0.08);--_text-field-error-hover-supporting-text-color: var(--md-filled-select-text-field-error-hover-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-hover-trailing-icon-color: var(--md-filled-select-text-field-error-hover-trailing-icon-color, var(--md-sys-color-on-error-container, #410e0b));--_text-field-error-input-text-color: var(--md-filled-select-text-field-error-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-error-label-text-color: var(--md-filled-select-text-field-error-label-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-leading-icon-color: var(--md-filled-select-text-field-error-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-error-supporting-text-color: var(--md-filled-select-text-field-error-supporting-text-color, var(--md-sys-color-error, #b3261e));--_text-field-error-trailing-icon-color: var(--md-filled-select-text-field-error-trailing-icon-color, var(--md-sys-color-error, #b3261e));--_text-field-focus-active-indicator-color: var(--md-filled-select-text-field-focus-active-indicator-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-active-indicator-height: var(--md-filled-select-text-field-focus-active-indicator-height, 3px);--_text-field-focus-input-text-color: var(--md-filled-select-text-field-focus-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-focus-label-text-color: var(--md-filled-select-text-field-focus-label-text-color, var(--md-sys-color-primary, #6750a4));--_text-field-focus-leading-icon-color: var(--md-filled-select-text-field-focus-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-supporting-text-color: var(--md-filled-select-text-field-focus-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-focus-trailing-icon-color: var(--md-filled-select-text-field-focus-trailing-icon-color, var(--md-sys-color-primary, #6750a4));--_text-field-hover-active-indicator-color: var(--md-filled-select-text-field-hover-active-indicator-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-active-indicator-height: var(--md-filled-select-text-field-hover-active-indicator-height, 1px);--_text-field-hover-input-text-color: var(--md-filled-select-text-field-hover-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-label-text-color: var(--md-filled-select-text-field-hover-label-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-leading-icon-color: var(--md-filled-select-text-field-hover-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-state-layer-color: var(--md-filled-select-text-field-hover-state-layer-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-hover-state-layer-opacity: var(--md-filled-select-text-field-hover-state-layer-opacity, 0.08);--_text-field-hover-supporting-text-color: var(--md-filled-select-text-field-hover-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-hover-trailing-icon-color: var(--md-filled-select-text-field-hover-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-input-text-color: var(--md-filled-select-text-field-input-text-color, var(--md-sys-color-on-surface, #1d1b20));--_text-field-input-text-font: var(--md-filled-select-text-field-input-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-input-text-line-height: var(--md-filled-select-text-field-input-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-input-text-size: var(--md-filled-select-text-field-input-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-input-text-weight: var(--md-filled-select-text-field-input-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-label-text-color: var(--md-filled-select-text-field-label-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-label-text-font: var(--md-filled-select-text-field-label-text-font, var(--md-sys-typescale-body-large-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-label-text-line-height: var(--md-filled-select-text-field-label-text-line-height, var(--md-sys-typescale-body-large-line-height, 1.5rem));--_text-field-label-text-populated-line-height: var(--md-filled-select-text-field-label-text-populated-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-label-text-populated-size: var(--md-filled-select-text-field-label-text-populated-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-label-text-size: var(--md-filled-select-text-field-label-text-size, var(--md-sys-typescale-body-large-size, 1rem));--_text-field-label-text-weight: var(--md-filled-select-text-field-label-text-weight, var(--md-sys-typescale-body-large-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-leading-icon-color: var(--md-filled-select-text-field-leading-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-leading-icon-size: var(--md-filled-select-text-field-leading-icon-size, 24px);--_text-field-supporting-text-color: var(--md-filled-select-text-field-supporting-text-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-supporting-text-font: var(--md-filled-select-text-field-supporting-text-font, var(--md-sys-typescale-body-small-font, var(--md-ref-typeface-plain, Roboto)));--_text-field-supporting-text-line-height: var(--md-filled-select-text-field-supporting-text-line-height, var(--md-sys-typescale-body-small-line-height, 1rem));--_text-field-supporting-text-size: var(--md-filled-select-text-field-supporting-text-size, var(--md-sys-typescale-body-small-size, 0.75rem));--_text-field-supporting-text-weight: var(--md-filled-select-text-field-supporting-text-weight, var(--md-sys-typescale-body-small-weight, var(--md-ref-typeface-weight-regular, 400)));--_text-field-trailing-icon-color: var(--md-filled-select-text-field-trailing-icon-color, var(--md-sys-color-on-surface-variant, #49454f));--_text-field-trailing-icon-size: var(--md-filled-select-text-field-trailing-icon-size, 24px);--_text-field-container-shape-start-start: var(--md-filled-select-text-field-container-shape-start-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-start-end: var(--md-filled-select-text-field-container-shape-start-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-extra-small, 4px)));--_text-field-container-shape-end-end: var(--md-filled-select-text-field-container-shape-end-end, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--_text-field-container-shape-end-start: var(--md-filled-select-text-field-container-shape-end-start, var(--md-filled-select-text-field-container-shape, var(--md-sys-shape-corner-none, 0px)));--md-filled-field-active-indicator-color: var(--_text-field-active-indicator-color);--md-filled-field-active-indicator-height: var(--_text-field-active-indicator-height);--md-filled-field-container-color: var(--_text-field-container-color);--md-filled-field-container-shape-end-end: var(--_text-field-container-shape-end-end);--md-filled-field-container-shape-end-start: var(--_text-field-container-shape-end-start);--md-filled-field-container-shape-start-end: var(--_text-field-container-shape-start-end);--md-filled-field-container-shape-start-start: var(--_text-field-container-shape-start-start);--md-filled-field-content-color: var(--_text-field-input-text-color);--md-filled-field-content-font: var(--_text-field-input-text-font);--md-filled-field-content-line-height: var(--_text-field-input-text-line-height);--md-filled-field-content-size: var(--_text-field-input-text-size);--md-filled-field-content-weight: var(--_text-field-input-text-weight);--md-filled-field-disabled-active-indicator-color: var(--_text-field-disabled-active-indicator-color);--md-filled-field-disabled-active-indicator-height: var(--_text-field-disabled-active-indicator-height);--md-filled-field-disabled-active-indicator-opacity: var(--_text-field-disabled-active-indicator-opacity);--md-filled-field-disabled-container-color: var(--_text-field-disabled-container-color);--md-filled-field-disabled-container-opacity: var(--_text-field-disabled-container-opacity);--md-filled-field-disabled-content-color: var(--_text-field-disabled-input-text-color);--md-filled-field-disabled-content-opacity: var(--_text-field-disabled-input-text-opacity);--md-filled-field-disabled-label-text-color: var(--_text-field-disabled-label-text-color);--md-filled-field-disabled-label-text-opacity: var(--_text-field-disabled-label-text-opacity);--md-filled-field-disabled-leading-content-color: var(--_text-field-disabled-leading-icon-color);--md-filled-field-disabled-leading-content-opacity: var(--_text-field-disabled-leading-icon-opacity);--md-filled-field-disabled-supporting-text-color: var(--_text-field-disabled-supporting-text-color);--md-filled-field-disabled-supporting-text-opacity: var(--_text-field-disabled-supporting-text-opacity);--md-filled-field-disabled-trailing-content-color: var(--_text-field-disabled-trailing-icon-color);--md-filled-field-disabled-trailing-content-opacity: var(--_text-field-disabled-trailing-icon-opacity);--md-filled-field-error-active-indicator-color: var(--_text-field-error-active-indicator-color);--md-filled-field-error-content-color: var(--_text-field-error-input-text-color);--md-filled-field-error-focus-active-indicator-color: var(--_text-field-error-focus-active-indicator-color);--md-filled-field-error-focus-content-color: var(--_text-field-error-focus-input-text-color);--md-filled-field-error-focus-label-text-color: var(--_text-field-error-focus-label-text-color);--md-filled-field-error-focus-leading-content-color: var(--_text-field-error-focus-leading-icon-color);--md-filled-field-error-focus-supporting-text-color: var(--_text-field-error-focus-supporting-text-color);--md-filled-field-error-focus-trailing-content-color: var(--_text-field-error-focus-trailing-icon-color);--md-filled-field-error-hover-active-indicator-color: var(--_text-field-error-hover-active-indicator-color);--md-filled-field-error-hover-content-color: var(--_text-field-error-hover-input-text-color);--md-filled-field-error-hover-label-text-color: var(--_text-field-error-hover-label-text-color);--md-filled-field-error-hover-leading-content-color: var(--_text-field-error-hover-leading-icon-color);--md-filled-field-error-hover-state-layer-color: var(--_text-field-error-hover-state-layer-color);--md-filled-field-error-hover-state-layer-opacity: var(--_text-field-error-hover-state-layer-opacity);--md-filled-field-error-hover-supporting-text-color: var(--_text-field-error-hover-supporting-text-color);--md-filled-field-error-hover-trailing-content-color: var(--_text-field-error-hover-trailing-icon-color);--md-filled-field-error-label-text-color: var(--_text-field-error-label-text-color);--md-filled-field-error-leading-content-color: var(--_text-field-error-leading-icon-color);--md-filled-field-error-supporting-text-color: var(--_text-field-error-supporting-text-color);--md-filled-field-error-trailing-content-color: var(--_text-field-error-trailing-icon-color);--md-filled-field-focus-active-indicator-color: var(--_text-field-focus-active-indicator-color);--md-filled-field-focus-active-indicator-height: var(--_text-field-focus-active-indicator-height);--md-filled-field-focus-content-color: var(--_text-field-focus-input-text-color);--md-filled-field-focus-label-text-color: var(--_text-field-focus-label-text-color);--md-filled-field-focus-leading-content-color: var(--_text-field-focus-leading-icon-color);--md-filled-field-focus-supporting-text-color: var(--_text-field-focus-supporting-text-color);--md-filled-field-focus-trailing-content-color: var(--_text-field-focus-trailing-icon-color);--md-filled-field-hover-active-indicator-color: var(--_text-field-hover-active-indicator-color);--md-filled-field-hover-active-indicator-height: var(--_text-field-hover-active-indicator-height);--md-filled-field-hover-content-color: var(--_text-field-hover-input-text-color);--md-filled-field-hover-label-text-color: var(--_text-field-hover-label-text-color);--md-filled-field-hover-leading-content-color: var(--_text-field-hover-leading-icon-color);--md-filled-field-hover-state-layer-color: var(--_text-field-hover-state-layer-color);--md-filled-field-hover-state-layer-opacity: var(--_text-field-hover-state-layer-opacity);--md-filled-field-hover-supporting-text-color: var(--_text-field-hover-supporting-text-color);--md-filled-field-hover-trailing-content-color: var(--_text-field-hover-trailing-icon-color);--md-filled-field-label-text-color: var(--_text-field-label-text-color);--md-filled-field-label-text-font: var(--_text-field-label-text-font);--md-filled-field-label-text-line-height: var(--_text-field-label-text-line-height);--md-filled-field-label-text-populated-line-height: var(--_text-field-label-text-populated-line-height);--md-filled-field-label-text-populated-size: var(--_text-field-label-text-populated-size);--md-filled-field-label-text-size: var(--_text-field-label-text-size);--md-filled-field-label-text-weight: var(--_text-field-label-text-weight);--md-filled-field-leading-content-color: var(--_text-field-leading-icon-color);--md-filled-field-supporting-text-color: var(--_text-field-supporting-text-color);--md-filled-field-supporting-text-font: var(--_text-field-supporting-text-font);--md-filled-field-supporting-text-line-height: var(--_text-field-supporting-text-line-height);--md-filled-field-supporting-text-size: var(--_text-field-supporting-text-size);--md-filled-field-supporting-text-weight: var(--_text-field-supporting-text-weight);--md-filled-field-trailing-content-color: var(--_text-field-trailing-icon-color)}[has-start] .icon.leading{font-size:var(--_text-field-leading-icon-size);height:var(--_text-field-leading-icon-size);width:var(--_text-field-leading-icon-size)}.icon.trailing{font-size:var(--_text-field-trailing-icon-size);height:var(--_text-field-trailing-icon-size);width:var(--_text-field-trailing-icon-size)}
`
/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */;let ne=class extends ie{};var re,se,ae;ne.styles=[_,oe],ne=e([v("md-filled-select")],ne),function(e){e.Embedding="embedding",e.Text="text",e.MultiModal="multiModal",e.Audio="audio",e.Video="video",e.Image="image",e.TextReasoning="reasoning",e.MultiModalReasoning="multiModalReasoning"}(re||(re={})),function(e){e.Large="large",e.Medium="medium",e.Small="small"}(se||(se={})),function(e){e.OpenAI="openai",e.OpenAIResponses="openaiResponses",e.Anthropic="anthropic",e.Google="google",e.Azure="azure"}(ae||(ae={}));var de=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let le=class extends y{constructor(){super(...arguments),this.activeAiModels=[],this.requestedAiModelSizes=[],this.currentModels={},this.currentReasoningModels={},this.selectedAiModelIds={},this.selectedReasoningModelIds={},this.filteredAiModels={small:[],medium:[],large:[]},this.filteredReasoningModels={small:[],medium:[],large:[]}}updated(e){(e.has("activeAiModels")||e.has("requestedAiModelSizes"))&&(this.filterAiModels(),this.filterReasoningModels()),e.has("currentModels")&&(this.initializeSelectedModels(),this.initializeSelectedReasoningModels())}filterAiModels(){this.filteredAiModels={small:[],medium:[],large:[]},this.activeAiModels.forEach((e=>{if(e.configuration&&"modelSize"in e.configuration&&"type"in e.configuration&&!this.isReasoningModel(e.configuration.type)){const t=e.configuration.modelSize;t in this.filteredAiModels&&this.requestedAiModelSizes.includes(t)&&this.filteredAiModels[t].push(e)}}))}filterReasoningModels(){this.filteredReasoningModels={small:[],medium:[],large:[]},this.activeAiModels.forEach((e=>{if(e.configuration&&"type"in e.configuration&&this.isReasoningModel(e.configuration.type)&&"modelSize"in e.configuration){const t=e.configuration.modelSize;t in this.filteredReasoningModels&&this.requestedAiModelSizes.includes(t)&&this.filteredReasoningModels[t].push(e)}}))}isReasoningModel(e){return e===re.TextReasoning||e===re.MultiModalReasoning}initializeSelectedModels(){Object.entries(this.currentModels).forEach((([e,t])=>{void 0===this.selectedAiModelIds[e]&&(this.selectedAiModelIds[e]=t?t.id:null)})),this.requestUpdate()}initializeSelectedReasoningModels(){Object.entries(this.currentReasoningModels).forEach((([e,t])=>{void 0===this.selectedReasoningModelIds[e]&&(this.selectedReasoningModelIds[e]=t?t.id:null)})),this.requestUpdate()}render(){return r`
      <div
        class="layout vertical"
        ?hidden="${!this.requestedAiModelSizes||0===this.requestedAiModelSizes.length}"
      >
        <!-- Multi-modal Models Section -->
        <div class="modelType">${this.t("multiModalModels")}</div>
        <div class="ai-model-selectors">
          ${this.requestedAiModelSizes.map((e=>r`
              <div class="model-section">
                ${this.renderAiModelSelect(e)}
              </div>
            `))}
        </div>

        <!-- Reasoning Models Section -->
        <div class="modelType">${this.t("reasoningModels")}</div>
        <div class="ai-model-selectors">
          ${this.requestedAiModelSizes.map((e=>r`
              <div class="model-section">
                ${this.renderReasoningModelSelect(e)}
              </div>
            `))}
        </div>
      </div>
    `}renderAiModelSelect(e){const t=this.filteredAiModels[e],i=0===t.length,o=this.currentModels[e];return r`
      <div class="ai-model-select-container">
        <md-filled-select
          .label="${this.getLocalizedModelLabel(e)}"
          @change="${t=>this._handleAiModelSelection(t,e)}"
          ?disabled="${i}"
        >
          ${i?r`<md-select-option disabled>
                <div slot="headline">${this.t("noModelsAvailable")}</div>
              </md-select-option>`:t.map((e=>r`
                  <md-select-option
                    value="${e.id}"
                    ?selected="${e.id===o?.id}"
                  >
                    <div slot="headline">${e.name}</div>
                  </md-select-option>
                `))}
        </md-filled-select>
        ${o?r`
              <md-icon-button
                @click="${()=>this._handleRemoveModel(e)}"
                aria-label="${this.t("removeModel")}"
              >
                <md-icon>delete</md-icon>
              </md-icon-button>
            `:""}
      </div>
    `}renderReasoningModelSelect(e){const t=this.filteredReasoningModels[e],i=0===t.length,o=this.currentReasoningModels[e];return r`
      <div class="ai-model-select-container reasoning">
        <md-filled-select
          .label="${this.getLocalizedReasoningModelLabel(e)}"
          @change="${t=>this._handleAiReasoningModelSelection(t,e)}"
          ?disabled="${i}"
        >
          ${i?r`<md-select-option disabled>
                <div slot="headline">
                  ${this.t("noReasoningModelsAvailable")}
                </div>
              </md-select-option>`:t.map((e=>r`
                  <md-select-option
                    value="${e.id}"
                    ?selected="${e.id===o?.id}"
                  >
                    <div slot="headline">${e.name}</div>
                  </md-select-option>
                `))}
        </md-filled-select>
        ${o?r`
              <md-icon-button
                @click="${()=>this._handleRemoveReasoningModel(e)}"
                aria-label="${this.t("removeReasoningModel")}"
              >
                <md-icon>delete</md-icon>
              </md-icon-button>
            `:""}
      </div>
    `}getLocalizedModelLabel(e){switch(e){case"small":return this.t("selectSmallAiModel");case"medium":return this.t("selectMediumAiModel");case"large":return this.t("selectLargeAiModel");default:return this.t("selectAiModel")}}getLocalizedReasoningModelLabel(e){switch(e){case"small":return this.t("selectSmallReasoningModel");case"medium":return this.t("selectMediumReasoningModel");case"large":return this.t("selectLargeReasoningModel");default:return this.t("selectReasoningModel")}}_handleAiModelSelection(e,t){const i=e.target;this.selectedAiModelIds[t]=Number(i.value),this._emitChangeEvent(),this.requestUpdate()}_handleAiReasoningModelSelection(e,t){const i=e.target;this.selectedReasoningModelIds[t]=Number(i.value),this._emitChangeEvent(),this.requestUpdate()}_handleRemoveModel(e){this.currentModels[e]=null,this.selectedAiModelIds[e]=null,this.currentModels={...this.currentModels},this.selectedAiModelIds={...this.selectedAiModelIds},this._emitChangeEvent(),this.requestUpdate()}_handleRemoveReasoningModel(e){this.currentReasoningModels[e]=null,this.selectedReasoningModelIds[e]=null,this.currentReasoningModels={...this.currentReasoningModels},this.selectedReasoningModelIds={...this.selectedReasoningModelIds},this._emitChangeEvent(),this.requestUpdate()}_emitChangeEvent(){this.dispatchEvent(new CustomEvent("ai-models-changed",{detail:{selectedAiModelIds:this.selectedAiModelIds,selectedReasoningModelIds:this.selectedReasoningModelIds},bubbles:!0,composed:!0}))}static get styles(){return[super.styles,f`
        .ai-model-selectors {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .model-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ai-model-select-container {
          display: flex;
          align-items: center;
        }

        .ai-model-select-container.reasoning {
        }

        .modelType {
          margin-top: 24px;
          font-weight: bold;
          margin-bottom: 8px;
        }

        md-filled-select {
          flex-grow: 1;
          margin-top: 8px;
          margin-bottom: 8px;
        }

        md-icon-button {
          --md-sys-color-on-surface-variant: var(--md-sys-color-error);
        }
      `]}};de([t({type:Array})],le.prototype,"activeAiModels",void 0),de([t({type:Array})],le.prototype,"requestedAiModelSizes",void 0),de([t({type:Object})],le.prototype,"currentModels",void 0),de([t({type:Object})],le.prototype,"currentReasoningModels",void 0),de([b()],le.prototype,"selectedAiModelIds",void 0),de([b()],le.prototype,"selectedReasoningModelIds",void 0),de([b()],le.prototype,"filteredAiModels",void 0),de([b()],le.prototype,"filteredReasoningModels",void 0),le=de([v("ps-ai-model-selector")],le);var ce=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let he=class extends y{constructor(){super(...arguments),this.open=!1,this.activeAiModels=[],this.selectedAiModels={},this.selectedReasoningModels={},this.currentModels={},this.currentReasoningModels={},this.api=new x}async connectedCallback(){super.connectedCallback(),await this.fetchActiveAiModels()}async fetchActiveAiModels(){try{this.activeAiModels=await this.api.getActiveAiModels(this.groupId)}catch(e){console.error("Error fetching active AI models:",e)}}updated(e){if(super.updated(e),e.has("open")){!e.get("open")&&this.open&&this.initializeCurrentModels()}}initializeCurrentModels(){this.nodeToEditInfo&&this.nodeToEditInfo.AiModels&&this._getCurrentModels()}isReasoningModel(e){return e===re.TextReasoning||e===re.MultiModalReasoning}_getCurrentModels(){const e={},t={};this.nodeToEditInfo.AiModels?.forEach((i=>{const o=i.configuration;if(!o?.type||!o?.modelSize)return;const n=o.modelSize;this.isReasoningModel(o.type)?t[n]=i:e[n]=i})),this.currentModels=e,this.currentReasoningModels=t}disableScrim(e){e.stopPropagation(),e.preventDefault()}render(){return r`
      <md-dialog
        style="max-height: 90vh;"
        ?open="${this.open}"
        @closed="${this._handleClose}"
        @cancel="${this.disableScrim}"
      >
        <div slot="headline">
          ${this.nodeToEditInfo?this._renderNodeEditHeadline():""}
        </div>
        <div slot="content" class="dialog-content">
          ${this.nodeToEditInfo?this._renderEditForm():""}
        </div>
        <div slot="actions">
          <md-text-button @click="${this._handleClose}"
            >${this.t("cancel")}</md-text-button
          >
          <md-filled-button @click="${this._handleSave}"
            >${this.t("save")}</md-filled-button
          >
        </div>
      </md-dialog>
    `}_renderNodeEditHeadline(){return r`
      <div class="layout horizontal">
        <div>
          <img
            src="${this.nodeToEditInfo.Class.configuration.imageUrl}"
            alt="${this.nodeToEditInfo.Class.name}"
            class="nodeEditHeadlineImage"
          />
        </div>
        <div class="nodeEditHeadlineTitle">
          ${this.nodeToEditInfo.Class.name}
        </div>
      </div>
    `}_renderEditForm(){return r`
      <div id="surveyContainer">
        ${this.nodeToEditInfo.Class.configuration.questions.map(((e,t)=>r`
            <yp-structured-question-edit
              index="${t}"
              id="structuredQuestion_${e.uniqueId?t:`noId_${t}`}"
              .structuredAnswers="${this._getInitialAnswers()}"
              .question="${e}"
            >
            </yp-structured-question-edit>
          `))}
        ${this._renderAiModelSelector()}
      </div>
    `}_renderAiModelSelector(){return this.nodeToEditInfo.Class.configuration.requestedAiModelSizes?r`
      <ps-ai-model-selector
        .activeAiModels="${this.activeAiModels}"
        .requestedAiModelSizes="${this.nodeToEditInfo.Class.configuration.requestedAiModelSizes}"
        .currentModels="${this.currentModels}"
        .currentReasoningModels="${this.currentReasoningModels}"
        @ai-models-changed="${this._handleAiModelsChanged}"
      ></ps-ai-model-selector>
    `:""}_getInitialAnswers(){return Object.entries(this.nodeToEditInfo.configuration).map((([e,t])=>({uniqueId:e,value:t})))}_handleClose(){this.dispatchEvent(new CustomEvent("close")),this.nodeToEditInfo=void 0}_handleAiModelsChanged(e){this.selectedAiModels=e.detail.selectedAiModelIds,this.selectedReasoningModels=e.detail.selectedReasoningModelIds}_handleSave(){const e={};this.nodeToEditInfo.Class.configuration.questions.forEach(((t,i)=>{const o=this.shadowRoot?.querySelector(`#structuredQuestion_${t.uniqueId?i:`noId_${i}`}`);if(o&&t.uniqueId){const i=o.getAnswer();i&&(e[t.uniqueId]=i.value)}}));let t=[];this.nodeToEditInfo.Class.configuration.requestedAiModelSizes&&(t=[...Object.entries(this.selectedAiModels).map((([e,t])=>{const i=this.activeAiModels.find((e=>e.id===t));return{size:e,modelId:t?Number(t):null,type:i?.configuration?.type??null}})),...Object.entries(this.selectedReasoningModels).map((([e,t])=>{const i=this.activeAiModels.find((e=>e.id===t));return{size:e,modelId:t?Number(t):null,type:i?.configuration?.type??null}}))]),this.dispatchEvent(new CustomEvent("save",{detail:{updatedConfig:e,aiModelUpdates:t,connectorType:"input"===this.nodeToEditInfo.Class.configuration.type?"input":"output"}})),this._handleClose()}static get styles(){return[super.styles,f`
        .nodeEditHeadlineImage {
          max-width: 100px;
          margin-right: 16px;
        }

        .nodeEditHeadlineTitle {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 55px;
        }

        md-dialog {
          width: 90%;
          height: 90%;
        }

        #surveyContainer {
          margin-bottom: 48px;
        }
      `]}};ce([t({type:Boolean})],he.prototype,"open",void 0),ce([t({type:Object})],he.prototype,"nodeToEditInfo",void 0),ce([t({type:Number})],he.prototype,"groupId",void 0),ce([b()],he.prototype,"activeAiModels",void 0),ce([b()],he.prototype,"selectedAiModels",void 0),ce([b()],he.prototype,"selectedReasoningModels",void 0),ce([b()],he.prototype,"currentModels",void 0),ce([b()],he.prototype,"currentReasoningModels",void 0),he=ce([v("ps-edit-node-dialog")],he);var pe=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let me=class extends y{constructor(){super(...arguments),this.open=!1,this.activeAgentClasses=[],this.activeAiModels=[],this.selectedAgentClassId=null,this.selectedAiModelIds={},this.selectedReasoningModelIds={},this.agentName="",this.requestedAiModelSizes=[],this.api=new x}async connectedCallback(){super.connectedCallback(),await this.fetchActiveAgentClasses(),await this.fetchActiveAiModels()}async fetchActiveAgentClasses(){try{const e=await this.api.getActiveAgentClasses(this.groupId);this.activeAgentClasses=e.sort(((e,t)=>e.name.localeCompare(t.name)))}catch(e){console.error("Error fetching active agent classes:",e)}}async fetchActiveAiModels(){try{this.activeAiModels=await this.api.getActiveAiModels(this.groupId)}catch(e){console.error("Error fetching active AI models:",e)}}render(){return r`
      <md-dialog ?open="${this.open}" @closed="${this._handleClose}" @cancel="${this.disableScrim}">
        <div slot="headline">${this.t("addNewAgent")}</div>
        <div slot="content">
          <md-filled-text-field
            label="${this.t("agentName")}"
            @input="${this._handleNameInput}"
            value="${this.agentName}"
          ></md-filled-text-field>
          <md-filled-select
            label="${this.t("selectAgentClass")}"
            @change="${this._handleAgentClassSelection}"
          >
            ${this.activeAgentClasses?.map((e=>r`
                <md-select-option value="${e.id}">
                  <div slot="headline">${e.name}</div>
                </md-select-option>
              `))}
          </md-filled-select>
          <div class="aiModelInfo" ?hidden="${!this.requestedAiModelSizes.length}">
            ${this.t("aiModelAgentCreateInfo")}
          </div>
          <ps-ai-model-selector
            .activeAiModels="${this.activeAiModels}"
            .requestedAiModelSizes="${this.requestedAiModelSizes}"
            @ai-models-changed="${this._handleAiModelsChanged}"
          ></ps-ai-model-selector>
        </div>
        <div slot="actions">
          <md-text-button @click="${this._handleClose}">${this.t("cancel")}</md-text-button>
          <md-filled-button @click="${this._handleAddAgent}">${this.t("addAgent")}</md-filled-button>
        </div>
      </md-dialog>
    `}_handleNameInput(e){const t=e.target;this.agentName=t.value}_handleAgentClassSelection(e){const t=e.target;this.selectedAgentClassId=Number(t.value);const i=this.activeAgentClasses.find((e=>e.id===this.selectedAgentClassId));i&&i.configuration&&i.configuration.requestedAiModelSizes?this.requestedAiModelSizes=i.configuration.requestedAiModelSizes:this.requestedAiModelSizes=[]}_handleAiModelsChanged(e){this.selectedAiModelIds=e.detail.selectedAiModelIds,this.selectedReasoningModelIds=e.detail.selectedReasoningModelIds}_handleClose(){this.dispatchEvent(new CustomEvent("close"))}disableScrim(e){e.stopPropagation(),e.preventDefault()}async _handleAddAgent(){const e={...Object.entries(this.selectedAiModelIds).filter((([e,t])=>null!==t)).reduce(((e,[t,i])=>({...e,[t]:i})),{}),...Object.entries(this.selectedReasoningModelIds).filter((([e,t])=>null!==t)).reduce(((e,[t,i])=>({...e,[t]:i})),{})};if(this.agentName&&this.selectedAgentClassId&&0!==Object.keys(e).length)try{const t=await this.api.createAgent(this.agentName,this.selectedAgentClassId,e,this.parentAgentId,this.groupId);this.dispatchEvent(new CustomEvent("agent-added",{detail:{agent:t}})),this._handleClose()}catch(e){console.error("Error creating new agent:",e)}else console.error("Agent name, class, and at least one AI model must be selected")}static get styles(){return[super.styles,f`
        md-filled-text-field,
        md-filled-select {
          width: 100%;
          margin-bottom: 16px;
          margin-top: 16px;
        }

        .aiModelInfo {
          margin-top: 16px;
          margin-bottom: 8px;
          font-size: var(--md-sys-typescale-label-medium-size);
        }
      `]}};pe([t({type:Boolean})],me.prototype,"open",void 0),pe([t({type:Number})],me.prototype,"parentAgentId",void 0),pe([t({type:Number})],me.prototype,"groupId",void 0),pe([b()],me.prototype,"activeAgentClasses",void 0),pe([b()],me.prototype,"activeAiModels",void 0),pe([b()],me.prototype,"selectedAgentClassId",void 0),pe([b()],me.prototype,"selectedAiModelIds",void 0),pe([b()],me.prototype,"selectedReasoningModelIds",void 0),pe([b()],me.prototype,"agentName",void 0),pe([b()],me.prototype,"requestedAiModelSizes",void 0),me=pe([v("ps-add-agent-dialog")],me);var ge=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ue=class extends y{constructor(){super(...arguments),this.open=!1,this.selectedAgentId=null,this.selectedInputOutputType=null,this.activeConnectorClasses=[],this.selectedConnectorClassId=null,this.connectorName="",this.api=new x}async connectedCallback(){super.connectedCallback(),await this.fetchActiveConnectorClasses()}async fetchActiveConnectorClasses(){try{this.activeConnectorClasses=await this.api.getActiveConnectorClasses(this.groupId)}catch(e){console.error("Error fetching active connector classes:",e)}}disableScrim(e){e.stopPropagation(),e.preventDefault()}render(){return r`
      <md-dialog ?open="${this.open}" @closed="${this._handleClose}" @cancel="${this.disableScrim}">
        <div slot="headline">${"input"==this.selectedInputOutputType?"Add Input Connector":"Add Output Connector"}</div>
        <div slot="content">
          <md-filled-text-field
            label="Connector Name"
            @input="${this._handleNameInput}"
            value="${this.connectorName}"
          ></md-filled-text-field>
          <md-filled-select
            label="Select Connector Class"
            @change="${this._handleConnectorClassSelection}"
          >
            ${this.activeConnectorClasses?.map((e=>r`
                <md-select-option value="${e.id}">
                  <div slot="headline">${e.name}</div>
                </md-select-option>
              `))}
          </md-filled-select>
        </div>
        <div slot="actions">
          <md-text-button @click="${this._handleClose}">Cancel</md-text-button>
          <md-filled-button @click="${this._handleAddConnector}"
            >Add Connector</md-filled-button
          >
        </div>
      </md-dialog>
    `}_handleNameInput(e){const t=e.target;this.connectorName=t.value}_handleConnectorClassSelection(e){const t=e.target;this.selectedConnectorClassId=Number(t.value)}_handleClose(){this.dispatchEvent(new CustomEvent("close"))}async _handleAddConnector(){if(this.connectorName&&this.selectedAgentId&&this.selectedConnectorClassId)try{const e=await this.api.createConnector(this.groupId,this.selectedAgentId,this.selectedConnectorClassId,this.connectorName,this.selectedInputOutputType);this.dispatchEvent(new CustomEvent("connector-added",{detail:{connector:e}})),this._handleClose()}catch(e){console.error("Error creating new connector:",e)}else console.error("Connector name, agent, or connector class not selected")}static get styles(){return[super.styles,f`
    md-filled-text-field,
    md-filled-select {
      width: 100%;
      margin-bottom: 16px;
      margin-top: 16px;
    }
  `]}};ge([t({type:Boolean})],ue.prototype,"open",void 0),ge([t({type:Number})],ue.prototype,"selectedAgentId",void 0),ge([t({type:Number})],ue.prototype,"groupId",void 0),ge([t({type:String})],ue.prototype,"selectedInputOutputType",void 0),ge([b()],ue.prototype,"activeConnectorClasses",void 0),ge([b()],ue.prototype,"selectedConnectorClassId",void 0),ge([b()],ue.prototype,"connectorName",void 0),ue=ge([v("ps-add-connector-dialog")],ue);class fe extends S{constructor(e){super(e,!0),this.disableParentConstruction=!0,this.agentsInstanceRegistry=new Map,this.connectorsInstanceRegistry=new Map,this.activeConnectorsInstanceRegistry=new Map,this.currentAgentListeners=[],this.addToAgentsRegistry=e=>{this.agentsInstanceRegistry.set(e.id,e)},this.addToConnectorsRegistry=e=>{this.connectorsInstanceRegistry.set(e.id,e)},this.currentRunningAgentId=void 0,this.parseQueryString(),this.originalReferrer=document.referrer}setCurrentRunningAgentId(e){this.currentRunningAgentId=e,this.notifyCurrentAgentListeners()}addCurrentAgentListener(e){this.currentAgentListeners.push(e)}removeCurrentAgentListener(e){this.currentAgentListeners=this.currentAgentListeners.filter((t=>t!==e))}notifyCurrentAgentListeners(){this.currentAgentListeners.forEach((e=>e(this.currentRunningAgentId)))}getAgentInstance(e){return this.agentsInstanceRegistry.get(e)}getConnectorInstance(e){return this.connectorsInstanceRegistry.get(e)}}var ve=function(e,t,i,o){for(var n,r=arguments.length,s=r<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o,a=e.length-1;a>=0;a--)(n=e[a])&&(s=(r<3?n(s):r>3?n(t,i,s):n(t,i))||s);return r>3&&s&&Object.defineProperty(t,i,s),s};let ye=class extends F{constructor(){super(),this.currentAgentId=1,this.isFetchingAgent=!1,this.minimizeWorkflow=!1,this.activeTabIndex=0,this.showEditNodeDialog=!1,this.showAddAgentDialog=!1,this.showAddConnectorDialog=!1,this.selectedAgentIdForConnector=null,this.selectedInputOutputType=null,this.detailedCosts=[],this.activeAiModels=[],this.api=new x,window.psAppGlobals=new fe(this.api)}async getAgent(){this.isFetchingAgent=!0;try{if(!this.groupId)throw new Error("Current group ID is not set");const e=await this.api.getAgent(this.groupId);this.currentAgent=e,this.currentAgentId=e.id,this.updateConnectorRegistry(e)}catch(e){console.error("Error fetching agent:",e)}finally{this.isFetchingAgent=!1}}updateConnectorRegistry(e){const t=e=>{e?.forEach((e=>{window.psAppGlobals.activeConnectorsInstanceRegistry.set(e.id,e)}))};t(e.InputConnectors),t(e.OutputConnectors),e.SubAgents?.forEach((e=>{t(e.InputConnectors),t(e.OutputConnectors)}))}async connectedCallback(){super.connectedCallback(),this.getAgent(),this.addEventListener("edit-node",this.openEditNodeDialog),this.addEventListener("add-connector",this.openAddConnectorDialog),this.addEventListener("add-existing-connector",this.addExistingConnector),this.addEventListener("get-costs",this.fetchAgentCosts),this.addEventListener("add-agent",this.openAddAgentDialog),this.addEventListener("agent-deleted",this.getAgent)}async disconnectedCallback(){super.disconnectedCallback(),this.removeListener("edit-node",this.openEditNodeDialog),this.removeListener("add-connector",this.openAddConnectorDialog),this.removeListener("add-existing-connector",this.addExistingConnector),this.removeListener("get-costs",this.fetchAgentCosts),this.removeListener("add-agent",this.openAddAgentDialog),this.removeListener("agent-deleted",this.getAgent)}async addExistingConnector(e){const{connectorId:t,agentId:i,type:o}=e.detail;try{await this.api.addExistingConnector(this.groupId,i,t,o),this.getAgent()}catch(e){console.error("Error adding existing connector:",e)}}async fetchAgentCosts(){if(this.currentAgentId)try{this.totalCosts=await this.api.getAgentCosts(this.groupId,this.currentAgentId)}catch(e){console.error("Error fetching agent costs:",e)}}async fetchActiveAiModels(){try{this.activeAiModels=await this.api.getActiveAiModels(this.groupId)}catch(e){console.error("Error fetching active AI models:",e)}}async handleEditDialogSave(e){const{updatedConfig:t}=e.detail,i=e.detail.aiModelUpdates,o="input"===e.detail.connectorType;if(this.nodeToEditInfo)try{const e="Class"in this.nodeToEditInfo&&this.nodeToEditInfo.parent_agent_id?"agent":"connector",n=this.nodeToEditInfo.id;if(await this.api.updateNodeConfiguration(this.groupId,e,n,t),"agent"===e&&i&&i.length>0){const e=(await this.api.getAgentAiModels(this.groupId,n)).map((e=>({size:e.configuration.modelSize,type:e.configuration.type,id:e.id})));if(i.some((e=>void 0!==e.modelId))){const t=i.filter((e=>null!==e.modelId)).map((e=>({size:e.size,type:e.type,id:Number(e.modelId)}))),o=e.filter((e=>!t.some((t=>t.size===e.size&&t.type===e.type&&t.id===e.id)))),r=t.filter((t=>!e.some((e=>t.size===e.size&&t.type===e.type&&t.id===e.id))));for(const e of o)await this.api.removeAgentAiModel(this.groupId,n,e.id);for(const e of r)await this.api.addAgentAiModel(this.groupId,n,e.id,e.size)}}if("agent"===e){if(this.currentAgent={...this.currentAgent,configuration:{...this.currentAgent.configuration,...t}},i){const e=this.currentAgent.AiModels.filter((e=>!i.some((t=>t.size===e.configuration.modelSize))));for(const t of i)if(null!==t.modelId){const i=this.activeAiModels.find((e=>e.id===t.modelId));i&&e.push(i)}this.currentAgent={...this.currentAgent,AiModels:e}}}else if(o){const e=this.currentAgent.InputConnectors.map((e=>e.id===n?{...e,configuration:{...e.configuration,...t}}:e));this.currentAgent={...this.currentAgent,InputConnectors:e}}else{const e=this.currentAgent.OutputConnectors.map((e=>e.id===n?{...e,configuration:{...e.configuration,...t}}:e));this.currentAgent={...this.currentAgent,OutputConnectors:e}}this.requestUpdate(),this.showEditNodeDialog=!1,await this.getAgent()}catch(e){console.error("Failed to update node configuration:",e)}}openEditNodeDialog(e){this.nodeToEditInfo=e.detail.element,this.showEditNodeDialog=!0}openAddConnectorDialog(e){this.selectedAgentIdForConnector=e.detail.agentId,this.selectedInputOutputType=e.detail.type,this.showAddConnectorDialog=!0}openAddAgentDialog(e){this.showAddAgentDialog=!0}firstUpdated(){this.fetchAgentCosts()}randomizeTheme(){const e=Math.floor(16777215*Math.random()).toString(16);this.fire("yp-theme-color",`#${e}`)}renderTotalCosts(){return r`${this.t("Costs")}
    ${void 0!==this.totalCosts?`($${this.totalCosts.toFixed(2)})`:""}`}async getDetailedAgentCosts(){if(this.currentAgentId)try{this.detailedCosts=await this.api.getDetailedAgentCosts(this.groupId,this.currentAgentId),this.requestUpdate()}catch(e){console.error("Error fetching detailed agent costs:",e)}}renderDetailedCostsTab(){return r`
      <vaadin-grid .items="${this.detailedCosts}">
        <vaadin-grid-sort-column
          hidden
          path="createdAt"
          header="${this.t("Date")}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="agentName"
          header="${this.t("Agent")}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="aiModelName"
          header="${this.t("AI Model")}"
          auto-width
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="tokenInCount"
          header="${this.t("Tokens In")}"
          .renderer="${(e,t,i)=>{e.textContent=`${k.number(i.item.tokenInCount)}`}}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="tokenOutCount"
          header="${this.t("Tokens Out")}"
          .renderer="${(e,t,i)=>{e.textContent=`${k.number(i.item.tokenOutCount)}`}}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="longContextIn"
          header="${this.t("Long Context In")}"
          .renderer="${(e,t,i)=>{e.textContent=`${k.number(i.item.longContextTokenInCount||0)}`}}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="longContextIn"
          header="${this.t("Long Context Out")}"
          .renderer="${(e,t,i)=>{e.textContent=`${k.number(i.item.longContextTokenOutCount||0)}`}}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="cachedContextIn"
          header="${this.t("Cached Context In")}"
          .renderer="${(e,t,i)=>{e.textContent=`${k.number(i.item.tokenInCachedContextCount||0)}`}}"
        ></vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="costIn"
          header="${this.t("Cost In")}"
          .renderer="${(e,t,i)=>{e.textContent=`$${i.item.costIn.toFixed(4)}`}}"
        >
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="costOut"
          header="${this.t("Cost Out")}"
          .renderer="${(e,t,i)=>{e.textContent=`$${i.item.costOut.toFixed(4)}`}}"
        >
        </vaadin-grid-sort-column>
        <vaadin-grid-sort-column
          path="totalCost"
          header="${this.t("Total Cost")}"
          .renderer="${(e,t,i)=>{e.textContent=`$${i.item.totalCost.toFixed(4)}`}}"
        >
        </vaadin-grid-sort-column>

      </vaadin-grid>
    `}tabChanged(){this.activeTabIndex=this.$$("#tabBar").activeTabIndex,1===this.activeTabIndex&&this.getDetailedAgentCosts()}renderHeader(){return r`
      <div class="layout horizontal agentHeader">
        <img
          hidden
          src="${I.getImageFormatUrl(this.group.GroupLogoImages,0)}"
          class="agentHeaderImage"
          alt="${this.group.name}"
        />
        <div class="layout vertical agentHeaderText">
          <div class="workflowName">${this.t("workflow")}</div>
          <div class="">${this.group.name}</div>
        </div>
      </div>
    `}render(){return this.isFetchingAgent?r`<md-linear-progress indeterminate></md-linear-progress>`:r`
        <ps-edit-node-dialog
          ?open="${this.showEditNodeDialog}"
          .nodeToEditInfo="${this.nodeToEditInfo}"
          .groupId="${this.groupId}"
          @save="${this.handleEditDialogSave}"
          @close="${()=>this.showEditNodeDialog=!1}"
        ></ps-edit-node-dialog>

        <ps-add-agent-dialog
          ?open="${this.showAddAgentDialog}"
          @close="${()=>this.showAddAgentDialog=!1}"
          @agent-added="${this.getAgent}"
          .parentAgentId="${this.currentAgent?.id||-1}"
          .groupId="${this.groupId}"
        ></ps-add-agent-dialog>

        <ps-add-connector-dialog
          ?open="${this.showAddConnectorDialog}"
          .groupId="${this.groupId}"
          @connector-added="${this.getAgent}"
          .selectedAgentId="${this.selectedAgentIdForConnector}"
          .selectedInputOutputType="${this.selectedInputOutputType}"
          @close="${()=>this.showAddConnectorDialog=!1}"
        ></ps-add-connector-dialog>

        <div class="layout vertical" ?hidden="${this.minimizeWorkflow}">
          <div class="layout horizontal self-start tabsContainer">
            ${this.renderHeader()}

            <md-tabs id="tabBar" @change="${this.tabChanged}">
              <md-secondary-tab
                id="configure-tab"
                ?has-static-theme="${this.hasStaticTheme}"
                aria-controls="configure-panel"
              >
                <md-icon slot="icon">support_agent</md-icon>
                ${this.t("workflow")}
              </md-secondary-tab>
              <md-secondary-tab
                id="costs-tab"
                ?has-static-theme="${this.hasStaticTheme}"
                aria-controls="costs-panel"
              >
                <md-icon slot="icon">account_balance</md-icon>
                ${this.renderTotalCosts()}
              </md-secondary-tab>
              <md-secondary-tab
                id="crt-tab"
                ?has-static-theme="${this.hasStaticTheme}"
                aria-controls="crt-panel"
              >
                <md-icon slot="icon">checklist</md-icon>
                ${this.t("Audit Log")}
              </md-secondary-tab>
            </md-tabs>
            <div class="flex"></div>
            <md-filled-tonal-icon-button
              @click="${this._openAnalyticsAndPromotions}"
              title="${this.t("analyticsAndPromotions")}"
              ><md-icon>monitoring</md-icon>
            </md-filled-tonal-icon-button>
            <md-filled-tonal-icon-button
              class="configIconButton"
              @click="${this.openConfig}"
              title="${this.t("openGroupMenu")}"
              ><md-icon>settings</md-icon>
            </md-filled-tonal-icon-button>
          </div>
        </div>
        <md-divider></md-divider>
        ${0===this.activeTabIndex?r`
              <ps-operations-view
                .minimizeWorkflow="${this.minimizeWorkflow}"
                .currentAgent="${this.currentAgent}"
                .groupId="${this.groupId}"
                .group="${this.group}"
              ></ps-operations-view>
            `:""}
        ${2===this.activeTabIndex?r` <!-- Render Audit Log tab content here --> `:""}
        ${1===this.activeTabIndex?this.renderDetailedCostsTab():""}
        ${this.minimizeWorkflow?"":this.renderThemeToggle()}
      `}openConfig(){w.redirectTo(`/admin/group/${this.groupId}`)}_openAnalyticsAndPromotions(){w.redirectTo(`/analytics/group/${this.groupId}`)}static get styles(){return[super.styles,f`
        .agentHeaderImage {
          max-width: 72px;
          align-self: self-start;
          border-radius: 4px;
          margin-top: 8px;
        }

        .workflowName {
          font-size: 14px;
          font-weight: 400;
          color: var(--md-sys-color-tertiary);
          text-transform: uppercase;
        }

        md-filled-tonal-icon-button {
          margin-right: 24px;
        }

        .configIconButton {
          margin-right: 64px;
        }

        md-filled-tonal-icon-button {
          --md-filled-tonal-icon-button-container-color: var(
            --md-sys-color-surface-container-low
          );
          --md-sys-color-on-secondary-container: var(--md-sys-color-on-surface);
        }

        .agentHeaderText {
          align-self: self-start;
          font-size: 22px;
          font-weight: 700;
          margin-top: 16px;
          margin-left: 24px;
          margin-right: 24px;
          font-family: var(--md-ref-typeface-brand);
        }

        .agentHeader {
          width: 560px;
        }

        .tabsContainer {
          background-color: var(--md-sys-color-surface);
          width: 100vw;
          padding: 0;
          margin: 0;
          padding-top: 16px;
          padding-bottom: 16px;
          margin-top: 12px;
        }

        md-tabs {
          align-self: flex-start;
          align-items: flex-start;
          max-width: 600px;
          background-color: var(--md-sys-color-surface);
          --md-divider-thickness: 0px;
        }

        md-filled-select {
          width: 100%;
          margin-bottom: 16px;
        }

        .nodeEditHeadlineImage {
          max-width: 100px;
          margin-right: 16px;
        }

        .nodeEditHeadlineTitle {
          display: flex;
          align-items: center;
          justify-content: center; /* This will also center the content horizontally */
          height: 55px; /* Make sure this element has a defined height */
        }

        .childEditing {
          color: var(--md-sys-color-on-surface-variant);
          background-color: var(--md-sys-color-surface-variant);
          padding: 16px;
          border-radius: 8px;
        }

        .childrenList {
          height: 100px;
          overflow-y: auto;
        }

        md-icon-button {
          margin-top: 12px;
          margin-right: 16px;
        }

        md-secondary-tab[has-static-theme] {
          --md-secondary-tab-active-indicator-color: var(
            --md-sys-color-primary-container
          );
        }

        .createOptionsButtons {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding-left: 8px;
          padding-right: 8px;
        }

        .deleteButton {
          --md-sys-color-primary: var(--md-sys-color-error);
        }

        md-circular-progress {
          margin-bottom: 6px;
        }

        md-filled-text-field,
        md-outlined-text-field {
          width: 600px;
          margin-bottom: 16px;
        }

        [type="textarea"] {
          min-height: 150px;
        }

        [type="textarea"][supporting-text] {
          min-height: 76px;
        }

        .formContainer {
          margin-top: 32px;
        }

        md-filled-button,
        md-outlined-button {
          margin-top: 8px;
          margin-left: 8px;
          margin-right: 8px;
          margin-bottom: 8px;
        }

        .aiConfigReview {
          margin-left: 8px;
          margin-right: 8px;
          padding: 16px;
          margin-top: 8px;
          margin-bottom: 8px;
          border-radius: 12px;
          max-width: 560px;
          font-size: 14px;
          background-color: var(--md-sys-color-primary-container);
          color: var(--md-sys-color-on-primary-container);
        }

        .agentUDEDescription {
          font-size: 18px;
          margin: 32px;
          margin-bottom: 0;
          padding: 24px;
          border-radius: 12px;
          background-color: var(--md-sys-color-primary);
          color: var(--md-sys-color-on-primary);
        }

        md-tabs,
        agent-tab,
        configure-tab {
          width: 100vw;
        }

        .themeToggle {
          margin-top: 32px;
        }

        ltp-chat-assistant {
          height: 100%;
          max-height: 100%;
          width: 100%;
          height: 100%;
        }

        md-linear-progress {
          width: 600px;
        }

        .darkModeButton {
          margin-right: 8px;
          margin-left: 8px;
        }

        .topDiv {
          margin-bottom: 256px;
        }

        md-outlined-select {
          z-index: 1500px;
          margin: 16px;
          margin-left: 0;
          max-width: 250px;
        }

        .automaticCreateButton {
          max-width: 300px;
        }

        [hidden] {
          display: none !important;
        }

        vaadin-grid {
          background-color: var(--md-sys-color-surface);
          color: var(--md-sys-color-on-surface);
          font-family: var(--md-sys-typescale-body-medium-font-family-name);
          font-size: var(--md-sys-typescale-body-medium-font-size);
          font-weight: var(--md-sys-typescale-body-medium-font-weight);
          line-height: var(--md-sys-typescale-body-medium-line-height);
        }

        vaadin-grid::part(header-cell) {
          background-color: var(--md-sys-color-surface-container);
          color: var(--md-sys-color-on-surface-variant);
          font-weight: var(--md-sys-typescale-title-small-font-weight);
        }

        vaadin-grid::part(cell) {
          color: var(--md-sys-color-on-surface-container);
        }

        vaadin-grid::part(body-cell) {
          background-color: var(--md-sys-color-surface-container-lowest);
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
        }

        vaadin-grid::part(row) {
          background-color: var(--md-sys-color-surface-container-lowest);
          color: var(--md-sys-color-on-surface);
        }

        vaadin-grid::part(row):nth-child(even) {
          background-color: var(--md-sys-color-surface-variant);
        }

        vaadin-grid::part(row:hover) {
          background-color: var(--md-sys-color-surface-container-highest);
        }

        vaadin-grid::part(selected-row) {
          background-color: var(--md-sys-color-secondary-container);
          color: var(--md-sys-color-on-secondary-container);
        }

        /* Ensure proper spacing and alignment */
        vaadin-grid-cell-content {
          padding: 12px 16px;
        }

        /* Style for the sort indicators */
        vaadin-grid-sorter {
          color: var(--md-sys-color-on-surface-variant);
        }

        vaadin-grid-sorter[direction] {
          color: var(--md-sys-color-primary);
        }

        /* Adjust these values as needed for your specific layout */
        vaadin-grid {
          height: 400px;
          margin-top: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 600px) {
          .agentHeader {
            width: 100%;
          }
        }
      `]}};ve([t({type:Number})],ye.prototype,"currentAgentId",void 0),ve([t({type:Number})],ye.prototype,"totalCosts",void 0),ve([t({type:Object})],ye.prototype,"currentAgent",void 0),ve([t({type:Boolean})],ye.prototype,"isFetchingAgent",void 0),ve([t({type:Boolean})],ye.prototype,"minimizeWorkflow",void 0),ve([t({type:Object})],ye.prototype,"nodeToEditInfo",void 0),ve([t({type:Number})],ye.prototype,"activeTabIndex",void 0),ve([t({type:Boolean})],ye.prototype,"showEditNodeDialog",void 0),ve([t({type:Boolean})],ye.prototype,"showAddAgentDialog",void 0),ve([t({type:Boolean})],ye.prototype,"showAddConnectorDialog",void 0),ve([t({type:Number})],ye.prototype,"selectedAgentIdForConnector",void 0),ve([t({type:String})],ye.prototype,"selectedInputOutputType",void 0),ve([A("ps-operations-view")],ye.prototype,"agentElement",void 0),ve([t({type:Number})],ye.prototype,"groupId",void 0),ve([t({type:Object})],ye.prototype,"group",void 0),ve([b()],ye.prototype,"detailedCosts",void 0),ye=ve([v("ps-operations-manager")],ye);export{ye as PsOperationsManager};
