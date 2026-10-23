import{i as t,n as e,r as s,t as o,s as i,T as r,x as a,l as n}from"./BjU_bnxK.js";class d extends Error{constructor(t,e){super(t),this.status=e}}class l{constructor(t){this.groupId=t}get base(){return`/api/live-workflows/groups/${this.groupId}`}async request(t="",e="GET",s){const o=await fetch(`${this.base}${t}`,{method:e,credentials:"same-origin",headers:void 0===s?{}:{"content-type":"application/json"},body:void 0===s?void 0:JSON.stringify(s)}),i=await o.json().catch((()=>({error:`Request failed (${o.status})`})));if(!o.ok)throw new d(i.error??"Workflow request failed",o.status);return i}async upload(t,e){return new Promise(((s,o)=>{const i=new XMLHttpRequest;i.open("POST",`${this.base}/assets`),i.setRequestHeader("content-type","application/octet-stream"),i.setRequestHeader("x-file-name",encodeURIComponent(t.name)),i.upload.onprogress=t=>{t.lengthComputable&&e(t.loaded/t.total)},i.onerror=()=>o(new Error("Upload connection failed")),i.onabort=()=>o(new Error("Upload cancelled")),i.onload=()=>{try{const t=JSON.parse(i.responseText);i.status>=400?o(new Error(t.error??"Upload failed")):s(t)}catch(t){o(t)}},i.send(t)}))}}function c(t){return new Intl.NumberFormat(void 0,{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:4}).format(t/1e6)}var p=function(t,e,s,o){for(var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,n=t.length-1;n>=0;n--)(i=t[n])&&(a=(r<3?i(a):r>3?i(e,s,a):i(e,s))||a);return r>3&&a&&Object.defineProperty(e,s,a),a};const h=["none","minimal","low","medium","high","xhigh","max"];function g(t){return`${t.model} · ${t.reasoningEffort} reasoning · ${"fast"===t.serviceTier?"Fast":"Standard"}`}function u(t,e){return t?.model===e?.model&&t?.reasoningEffort===e?.reasoningEffort&&t?.serviceTier===e?.serviceTier}let f=class extends i{constructor(){super(...arguments),this.canEdit=!1,this.connected=!1,this.models=[],this.saving=!1,this.loading=!1,this.error="",this.saved=!1,this.settingsOpen=!1}willUpdate(t){t.has("groupId")&&(this.dialog?.close(),this.settingsOpen=!1,this.draft=void 0,this.expected=void 0,this.models=[],this.error="",this.saved=!1,this.saving=!1,this.loading=!1),t.has("canEdit")&&!this.canEdit&&this.reset()}updated(){this.notifyPending()}get dialog(){return this.renderRoot.querySelector("dialog")}openSettings(){this.saved=!1,this.error="",this.dialog?.showModal(),this.settingsOpen=!0}closeSettings(){this.saving||(this.reset(),this.dialog?.close())}closed(){this.settingsOpen=!1,this.saved||this.reset(),this.renderRoot.querySelector(".settings-trigger")?.focus()}get dirty(){return Boolean(this.draft&&!u(this.draft,this.settings))}get stale(){return this.dirty&&!u(this.expected,this.settings)}get value(){return this.draft??this.settings}get efforts(){const t=this.models.find((t=>(t.model??t.id)===this.value.model));return t?.supportedReasoningEfforts?.length?t.supportedReasoningEfforts.map((t=>t.reasoningEffort)).filter((t=>h.includes(t))):h}notifyPending(){this.dispatchEvent(new CustomEvent("assistant-settings-pending",{detail:this.dirty||this.saving,bubbles:!0,composed:!0}))}edit(t){this.draft||(this.expected={...this.settings}),this.draft={...this.value,...t},this.error="",this.saved=!1,this.dirty||(this.draft=void 0,this.expected=void 0),this.notifyPending()}reset(){this.draft=void 0,this.expected=void 0,this.error="",this.saved=!1,this.notifyPending()}updatedWorkflow(t){this.dispatchEvent(new CustomEvent("workflow-updated",{detail:t,bubbles:!0,composed:!0}))}async discover(){const t=this.groupId;this.loading=!0,this.error="";try{const e=await new l(t).request("/codex-models");if(this.groupId!==t)return;this.models=e.data.models,this.updatedWorkflow()}catch(e){this.groupId===t&&(this.error=e instanceof Error?e.message:"Unable to load assistant models")}finally{this.groupId===t&&(this.loading=!1)}}async save(t){if(t.preventDefault(),!this.canEdit||!this.dirty||this.stale||this.saving)return;const e=this.groupId;this.saving=!0,this.error="",this.notifyPending();try{const t=await new l(e).request("/assistant-settings","PUT",{settings:this.value,expected:this.expected});if(this.groupId!==e)return;this.settings=t,this.draft=void 0,this.expected=void 0,this.saved=!0,this.updatedWorkflow(t),this.dialog?.close()}catch(t){if(this.groupId!==e)return;this.error=t instanceof Error?t.message:"Unable to save assistant settings",t instanceof d&&409===t.status&&this.updatedWorkflow()}finally{this.groupId===e&&(this.saving=!1,this.notifyPending())}}render(){if(!this.settings)return r;const t=this.value,e=!this.canEdit||this.saving,s=!this.efforts.includes(t.reasoningEffort),o=this.session?.active&&this.session.turnSettings&&!u(this.settings,this.session.turnSettings);return a`<button
        class="settings-trigger"
        type="button"
        aria-label="Assistant settings"
        aria-haspopup="dialog"
        aria-controls="assistant-settings-dialog"
        aria-expanded=${this.settingsOpen}
        title=${o?`Next turn: ${g(this.settings)}. Running: ${g(this.session.turnSettings)}`:g(this.settings)}
        @click=${this.openSettings}
      >
        <span class="selection"
          >${this.settings.model} ·
          ${this.settings.reasoningEffort}${"fast"===this.settings.serviceTier?" · Fast":""}</span
        >
        ${o?a`<span class="badge">Next turn</span>`:r}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
        >
          <path d="M4 7h16M4 17h16" />
          <circle
            cx="9"
            cy="7"
            r="3"
            fill="var(--md-sys-color-surface, #fff)"
          />
          <circle
            cx="15"
            cy="17"
            r="3"
            fill="var(--md-sys-color-surface, #fff)"
          />
        </svg>
        <span>Settings</span>
      </button>
      ${this.saved?a`<span class="sr-only" role="status"
            >Saved for the next turn. Your conversation continues in the same
            session.</span
          >`:r}
      <dialog
        id="assistant-settings-dialog"
        aria-labelledby="assistant-settings-heading"
        @close=${this.closed}
        @cancel=${t=>{t.preventDefault(),this.closeSettings()}}
      >
        <header>
          <h3 id="assistant-settings-heading">Assistant settings</h3>
          <button
            type="button"
            class="close"
            aria-label="Close assistant settings"
            ?disabled=${this.saving}
            @click=${this.closeSettings}
          >
            ×
          </button>
        </header>
        <form @submit=${this.save}>
          <label
            >Assistant model<input
              name="model"
              list="assistant-models"
              required
              maxlength="160"
              .value=${n(t.model)}
              ?disabled=${e}
              @input=${t=>this.edit({model:t.target.value})}
            /><datalist id="assistant-models">
              ${this.models.map((t=>a`<option value=${t.model??t.id}>
                    ${t.displayName??t.id}
                  </option>`))}
            </datalist></label
          >
          <div class="options">
            <label
              >Reasoning effort<select
                name="effort"
                .value=${n(t.reasoningEffort)}
                ?disabled=${e}
                @change=${t=>this.edit({reasoningEffort:t.target.value})}
              >
                ${s?a`<option value=${t.reasoningEffort} disabled>
                      ${t.reasoningEffort} (not offered)
                    </option>`:r}
                ${this.efforts.map((t=>a`<option value=${t}>${t}</option>`))}
              </select></label
            >
            <label
              >Response speed<select
                name="speed"
                .value=${n(t.serviceTier)}
                ?disabled=${e}
                @change=${t=>this.edit({serviceTier:t.target.value})}
              >
                <option value="regular">Standard</option>
                <option value="fast">Fast</option>
              </select></label
            >
          </div>
          ${this.canEdit?a`<div class="actions">
                <button
                  class="primary"
                  ?disabled=${this.saving||!this.dirty||this.stale||s||!t.model.trim()}
                >
                  ${this.saving?"Saving…":"Apply to next turn"}
                </button>
                ${this.dirty?a`<button
                      type="button"
                      ?disabled=${this.saving}
                      @click=${this.stale?this.reset:this.closeSettings}
                    >
                      ${this.stale?"Reload settings":"Cancel"}
                    </button>`:r}
                <button
                  type="button"
                  ?disabled=${this.loading||this.saving||!this.connected}
                  @click=${this.discover}
                >
                  ${this.loading?"Loading models…":"Load models"}
                </button>
              </div>`:r}
        </form>
        <p class="hint">
          Higher reasoning uses more time and tokens. Fast requests priority
          service where available and can cost more.
        </p>
        ${this.session?.active?a`<p class="running" role="status">
              Running${this.session.turnSettings?`: ${g(this.session.turnSettings)}`:" with its original settings"}.
              Changes apply to your next turn. Steering keeps the current
              settings.
            </p>`:r}
        ${this.dirty&&!this.stale?a`<p class="hint">
              Apply or cancel these changes before sending a message.
            </p>`:r}
        ${this.stale?a`<p class="error" role="alert">
              Assistant settings changed elsewhere. Reload settings before
              editing again.
            </p>`:r}
        ${s?a`<p class="error" role="alert">
              Choose a reasoning effort offered by this model.
            </p>`:r}
        ${this.error?a`<p class="error" role="alert">${this.error}</p>`:r}
        ${this.canEdit?r:a`<p class="hint">
              The current operator can change assistant settings.
            </p>`}
      </dialog>`}};f.styles=t`
    :host {
      display: block;
      margin: 8px 0;
    }
    .settings-trigger {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 7px 8px;
      border-color: transparent;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .settings-trigger:hover {
      background: color-mix(
        in srgb,
        var(--md-sys-color-primary, #7663a8) 7%,
        transparent
      );
    }
    .selection {
      flex: 1;
      min-width: 0;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .settings-trigger svg {
      flex-shrink: 0;
      width: 15px;
      height: 15px;
    }
    dialog {
      box-sizing: border-box;
      width: min(420px, calc(100vw - 32px));
      max-height: calc(100dvh - 32px);
      margin: auto;
      overflow: auto;
      color: inherit;
      border: 1px solid var(--md-sys-color-outline-variant, #e2ddeb);
      border-radius: 18px;
      padding: 20px;
      background: var(--md-sys-color-surface, #fff);
      box-shadow: 0 18px 60px #30234530;
    }
    dialog::backdrop {
      background: #241b3940;
      backdrop-filter: blur(3px);
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      overflow: hidden;
      clip-path: inset(50%);
      white-space: nowrap;
    }
    header,
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    header {
      justify-content: space-between;
      margin-bottom: 12px;
    }
    header h3 {
      margin: 0;
      font-size: 16px;
    }
    .close {
      padding: 3px 8px;
      border-color: transparent;
      font-size: 22px;
    }
    .badge {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      padding: 4px 7px;
      border-radius: 6px;
      background: #7663a815;
    }
    form {
      display: grid;
      gap: 10px;
    }
    .options {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 10px;
    }
    label {
      display: grid;
      gap: 5px;
      font-size: 12px;
      min-width: 0;
    }
    input,
    select,
    button {
      font: inherit;
      color: inherit;
      border: 1px solid var(--md-sys-color-outline-variant, #d4cede);
      border-radius: 8px;
      padding: 8px 10px;
      min-width: 0;
    }
    input,
    select {
      width: 100%;
      box-sizing: border-box;
      background: var(--md-sys-color-surface, #fff);
      font-size: 13px;
    }
    button {
      cursor: pointer;
      background: transparent;
      font-size: 12px;
    }
    button.primary {
      background: var(--md-sys-color-primary, #7663a8);
      color: var(--md-sys-color-on-primary, #fff);
      border-color: transparent;
    }
    button:disabled,
    input:disabled,
    select:disabled {
      opacity: 0.6;
      cursor: default;
    }
    :focus-visible {
      outline: 2px solid var(--md-sys-color-primary, #7663a8);
      outline-offset: 2px;
    }
    p {
      margin: 8px 0 0;
      font-size: 12px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }
    .hint {
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .running {
      border-left: 3px solid #8b77ba;
      padding-left: 9px;
    }
    .error {
      color: var(--md-sys-color-error, #a22);
    }
  `,p([e({type:Number})],f.prototype,"groupId",void 0),p([e({attribute:!1})],f.prototype,"settings",void 0),p([e({attribute:!1})],f.prototype,"session",void 0),p([e({type:Boolean})],f.prototype,"canEdit",void 0),p([e({type:Boolean})],f.prototype,"connected",void 0),p([s()],f.prototype,"draft",void 0),p([s()],f.prototype,"models",void 0),p([s()],f.prototype,"saving",void 0),p([s()],f.prototype,"loading",void 0),p([s()],f.prototype,"error",void 0),p([s()],f.prototype,"saved",void 0),p([s()],f.prototype,"settingsOpen",void 0),f=p([o("yp-live-workflow-assistant-settings")],f);var m=function(t,e,s,o){for(var i,r=arguments.length,a=r<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,s):o,n=t.length-1;n>=0;n--)(i=t[n])&&(a=(r<3?i(a):r>3?i(e,s,a):i(e,s))||a);return r>3&&a&&Object.defineProperty(e,s,a),a};let v=class extends i{constructor(){super(...arguments),this.error="",this.busy=!1,this.conflict=!1,this.defaultCodexModel="",this.defaultCodexReasoningEffort="max",this.codexModels=[],this.packages=[],this.hosts=[]}updated(t){t.has("groupId")&&this.groupId&&this.load()}async load(){try{const t=await fetch("/api/live-workflows/catalog",{credentials:"same-origin"});if(t.ok){const e=await t.json();this.packages=e.packages,this.defaultCodexModel=e.modelDefaults.codexModel,this.defaultCodexReasoningEffort=e.modelDefaults.codexReasoningEffort}this.snapshot=await new l(this.groupId).request(),this.hosts=this.snapshot.hosts}catch(t){try{const e=await fetch("/api/live-workflows/catalog",{credentials:"same-origin"});if(!e.ok)throw t;const s=await e.json();this.hosts=s.hosts,this.packages=s.packages,this.defaultCodexModel=s.modelDefaults.codexModel,this.defaultCodexReasoningEffort=s.modelDefaults.codexReasoningEffort}catch{this.error="Live Workflows is not enabled, or this group is not accessible."}}}async save(t){t.preventDefault(),this.busy=!0,this.error="",this.conflict=!1;try{const e=new FormData(t.target),s=this.snapshot?.workspace.config,o={packageId:String(e.get("package")),hostId:String(e.get("host")),codexModel:String(e.get("model")),codexReasoningEffort:String(e.get("reasoningEffort")),codexServiceTier:String(e.get("serviceTier")),operatorIds:String(e.get("operators")??"").split(",").filter((t=>t.trim())).map(Number),budgetMicros:Math.round(1e6*Number(e.get("budget"))),trialBudgetMicros:Math.round(1e6*Number(e.get("trial"))),quotaBytes:Math.round(Number(e.get("quota"))*1024**3),concurrency:Number(e.get("concurrency"))};await new l(this.groupId).request(s?"/configuration":"",s?"PUT":"POST",{...o,...s?{expectedAssistantSettings:{model:s.codexModel,reasoningEffort:s.codexReasoningEffort,serviceTier:s.codexServiceTier??"regular"}}:{}}),await this.load(),this.dispatchEvent(new CustomEvent("workflow-updated",{bubbles:!0,composed:!0}))}catch(t){this.conflict=t instanceof d&&409===t.status,this.error=t instanceof Error?t.message:"Unable to save workflow settings"}finally{this.busy=!1}}async discover(){this.busy=!0;try{const t=await new l(this.groupId).request("/codex-models");this.codexModels=t.data.models}catch(t){this.error=t instanceof Error?t.message:"Unable to list models"}finally{this.busy=!1}}render(){const t=this.snapshot?.workspace.config;return a` <p>
        Each workflow package runs in a private group workspace on a registered
        VM host. Operators connect their own ChatGPT accounts. Processing agents
        use separately budgeted provider models.
      </p>
      ${this.error?a`<p class="error" role="alert">${this.error}</p>`:""}
      ${this.conflict?a`<button
            type="button"
            @click=${async()=>{this.error="",this.conflict=!1,await this.load()}}
          >
            Reload saved settings
          </button>`:""}
      <form @submit=${this.save}>
        <label
          >Package<select name="package">
            ${this.packages.filter((e=>!t||e.id===t.packageId)).map((t=>a`<option value=${t.id}>${t.name} ${t.version}</option>`))}
          </select></label
        >
        <label
          >VM host<select name="host" required>
            ${this.hosts.filter((e=>!t||e.id===t.hostId)).map((e=>a`<option
                    value=${e.id}
                    ?selected=${e.id===t?.hostId}
                  >
                    ${e.name}
                  </option>`))}
          </select></label
        >
        <label
          >Codex model<input
            name="model"
            list="codex-models"
            required
            .value=${t?.codexModel??this.defaultCodexModel}
            placeholder="Select a model available to your ChatGPT account"
          /><datalist id="codex-models">
            ${this.codexModels.map((t=>a`<option value=${t.model??t.id}>
                  ${t.displayName??t.id}
                </option>`))}
          </datalist></label
        >
        <label
          >Codex reasoning effort<select name="reasoningEffort">
            ${h.map((e=>a`<option
                  value=${e}
                  ?selected=${e===(t?.codexReasoningEffort??this.defaultCodexReasoningEffort)}
                >
                  ${e}
                </option>`))}
          </select></label
        >
        <label
          >Codex response speed<select name="serviceTier">
            <option
              value="regular"
              ?selected=${"fast"!==t?.codexServiceTier}
            >
              Standard
            </option>
            <option
              value="fast"
              ?selected=${"fast"===t?.codexServiceTier}
            >
              Fast
            </option>
          </select></label
        >
        <small
          >Higher effort allows more thinking and can increase response time and
          token usage. Choose a level supported by the selected model. Agent
          effort is configured separately in the graph.</small
        >
        ${t?a`<button
                type="button"
                ?disabled=${this.busy}
                @click=${this.discover}
              >
                Load models from connected Codex</button
              ><small
                >Connect ChatGPT and take operator control in the workflow
                first.</small
              >`:""}
        <div class="row">
          <label
            >Workflow spending cap (USD)<input
              name="budget"
              type="number"
              min="0"
              step="0.01"
              required
              .value=${String((t?.budgetMicros??0)/1e6)} /></label
          ><label
            >Cumulative trial allowance (USD)<input
              name="trial"
              type="number"
              min="0"
              step="0.01"
              required
              .value=${String((t?.trialBudgetMicros??5e6)/1e6)}
          /></label>
        </div>
        <label
          >Additional operator user IDs (comma separated)<input
            name="operators"
            .value=${t?.operatorIds.join(", ")??""}
        /></label>
        <div class="row">
          <label
            >Storage quota (GiB)<input
              name="quota"
              type="number"
              min="1"
              step="1"
              required
              .value=${String((t?.quotaBytes??10*1024**3)/1024**3)} /></label
          ><label
            >Processing concurrency<input
              name="concurrency"
              type="number"
              min="1"
              max="16"
              required
              .value=${String(t?.concurrency??2)}
          /></label>
        </div>
        <button type="submit" ?disabled=${this.busy||!this.hosts.length}>
          ${this.busy?"Saving…":t?"Save workflow settings":"Create live workspace"}
        </button>
      </form>`}};v.styles=t`
    :host {
      display: block;
    }
    form {
      display: grid;
      gap: 14px;
      max-width: 680px;
    }
    label {
      display: grid;
      gap: 6px;
    }
    input,
    select,
    button {
      font: inherit;
      padding: 10px;
      border: 1px solid #aaa;
      border-radius: 8px;
      background: transparent;
      color: inherit;
    }
    button {
      cursor: pointer;
    }
    p {
      line-height: 1.5;
    }
    .error {
      color: var(--md-sys-color-error, #a22);
    }
    .row {
      display: flex;
      gap: 12px;
    }
    .row > * {
      flex: 1;
    }
  `,m([e({type:Number})],v.prototype,"groupId",void 0),m([s()],v.prototype,"snapshot",void 0),m([s()],v.prototype,"error",void 0),m([s()],v.prototype,"busy",void 0),m([s()],v.prototype,"conflict",void 0),m([s()],v.prototype,"defaultCodexModel",void 0),m([s()],v.prototype,"defaultCodexReasoningEffort",void 0),m([s()],v.prototype,"codexModels",void 0),m([s()],v.prototype,"packages",void 0),m([s()],v.prototype,"hosts",void 0),v=m([o("yp-live-workflow-admin")],v);var b=Object.freeze({__proto__:null,get YpLiveWorkflowAdmin(){return v}});export{l as L,d as a,g as b,c as d,b as y};
