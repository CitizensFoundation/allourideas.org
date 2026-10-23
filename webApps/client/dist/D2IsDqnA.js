import{i as e,n as t,r as s,t as i,s as r,x as a,T as o,g as n,f as l,h as d,j as c}from"./BjU_bnxK.js";import{d as p,L as u,a as h,b as m}from"./DWXlTq1M.js";import{s as g,G as f,P as b,R as y,L as v}from"./CPmTabcj.js";function $(e,t){return e.reasoningEffort?`${e.reasoningEffort} (agent override)`:t?t.reasoningEffort?`${t.reasoningEffort} (model default)`:t.reasoning?"Provider default":"No reasoning setting":"Default not recorded"}function w(e,t=[]){return[...new Set(["default",...t,...Object.keys(e.models)])]}function x(e){return"default"===e?"Processing":e.charAt(0).toUpperCase()+e.slice(1)}var k=Object.freeze({__proto__:null,standard:g}),S=function(e,t,s,i){for(var r,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i,n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a<3?r(o):a>3?r(t,s,o):r(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o};let A=class extends r{constructor(){super(...arguments),this.readonly=!1,this.zoom=.85,this.contentWidth=1200,this.contentHeight=700}render(){return a`<div class="tools">
        <strong>Agent network</strong>
        <button aria-label="Zoom out" @click=${()=>this.scale(-.1)}>−</button
        ><button aria-label="Zoom in" @click=${()=>this.scale(.1)}>+</button
        ><span class="zoom-value">${Math.round(100*this.zoom)}%</span
        ><button @click=${this.fit}>Fit</button
        ><span class="legend"
          >${this.run?`Run revision ${this.run.revision}`:"Draft graph"} ·
          select an agent to ${this.run?"inspect":"configure"}</span
        >
      </div>
      ${this.renderActivity()}
      <div
        class="canvas"
        role="group"
        aria-label="Live workflow agents and data connections"
        @click=${this.select}
        @keydown=${this.select}
      >
        <div class="paper"></div>
      </div>
      <div class="network-legend" aria-label="Graph status legend">
        <span><i style="background:#7762ad"></i>Running</span>
        <span><i style="background:#458775"></i>Completed</span>
        <span><i style="background:#bd883c"></i>Paused</span>
        <span><i style="background:#b7b0c5"></i>Waiting</span>
      </div>`}statusLabel(e){const t=e.replace(/_/g," ");return t.charAt(0).toUpperCase()+t.slice(1)}nodeStatus(e){if(!e.enabled)return"disabled";if(!this.run||"agent"!==e.kind)return e.kind;if(!this.run.nodeIds.includes(e.id))return"outside this run";const t=this.run.nodeStates[e.id];return"completed"===t?.status?"completed":["paused","failed","cancelled"].includes(this.run.status)?this.run.status:"completed"===this.run.status?"not completed":t?.status??"waiting"}chooseNode(e,t=!1){this.dispatchEvent(new CustomEvent("select-node",{detail:{id:e,configure:t},bubbles:!0,composed:!0}))}timestamp(e){if(!e)return o;const t=new Date(e);return a`<time datetime=${e} title=${t.toLocaleString()}
      >Updated ${t.toLocaleTimeString()}</time
    >`}renderActivity(){const e=this.run;if(!e)return a`<p class="hint">
        Agent status messages appear here when you start a run or select a saved
        run.
      </p>`;const t=this.graph.nodes.find((e=>"agent"===e.kind&&e.id===this.selectedNode)),s=this.graph.nodes.filter((t=>e.nodeIds.includes(t.id))),i=s.filter((t=>"running"===e.nodeStates[t.id]?.status)),r=[...s].filter((t=>e.nodeStates[t.id])).sort(((t,s)=>(e.nodeStates[s.id].updatedAt??"").localeCompare(e.nodeStates[t.id].updatedAt??""))).slice(0,1),n=t?[t]:i.length?i:r,l=(e.agentMessages??[]).filter((e=>!t||e.nodeId===t.id)).slice().reverse();return a`<section class="activity" aria-label="Agent activity">
      <header>
        <h3>Agent activity</h3>
        <span class="status" data-status=${e.status}
          >${this.statusLabel(e.status)}</span
        >
        ${t?a`<button @click=${()=>this.chooseNode()}>
              Show all agents
            </button>`:o}
      </header>
      <p class="hint">
        ${"running"===e.status?"Updates live as agents report progress. Long model calls may take several minutes between messages.":"paused"===e.status?"Processing is paused. Last reported messages are shown below.":"completed"===e.status?"Run completed. Saved agent messages are shown below.":"cancelled"===e.status||"failed"===e.status?"Processing has stopped. Last reported messages are shown below.":"Waiting for processing to start."}
      </p>
      <div class="latest" role="status" aria-live="polite">
        ${n.map((t=>{const s=e.nodeStates[t.id],i=s?.message??(s?"No detailed message reported by this agent.":"No messages reported for this agent yet.");return a`<div class="latest-item">
            <div class="latest-heading">
              <button
                class="agent-name"
                @click=${()=>this.chooseNode(t.id)}
              >
                ${t.label}
              </button>
              <span class="status" data-status=${this.nodeStatus(t)}
                >${this.statusLabel(this.nodeStatus(t))}</span
              >
              ${s?a`<span class="counts"
                    >${s.processed}/${s.total} records
                    processed${s.failedRecords?` · ${s.failedRecords} need review`:""}</span
                  >`:o}
            </div>
            <p>${i}</p>
            ${this.timestamp(s?.updatedAt)}
          </div>`}))}
        ${n.length?o:a`<p>No agent messages yet.</p>`}
      </div>
      <details>
        <summary>
          Recent messages${t?` · ${t.label}`:" · all agents"}
          (${l.length})
        </summary>
        <p class="hint">
          The latest 50 messages for this run are kept. Select an agent to
          filter them.
        </p>
        <ol>
          ${l.map((e=>a`<li>
                <button
                  class="agent-name"
                  @click=${()=>this.chooseNode(e.nodeId)}
                >
                  ${this.graph.nodes.find((t=>t.id===e.nodeId))?.label??e.nodeId}
                </button>
                · ${this.timestamp(e.at)}
                <p>${e.message}</p>
              </li>`))}
        </ol>
      </details>
    </section>`}select(e){if(e instanceof KeyboardEvent&&!["Enter"," "].includes(e.key))return;const t=e.composedPath().find((e=>e instanceof Element&&e.hasAttribute("model-id"))),s=t?.getAttribute("model-id"),i=s?this.diagram?.getCell(s):void 0;i?.isElement()&&(e.preventDefault(),this.chooseNode(i.get("agentId")??String(i.id),!0))}firstUpdated(){if(this.paper)return;let e=this.renderRoot.querySelector(".paper");e||(e=document.createElement("div"),e.className="paper",this.renderRoot.querySelector(".canvas").appendChild(e)),this.diagram=new f({},{cellNamespace:k}),this.paper=new b({el:e,model:this.diagram,width:1200,height:700,gridSize:10,drawGrid:!0,cellViewNamespace:k,interactive:!1,background:{color:"transparent"}}),this.observer=new ResizeObserver((()=>this.applyScale())),this.observer.observe(this),this.draw()}updated(e){this.hasUpdated&&!this.paper&&this.firstUpdated(),(e.has("graph")||e.has("run")||e.has("selectedNode"))&&this.draw()}connectedCallback(){super.connectedCallback(),this.hasUpdated&&this.updateComplete.then((()=>{this.isConnected&&!this.paper&&this.firstUpdated()}))}disconnectedCallback(){super.disconnectedCallback(),this.observer?.disconnect(),this.paper?.remove(),this.paper=void 0}scale(e){this.zoom=Math.max(.3,Math.min(1.5,this.zoom+e)),this.applyScale()}fit(){const e=this.renderRoot.querySelector(".canvas");e&&(this.zoom=Math.max(.3,Math.min(1,(e.clientWidth-16)/this.contentWidth,(e.clientHeight-16)/this.contentHeight)),this.applyScale(),e.scrollTo(0,0))}applyScale(){this.paper?.scale(this.zoom),this.paper?.setDimensions(this.contentWidth*this.zoom,this.contentHeight*this.zoom)}draw(){if(!this.diagram||!this.graph)return;const e=this.shadowRoot?.activeElement?.closest("[model-id]")?.getAttribute("model-id"),t=[];for(const e of this.graph.nodes){const s=this.run?.nodeStates[e.id],i="running"===this.nodeStatus(e),r="completed"===s?.status,a=this.run?.nodeCosts?.[e.id],o="agent"===e.kind,n=this.nodeStatus(e),l=this.selectedNode===e.id,d=s?.failedRecords||"paused"===n||"failed"===n?"#ad792d":i?"#7762ad":r?"#458775":"#9890a9",c=s?.failedRecords||"paused"===n||"failed"===n?"#fff4df":i?"#f1ecfb":r?"#edf6f2":"#f5f3f8",u=o?220:190,h=s?.total?Math.max(0,Math.min(1,s.processed/s.total)):r?1:0,m=new y({id:e.id,position:e.position,size:{width:u,height:o?168:82},markup:[{tagName:"rect",selector:"body"},{tagName:"rect",selector:"iconBackground"},{tagName:"path",selector:"icon"},{tagName:"text",selector:"label"},{tagName:"circle",selector:"statusDot"},{tagName:"text",selector:"statusText"},{tagName:"text",selector:"counts"},{tagName:"rect",selector:"progressTrack"},{tagName:"rect",selector:"progressBar"},{tagName:"text",selector:"message"},{tagName:"text",selector:"model"},{tagName:"text",selector:"footer"}],attrs:{root:{tabindex:0,role:"button","aria-label":e.label,"aria-description":`${this.statusLabel(this.nodeStatus(e))}${s?.message?`: ${s.message}`:""}`,"aria-pressed":l?"true":"false","aria-haspopup":o?"dialog":void 0,cursor:"pointer",opacity:e.enabled?1:.6},body:{class:"node-body",fill:"var(--md-sys-color-surface, #fff)",stroke:l?"#7762ad":i?"#b8a9d9":"#dcd6e6",strokeWidth:l?2.5:1.2,rx:14,ry:14},iconBackground:{x:14,y:14,width:28,height:28,rx:9,fill:c},icon:{d:o?"M22 25l-4 3 4 3m12-6 4 3-4 3m-5-10-2 14":"M25 25l-2 2a3 3 0 004 4l2-2m-2-4 2-2a3 3 0 014 4l-2 2m-6 0 6-6",fill:"none",stroke:d,strokeWidth:1.6,strokeLinecap:"round",strokeLinejoin:"round"},label:{text:e.label,x:51,y:15,textAnchor:"start",textVerticalAnchor:"top",fill:"var(--md-sys-color-on-surface, #322b42)",fontSize:13,fontWeight:600,fontFamily:"system-ui",textWrap:{width:u-63,height:35,ellipsis:!0}},statusDot:{cx:19,cy:62,r:3,fill:d},statusText:{x:28,y:66,text:o?this.statusLabel(n):e.enabled?"Data connection":"Disabled",fontSize:11,fontFamily:"system-ui",fill:d},counts:{x:u-16,y:66,textAnchor:"end",text:s?`${s.processed}/${s.total}`:"",fontSize:10,fontFamily:"system-ui",fill:"#837990"},progressTrack:{x:16,y:78,width:u-32,height:4,rx:2,fill:c,display:o?"block":"none"},progressBar:{x:16,y:78,width:(u-32)*h,height:4,rx:2,fill:d,display:o&&h>0?"block":"none"},message:{x:16,y:94,textAnchor:"start",textVerticalAnchor:"top",text:o?s?.message??(s?`${s.processed}/${s.total} records processed`:"waiting"===n?"Waiting for upstream agents":"outside this run"===n?"Not included in this run":e.enabled?"Ready for the next run":"Disabled for this workflow"):"",fontSize:11,fontFamily:"system-ui",fill:"var(--md-sys-color-on-surface-variant, #746b82)",textWrap:{width:u-32,height:28,ellipsis:!0}},model:{x:16,y:135,text:o?`Model: ${e.models.default??"Not selected"}`:"",fontSize:10,fontFamily:"system-ui",fill:d,textWrap:{width:u-32,height:14,ellipsis:!0}},footer:{x:16,y:154,text:o?s?.failedRecords?`${s.failedRecords} records need review`:`${a?`${p(a.spentMicros)} spent`:"Models & settings ↗"}${void 0!==s?.outputCount&&s.outputCount!==s.total?` · ${s.outputCount} outputs`:""}`:"",fontSize:10,fontFamily:"system-ui",fill:d,textWrap:{width:u-32,height:14,ellipsis:!0}}}});t.push(m)}for(const e of this.graph.edges){const s=this.run?.edgeStates?.[e.id],i=Boolean(s)&&"running"===this.run?.status&&"running"===this.run?.nodeStates[e.target]?.status,r=new v({id:e.id,source:{id:e.source},target:{id:e.target},attrs:{line:{class:i?"flowing":"",stroke:i?"#9279c4":"#c8c0d5",strokeWidth:i?2.5:1.5,strokeDasharray:i?"6 4":"none",targetMarker:{type:"path",d:"M 8 -4 0 0 8 4 z"}}}});s&&r.labels([{attrs:{text:{text:`${s.records} records`,fontSize:10,fontFamily:"system-ui",fill:"#756985"},rect:{fill:"var(--md-sys-color-surface, #fff)",stroke:"#e2dbe9",rx:5,ry:5}}}]),r.router("manhattan",{padding:8,maximumLoops:5e3}),r.connector("rounded"),t.unshift(r)}for(const[e,s]of Object.values(this.run?.childStates??{}).entries()){const i=this.graph.nodes.find((e=>e.id===s.nodeId));if(!i)continue;const r=`child:${s.nodeId}:${s.label}`;t.push(new y({id:r,agentId:i.id,position:{x:40+e%4*250,y:Math.max(...this.graph.nodes.map((e=>e.position.y)))+190+60*Math.floor(e/4)},size:{width:210,height:44},attrs:{body:{fill:s.processed>=s.total?"#edf6f2":"running"===this.run?.status?"#f1ecfb":"#eeeaf4",stroke:"#dcd6e6",rx:12,ry:12},label:{text:`${s.label} · ${s.processed}/${s.total}`,fontSize:11,fontFamily:"system-ui",fill:"#746b82",textWrap:{width:200,height:40}}}})),t.unshift(new v({source:{id:i.id},target:{id:r},router:{name:"manhattan",args:{padding:8,maximumLoops:5e3}},connector:{name:"rounded"},attrs:{line:{stroke:"#b2adbd",strokeWidth:1,strokeDasharray:"3 3",targetMarker:{type:"path",d:"M 6 -3 0 0 6 3 z"}}}}))}this.diagram.resetCells(t);const s=this.diagram.getElements().map((e=>e.getBBox()));this.contentWidth=Math.max(600,...s.map((e=>e.x+e.width+40))),this.contentHeight=Math.max(350,...s.map((e=>e.y+e.height+40))),this.applyScale(),e&&this.renderRoot.querySelector(`[model-id="${CSS.escape(e)}"]`)?.focus()}};A.styles=e`
    :host {
      display: block;
      min-height: 380px;
      min-width: 0;
    }
    .canvas {
      height: 480px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      overflow: auto;
      border: 1px solid var(--md-sys-color-outline-variant, #ddd);
      border-radius: 16px;
      background: linear-gradient(
        155deg,
        var(--md-sys-color-surface, #fcfbff),
        var(--md-sys-color-surface-container, #f3f1f8)
      );
      scrollbar-width: thin;
      scrollbar-color: #c5bcd8 transparent;
    }
    .tools {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 8px;
      flex-wrap: wrap;
    }
    .tools strong {
      font-size: 13px;
      margin-right: auto;
    }
    .tools .legend {
      width: 100%;
      margin: 0 0 6px;
      font-size: 11px;
    }
    .zoom-value {
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      min-width: 38px;
      text-align: center;
    }
    .node-body {
      filter: drop-shadow(0 3px 6px #39284e12);
    }
    .joint-element:hover .node-body {
      stroke: #8b78bc;
      stroke-width: 2;
    }
    .joint-element:focus-visible .node-body {
      stroke: #705299;
      stroke-width: 3;
    }
    .flowing {
      animation: flow 1.5s linear infinite;
    }
    @keyframes flow {
      to {
        stroke-dashoffset: -20;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .flowing {
        animation: none;
      }
    }
    .network-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      font-size: 11px;
      margin-top: 10px;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .network-legend span {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .network-legend i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    button {
      border: 1px solid var(--md-sys-color-outline-variant, #ded7e9);
      background: var(--md-sys-color-surface, #fff);
      color: inherit;
      border-radius: 9px;
      padding: 7px 12px;
      cursor: pointer;
      font: inherit;
      font-size: 12px;
    }
    .legend {
      font-size: 12px;
      opacity: 0.8;
      margin-left: auto;
    }
    .activity {
      border: 1px solid var(--md-sys-color-outline-variant, #ddd);
      border-radius: 14px;
      padding: 14px;
      margin-bottom: 12px;
      overflow-wrap: anywhere;
      background: linear-gradient(
        115deg,
        color-mix(
          in srgb,
          var(--md-sys-color-primary, #7663a8) 6%,
          var(--md-sys-color-surface, #fff)
        ),
        var(--md-sys-color-surface, #fff)
      );
      box-shadow: inset 3px 0 0 var(--md-sys-color-primary, #8470b6);
    }
    .activity header,
    .latest-heading {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    h3,
    p {
      margin: 0;
    }
    h3 {
      font-size: 14px;
    }
    .hint,
    time,
    .counts {
      font-size: 12px;
      opacity: 0.8;
    }
    .hint {
      margin: 8px 0;
    }
    .latest-item {
      margin: 12px 0;
    }
    .latest-item p {
      margin: 6px 0;
      white-space: pre-wrap;
    }
    .agent-name {
      padding: 0;
      border: none;
      text-align: left;
      text-decoration: none;
      font-weight: 600;
      color: var(--md-sys-color-primary, #655194);
    }
    .status {
      display: inline-block;
      font-size: 12px;
      border-radius: 20px;
      padding: 3px 9px;
      background: #eeeaf4;
      color: #393344;
    }
    .status[data-status="running"] {
      background: #eee8fb;
      color: #66508f;
    }
    .status[data-status="completed"] {
      background: #e7f4e7;
      color: #285930;
    }
    .status[data-status="paused"],
    .status[data-status="failed"] {
      background: #fff0db;
      color: #704600;
    }
    summary {
      cursor: pointer;
      font-size: 13px;
    }
    ol {
      max-height: 240px;
      overflow: auto;
      padding-left: 24px;
    }
    li {
      margin: 12px 0;
    }
    li p {
      margin-top: 4px;
      white-space: pre-wrap;
    }
    button:focus-visible,
    summary:focus-visible {
      outline: 2px solid #1673b8;
      outline-offset: 3px;
    }
  `,S([t({attribute:!1})],A.prototype,"graph",void 0),S([t({attribute:!1})],A.prototype,"run",void 0),S([t({attribute:!1})],A.prototype,"selectedNode",void 0),S([t({type:Boolean})],A.prototype,"readonly",void 0),S([s()],A.prototype,"zoom",void 0),A=S([i("yp-live-workflow-graph")],A);var I=function(e,t,s,i){for(var r,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i,n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a<3?r(o):a>3?r(t,s,o):r(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o};let R=class extends r{constructor(){super(...arguments),this.runs=[],this.revision=0,this.runId="",this.compare="",this.search="",this.filter="all",this.offset=0,this.error="",this.busy=!1,this.generation=0}updated(e){e.has("groupId")&&(this.generation++,void 0!==e.get("groupId")&&(this.runId=""),this.compare="",this.page=void 0,this.offset=0),!this.runId&&this.runs.length&&(this.runId=this.runs.find((e=>"completed"===e.status))?.id??this.runs[0].id),e.has("runId")&&this.runId&&(this.page=void 0,this.compare===this.runId&&(this.compare=""),this.offset=0,this.dispatchEvent(new CustomEvent("workflow-run-selected",{detail:this.runId,bubbles:!0,composed:!0}))),(e.has("groupId")||e.has("revision")||e.has("runId")||e.has("compare"))&&this.load()}disconnectedCallback(){super.disconnectedCallback(),this.generation++}async load(){if(!this.runId)return;const e=++this.generation;this.busy=!0,this.error="";try{const t=new URLSearchParams({offset:String(this.offset),limit:"20",search:this.search,filter:this.filter});this.compare&&t.set("compare",this.compare);const s=await new u(this.groupId).request(`/runs/${this.runId}/results?${t}`);e===this.generation&&(this.page=s)}catch(t){e===this.generation&&(this.page=void 0,this.error=t instanceof Error?t.message:String(t))}finally{e===this.generation&&(this.busy=!1)}}runSummary(e){const t=this.runs.find((t=>t.id===e));if(!t)return o;const s=[...new Set(t.graph.nodes.filter((e=>t.nodeIds.includes(e.id))).flatMap((e=>Object.values(e.models))))];return a`<p>
        ${t.mode} · ${t.inputCount} sampled/input parents ·
        ${p(t.spentMicros)} settled · ${p(t.reservedMicros)}
        reserved<br />Models: ${s.join(", ")||"none"}<br /><span
          class="muted"
          >Source ${t.sourceHash.slice(0,12)} · ${t.status}</span
        >
      </p>
      <details>
        <summary>Models by agent</summary>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Agent</th>
                <th scope="col">Role</th>
                <th scope="col">Model</th>
                <th scope="col">Reasoning</th>
              </tr>
            </thead>
            <tbody>
              ${t.graph.nodes.filter((e=>t.nodeIds.includes(e.id))).map((e=>Object.entries(e.models).map((([s,i])=>a`<tr>
                        <td>${e.label}</td>
                        <td>${x(s)}</td>
                        <td>${i}</td>
                        <td>
                          ${$(e,t.modelCatalog?.find((e=>e.id===i)))}
                        </td>
                      </tr>`))))}
            </tbody>
          </table>
        </div>
        <p class="muted">
          Saved run settings. Other roles inherit the processing model unless
          listed here.
        </p>
      </details>`}record(e){return a`<h4>${String(e.name??e.id??"Result")}</h4>
      <p>
        ${String(e.status??"")}${e.parentId?a` · Parent: ${String(e.parentName??e.parentId)} · Level:
            ${String(e.level?.name??"")}`:o}
      </p>
      ${this.skillsFirst(e)}
      ${e.rewrittenText?a`<p><strong>Proposed rewrite</strong></p>
            <pre>${String(e.rewrittenText)}</pre>`:o}
      ${e.errors&&Array.isArray(e.errors)&&e.errors.length?a`<p role="alert">${e.errors.join("; ")}</p>`:o}
      <details>
        <summary>Original, evidence and full record</summary>
        <pre>${JSON.stringify(e,null,2)}</pre>
      </details>`}researchCoverage(e){const t=e=>e&&"object"==typeof e&&!Array.isArray(e)?e:{},s=e=>Array.isArray(e)?e.filter((e=>"string"==typeof e)):[],i=Object.entries(t(t(e).research));return i.length?a`<h5>Research coverage</h5>
      ${i.map((([e,i])=>{const r=t(i),n=t(r.review),l="licenses"===e?"License and degree research":"education"===e?"Education and statute research":e,d=[...new Set([...s(r.gaps),...s(r.conflicts),...s(n.issues)])],c=Array.isArray(r.sources)?r.sources.map(t):[],p=Array.isArray(r.citations)?r.citations.length:0;return a`<details>
          <summary>
            ${l} ·
            ${"known"===r.status?"Evidence reviewed":"Needs review"}
          </summary>
          <p>
            ${c.length} ${1===c.length?"source":"sources"}
            checked · ${p}
            ${1===p?"cited excerpt":"cited excerpts"}
          </p>
          ${!0===t(r.limits).exhausted?a`<p class="muted">
                Configured research limit reached. Unresolved findings need
                further research or review.
              </p>`:o}
          ${d.length?a`<ul>
                ${d.map((e=>a`<li>${e}</li>`))}
              </ul>`:o}
          ${c.map((e=>a`<p>
                ${"string"==typeof e.url&&/^https?:\/\//i.test(e.url)?a`<a
                      href=${e.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      >${String(e.title||e.url)}</a
                    >`:String(e.title??"Source")}
                ${!0===e.truncated?" · Incomplete document":o}
                ${!1===e.jurisdictionMatches?" · Different jurisdiction":o}
                ${"secondary"===e.authority?" · Secondary source":o}
              </p>`))}
        </details>`}))}`:o}documentFindings(e){const t=e=>e&&"object"==typeof e&&!Array.isArray(e)?e:{},s=t(t(e.analysis).documentRequirements);if("supplied_description_only"!==s.scope)return o;const i={required:"Stated as required",preferred:"Stated as preferred",alternative:"Stated as an alternative",conditional:"Conditional on the position or specialty",explicitly_not_required:"Explicitly stated as not required",not_stated:"Not stated in this description",unclear:"Unclear from this description"};return a`<details>
      <summary>What the supplied description states</summary>
      <p>
        This assessment describes the uploaded text. External requirements and
        their applicability are reviewed separately under License and legal
        research.
      </p>
      ${[["degree","Education"],["license","Licensing"]].map((([e,r])=>{const o=t(s[e]);return a`<p>
            <strong>${r}:</strong> ${i[String(o.statement)]??"Not assessed"}
          </p>
          <p>
            ${"string"==typeof o.explanation?o.explanation:""}
          </p>`}))}
    </details>`}skillsFirst(e){if(!e.degreeAnalysis||"object"!=typeof e.degreeAnalysis||Array.isArray(e.degreeAnalysis))return o;const t=e,s=t.degreeAnalysis,i=s.degreeRequirementStatus,r=s.professionalLicenseRequirement,n=e=>a`<dl>
        ${e.map((([e,t])=>a`<div>
              <dt>${e}</dt>
              <dd>${(e=>null==e||""===e?"Unknown":"boolean"==typeof e?e?"Yes":"No":String(e))(t)}</dd>
            </div>`))}
      </dl>`,l=e=>/^https?:\/\//i.test(e)?a`<a href=${e} target="_blank" rel="noopener noreferrer"
            >${e}</a
          >`:e;return a`<section class="findings" aria-label="Skills First findings">
      <strong>Skills First findings</strong>
      ${this.documentFindings(e)}
      ${n([["Title code",t.titleCode],["Highest stated education",s.maximumDegreeRequirement],["Degree mandatory",i?.isDegreeMandatory],["Alternative qualifications",i?.hasAlternativeQualifications],["License required",r?.isLicenseRequired],["Consistency checks",null===t.validationScore||void 0===t.validationScore?"Not checked":`${t.validationScore}/9 passed`]])}
      <details>
        <summary>Degree paths and evidence</summary>
        ${n([["Needs college degree",s.needsCollegeDegree],["Multiple qualification paths",i?.multipleQualificationPaths],["Degree absolutely required",i?.isDegreeAbsolutelyRequired],["Substitution possible",i?.substitutionPossible]])}
        ${s.educationRequirements?.map((e=>a`<p>
                <strong>${e.type}</strong> ·
                ${e.requirementStatus??(!0===e.isMandatory?"mandatory":"Status unknown")}
              </p>
              <blockquote>${e.evidenceQuote}</blockquote>`))}
        <p>
          <strong>Alternatives:</strong>
          ${i?.alternativeQualifications?.join("\n")||"Unknown"}
        </p>
        <p>
          ${s.mandatoryStatusExplanations?.degreeRequirementExplanation??"Degree explanation unavailable."}
        </p>
        ${[s.mandatoryStatusExplanations?.bothTrueExplanation,s.mandatoryStatusExplanations?.bothFalseExplanation].filter(Boolean).map((e=>a`<p>${e}</p>`))}
        ${s.degreePreferenceQuote?a`<blockquote>${s.degreePreferenceQuote}</blockquote>`:o}
        <p>
          <strong>Barriers:</strong> ${s.barriersToNonDegreeApplicants??"Unknown"}
        </p>
      </details>
      <details>
        <summary>Consistency and readability</summary>
        ${n(Object.entries(s.validationChecks??{}).map((([e,t])=>[e.replace(/Consistency$/,"").replace(/([A-Z])/g," $1"),t??"Not checked"])))}
        <p class="muted">
          The score counts pass results only. Unknown, failed and inapplicable
          checks are shown individually.
        </p>
        ${n([["Estimated reading level",t.readingLevelGradeAnalysis?.readabilityLevel],["Flesch–Kincaid grade",t.readabilityAnalysisTextTSNPM?.fleschKincaidGrade],["Reading level matches education",t.readingLevelGradeAnalysis?.readingLevelMatchesDegreeRequirement]])}
        <p>
          ${t.readingLevelGradeAnalysis?.readabilityLevelExplanation??"Reading level explanation unavailable."}
        </p>
        ${t.readingLevelGradeAnalysis?.difficultPassages?.map((e=>a`<blockquote>${e}</blockquote>`))}
      </details>
      <details>
        <summary>License and legal research</summary>
        ${n([["License type",r?.licenseType],["Issuing authority",r?.issuingAuthority],["License requires a degree",r?.includesDegreeRequirement]])}
        <p>${r?.licenseDescription??"License details unavailable."}</p>
        ${t.licenseComparisons?.length?t.licenseComparisons.map((e=>a`
                ${n([["WVU profession",e.matchingWvuProfession],["WVU education",e.wvuEducationRequirement],["Researched education",e.researchEducationRequirement],["Manual minimum education",e.manualMinimumEducationRequirement],["Manual review required",e.requiresManualReview]])}
                <p>${e.researchComparisonExplanation}</p>
                <p>${e.recommendedAction}</p>
                ${e.sourceUrl?l(e.sourceUrl):o}
              `)):a`<p class="muted">No license comparison data supplied.</p>`}
        ${s.deepResearchResults?.length?s.deepResearchResults.map((e=>a`
                <p>
                  <strong>${e.jobTitle}</strong> ·
                  ${"known"===e.status?"Evidence reviewed":"Needs review"}
                </p>
                <p>
                  ${e.statedDegreeRequirement??"Degree requirement unknown"}
                </p>
                <p>${e.reasoning}</p>
                <blockquote>${e.evidenceQuote}</blockquote>
                ${l(e.sourceUrl)}
              `)):a`<p class="muted">
              No legal research results. Missing research does not establish
              that a requirement is absent.
            </p>`}
        ${this.researchCoverage(e.analysis)}
      </details>
    </section>`}render(){return a`<h3>Review results</h3>
      <form
        class="controls"
        @submit=${e=>{e.preventDefault(),this.offset=0,this.load()}}
      >
        <label
          >Result run<select
            .value=${this.runId}
            @change=${e=>{this.runId=e.target.value,this.offset=0}}
          >
            ${this.runs.map((e=>a`<option value=${e.id} ?selected=${e.id===this.runId}>
                  ${e.mode} · ${e.status} · ${e.createdAt.slice(0,16)} ·
                  ${e.id.slice(0,8)}
                </option>`))}
          </select></label
        >
        <label
          >Compare with<select
            .value=${this.compare}
            @change=${e=>{this.compare=e.target.value}}
          >
            <option value="" ?selected=${!this.compare}>No comparison</option>
            ${this.runs.filter((e=>e.id!==this.runId)).map((e=>a`<option value=${e.id} ?selected=${e.id===this.compare}>
                    ${e.mode} · ${e.createdAt.slice(0,16)} ·
                    ${e.id.slice(0,8)}
                  </option>`))}
          </select></label
        >
        <label
          >Search results<input
            .value=${this.search}
            maxlength="200"
            @input=${e=>this.search=e.target.value}
        /></label>
        <label
          >Show<select
            .value=${this.filter}
            @change=${e=>{this.filter=e.target.value,this.offset=0,this.load()}}
          >
            ${["all","failed","unknown","children","parents"].map((e=>a`<option value=${e}>${e}</option>`))}
          </select></label
        >
        <button ?disabled=${this.busy}>Search</button>
      </form>
      <div class="compare">
        <div>${this.runSummary(this.runId)}</div>
        ${this.compare?a`<div>${this.runSummary(this.compare)}</div>`:o}
      </div>
      ${this.compare?a`<p class="muted">
            Records match by stable ID. Changed inputs or level identities may
            have no match. Reverse the selected runs to inspect records unique
            to the comparison.
          </p>`:o}
      ${this.error?a`<p role="alert">${this.error}</p>`:o}
      ${this.busy?a`<p role="status">Loading results…</p>`:o}
      ${this.page?a`<p role="status">
              ${this.page.available?`${this.page.total} matching results`:"No review results yet. Older runs still have downloadable artifacts in Data."}
            </p>
            ${this.page.rows.map((e=>a`<article class="compare">
                  <div>${this.record(e.value)}</div>
                  ${this.compare?a`<div>
                        ${e.comparison?this.record(e.comparison):a`<p>No matching record in comparison run.</p>`}
                      </div>`:o}
                </article>`))}
            <div class="controls">
              <button
                ?disabled=${this.busy||!this.offset}
                @click=${()=>{this.offset=Math.max(0,this.offset-20),this.load()}}
              >
                Previous results</button
              ><span
                >${this.page.total?this.offset+1:0}–${Math.min(this.offset+20,this.page.total)}
                of ${this.page.total}</span
              ><button
                ?disabled=${this.busy||this.offset+20>=this.page.total}
                @click=${()=>{this.offset+=20,this.load()}}
              >
                Next results
              </button>
            </div>`:o}`}};
/*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE */
function T(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,i=Array(t);s<t;s++)i[s]=e[s];return i}
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
function C(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var s=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=s){var i,r,a,o,n=[],l=!0,d=!1;try{if(a=(s=s.call(e)).next,0===t){if(Object(s)!==s)return;l=!1}else for(;!(l=(i=a.call(s)).done)&&(n.push(i.value),n.length!==t);l=!0);}catch(e){d=!0,r=e}finally{try{if(!l&&null!=s.return&&(o=s.return(),Object(o)!==o))return}finally{if(d)throw r}}return n}}(e,t)||function(e,t){if(e){if("string"==typeof e)return T(e,t);var s={}.toString.call(e).slice(8,-1);return"Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s?Array.from(e):"Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s)?T(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}R.styles=e`
    :host {
      display: block;
    }
    .controls {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      align-items: end;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    select,
    input,
    button {
      font: inherit;
      padding: 8px;
    }
    article {
      border: 1px solid #8886;
      border-radius: 8px;
      padding: 12px;
      margin: 12px 0;
    }
    .compare {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      max-height: 420px;
      overflow: auto;
    }
    .muted {
      opacity: 0.75;
    }
    [role="alert"] {
      color: #b3261e;
    }
    h4 {
      margin: 4px 0 12px;
    }
    .table-scroll {
      max-width: 100%;
      overflow-x: auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
    }
    th,
    td {
      text-align: left;
      padding: 8px;
      border-bottom: 1px solid #8886;
      vertical-align: top;
      overflow-wrap: anywhere;
    }
    summary {
      cursor: pointer;
    }
    .findings {
      border: 1px solid #7293aa55;
      border-radius: 12px;
      background: #7293aa0c;
      padding: 14px;
      margin: 12px 0;
    }
    .findings dl {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 14px;
      margin: 12px 0;
    }
    .findings dt {
      font-size: 12px;
      opacity: 0.75;
    }
    .findings dd {
      margin: 4px 0 0;
      overflow-wrap: anywhere;
    }
    .findings details {
      margin-top: 12px;
    }
    .findings blockquote {
      border-left: 3px solid #7293aa66;
      margin: 10px 0;
      padding: 4px 12px;
      white-space: pre-wrap;
    }
    .findings p {
      overflow-wrap: anywhere;
    }
    .findings a {
      color: inherit;
      overflow-wrap: anywhere;
    }
  `,I([t({type:Number})],R.prototype,"groupId",void 0),I([t({attribute:!1})],R.prototype,"runs",void 0),I([t({type:Number})],R.prototype,"revision",void 0),I([t({attribute:!1})],R.prototype,"runId",void 0),I([s()],R.prototype,"compare",void 0),I([s()],R.prototype,"search",void 0),I([s()],R.prototype,"filter",void 0),I([s()],R.prototype,"offset",void 0),I([s()],R.prototype,"page",void 0),I([s()],R.prototype,"error",void 0),I([s()],R.prototype,"busy",void 0),R=I([i("yp-live-workflow-results")],R);const E=Object.entries,N=Object.setPrototypeOf,M=Object.isFrozen,O=Object.getPrototypeOf,D=Object.getOwnPropertyDescriptor;let q=Object.freeze,P=Object.seal,L=Object.create,z="undefined"!=typeof Reflect&&Reflect,_=z.apply,U=z.construct;q||(q=function(e){return e}),P||(P=function(e){return e}),_||(_=function(e,t){for(var s=arguments.length,i=new Array(s>2?s-2:0),r=2;r<s;r++)i[r-2]=arguments[r];return e.apply(t,i)}),U||(U=function(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),i=1;i<t;i++)s[i-1]=arguments[i];return new e(...s)});const F=pe(Array.prototype.forEach),B=pe(Array.prototype.lastIndexOf),j=pe(Array.prototype.pop),W=pe(Array.prototype.push),G=pe(Array.prototype.slice),H=pe(Array.prototype.splice),Y=Array.isArray,J=ue(Set),V=pe(Set.prototype.add),K=pe(Set.prototype.has),Q=pe(String.prototype.toLowerCase),Z=pe(String.prototype.toString),X=pe(String.prototype.match),ee=pe(String.prototype.replace),te=pe(String.prototype.indexOf),se=pe(String.prototype.trim),ie=pe(Number.prototype.toString),re=pe(Boolean.prototype.toString),ae="undefined"==typeof BigInt?null:pe(BigInt.prototype.toString),oe="undefined"==typeof Symbol?null:pe(Symbol.prototype.toString),ne=pe(Object.prototype.hasOwnProperty),le=pe(Object.prototype.toString),de=pe(RegExp.prototype.test),ce=ue(TypeError);function pe(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var s=arguments.length,i=new Array(s>1?s-1:0),r=1;r<s;r++)i[r-1]=arguments[r];return _(e,t,i)}}function ue(e){return function(){for(var t=arguments.length,s=new Array(t),i=0;i<t;i++)s[i]=arguments[i];return U(e,s)}}function he(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:Q;if(N&&N(e,null),!Y(t))return e;let i=t.length;for(;i--;){let r=t[i];if("string"==typeof r){const e=s(r);e!==r&&(M(t)||(t[i]=e),r=e)}e[r]=!0}return e}function me(e){for(let t=0;t<e.length;t++)ne(e,t)||(e[t]=null);return e}function ge(e){const t=L(null);for(const i of E(e)){var s=C(i,2);const r=s[0],a=s[1];ne(e,r)&&(Y(a)?t[r]=me(a):a&&"object"==typeof a&&a.constructor===Object?t[r]=ge(a):t[r]=a)}return t}function fe(e,t){for(;null!==e;){const s=D(e,t);if(s){if(s.get)return pe(s.get);if("function"==typeof s.value)return pe(s.value)}e=O(e)}return function(){return null}}const be=q(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ye=q(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ve=q(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),$e=q(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),we=q(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),xe=q(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ke=q(["#text"]),Se=q(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Ae=q(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ie=q(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Re=q(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Te=P(/{{[\w\W]*|^[\w\W]*}}/g),Ce=P(/<%[\w\W]*|^[\w\W]*%>/g),Ee=P(/\${[\w\W]*/g),Ne=P(/^data-[\-\w.\u00B7-\uFFFF]+$/),Me=P(/^aria-[\-\w]+$/),Oe=P(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),De=P(/^(?:\w+script|data):/i),qe=P(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Pe=P(/^html$/i),Le=P(/^[a-z][.\w]*(-[.\w]+)+$/i),ze=P(/<[/\w!]/g),_e=P(/<[/\w]/g),Ue=P(/<\/no(script|embed|frames)/i),Fe=P(/\/>/i),Be=1,je=3,We=7,Ge=8,He=9,Ye=11,Je=q(he({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),Ve=function(){return"undefined"==typeof window?null:window},Ke=function(e,t,s,i){return ne(e,t)&&Y(e[t])?he(i.base?ge(i.base):{},e[t],i.transform):s},Qe=function(e,t,s){const i=ne(e,t)?e[t]:void 0;return i&&"object"==typeof i?ge(i):s()};var Ze=function e(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ve();const s=t=>e(t);if(s.version="3.4.17",s.removed=[],!t||!t.document||t.document.nodeType!==He||!t.Element)return s.isSupported=!1,s;let i=t.document;const r=i,a=r.currentScript;t.DocumentFragment;const o=t.HTMLTemplateElement,n=t.Node,l=t.Element,d=t.NodeFilter;void 0===t.NamedNodeMap&&(t.NamedNodeMap||t.MozNamedAttrMap),t.HTMLFormElement;const c=t.DOMParser,p=t.trustedTypes,u=l.prototype,h=fe(u,"cloneNode"),m=fe(u,"remove"),g=fe(u,"removeAttributeNode"),f=fe(u,"nextSibling"),b=fe(u,"childNodes"),y=fe(u,"parentNode"),v=fe(u,"shadowRoot"),$=fe(u,"attributes"),w=n&&n.prototype?fe(n.prototype,"nodeType"):null,x=n&&n.prototype?fe(n.prototype,"nodeName"):null,k=n&&n.prototype?fe(n.prototype,"ownerDocument"):null,S=function(e){return w?w(e):e.nodeType},A=function(e){return x?x(e):e.nodeName},I=function(e,t){for(;null!==e;){const s=D(e,t);if(s)return s.get?pe(s.get):null;e=O(e)}return null}(u,"namespaceURI"),R=function(e){return I?I(e):e.namespaceURI};if("function"==typeof o){const e=i.createElement("template");e.content&&e.content.ownerDocument&&(i=e.content.ownerDocument)}let T,C,N="",M=!1,z=0;const _=function(){if(z>0)throw ce('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},U=function(e){_(),z++;try{return T.createHTML(e)}finally{z--}},ue=function(){return M||(C=function(e,t){if("object"!=typeof e||"function"!=typeof e.createPolicy)return null;let s=null;const i="data-tt-policy-suffix";t&&t.hasAttribute(i)&&(s=t.getAttribute(i));const r="dompurify"+(s?"#"+s:"");try{return e.createPolicy(r,{createHTML:e=>e,createScriptURL:e=>e})}catch(e){return console.warn("TrustedTypes policy "+r+" could not be created."),null}}(p,a),M=!0),C},me=i,Ze=me.implementation,Xe=me.createNodeIterator,et=me.createDocumentFragment,tt=me.getElementsByTagName,st=r.importNode;let it={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]};s.isSupported="function"==typeof E&&"function"==typeof y&&Ze&&void 0!==Ze.createHTMLDocument;const rt=Te,at=Ce,ot=Ee,nt=Ne,lt=Me,dt=De,ct=qe,pt=Le;let ut=Oe,ht=null;const mt=he({},[...be,...ye,...ve,...we,...ke]);let gt=null;const ft=he({},[...Se,...Ae,...Ie,...Re]);let bt=Object.seal(L(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),yt=null,vt=null;const $t=Object.seal(L(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}}));let wt=!0,xt=!0,kt=!1,St=!0,At=!1,It=!0,Rt=!1,Tt=!1,Ct=null,Et=null,Nt=!1,Mt=!1,Ot=!1,Dt=!1,qt=!0,Pt=!1;const Lt="user-content-";let zt=!0,_t=!1,Ut=null,Ft={},Bt=null;const jt=he({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]);let Wt=null;const Gt=he({},["audio","video","img","source","image","track"]);let Ht=null;const Yt=he({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Jt="http://www.w3.org/1998/Math/MathML",Vt="http://www.w3.org/2000/svg",Kt="http://www.w3.org/1999/xhtml";let Qt=Kt,Zt=!1,Xt=null;const es=he({},[Jt,Vt,Kt],Z),ts=q(["mi","mo","mn","ms","mtext"]);let ss=he({},ts);const is=q(["annotation-xml"]);let rs=he({},is);const as=he({},["title","style","font","a","script"]);let os=null;const ns=["application/xhtml+xml","text/html"];let ls=null,ds=null;const cs=i.createElement("form"),ps=function(e){return e instanceof RegExp||e instanceof Function},us=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(ds&&ds===e)return;e&&"object"==typeof e||(e={}),e=ge(e),os=-1===ns.indexOf(e.PARSER_MEDIA_TYPE)?"text/html":e.PARSER_MEDIA_TYPE,ls="application/xhtml+xml"===os?Z:Q,ht=Ke(e,"ALLOWED_TAGS",mt,{transform:ls}),gt=Ke(e,"ALLOWED_ATTR",ft,{transform:ls}),Xt=Ke(e,"ALLOWED_NAMESPACES",es,{transform:Z}),Ht=Ke(e,"ADD_URI_SAFE_ATTR",Yt,{transform:ls,base:Yt}),Wt=Ke(e,"ADD_DATA_URI_TAGS",Gt,{transform:ls,base:Gt}),Bt=Ke(e,"FORBID_CONTENTS",jt,{transform:ls}),yt=Ke(e,"FORBID_TAGS",ge({}),{transform:ls}),vt=Ke(e,"FORBID_ATTR",ge({}),{transform:ls}),Ft=!!ne(e,"USE_PROFILES")&&(e.USE_PROFILES&&"object"==typeof e.USE_PROFILES?ge(e.USE_PROFILES):e.USE_PROFILES),wt=!1!==e.ALLOW_ARIA_ATTR,xt=!1!==e.ALLOW_DATA_ATTR,kt=e.ALLOW_UNKNOWN_PROTOCOLS||!1,St=!1!==e.ALLOW_SELF_CLOSE_IN_ATTR,At=e.SAFE_FOR_TEMPLATES||!1,It=!1!==e.SAFE_FOR_XML,Rt=e.WHOLE_DOCUMENT||!1,Mt=e.RETURN_DOM||!1,Ot=e.RETURN_DOM_FRAGMENT||!1,Dt=e.RETURN_TRUSTED_TYPE||!1,Nt=e.FORCE_BODY||!1,qt=!1!==e.SANITIZE_DOM,Pt=e.SANITIZE_NAMED_PROPS||!1,zt=!1!==e.KEEP_CONTENT,_t=e.IN_PLACE||!1,ut=function(e){try{return de(e,""),!0}catch(e){return!1}}(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Oe,Qt="string"==typeof e.NAMESPACE?e.NAMESPACE:Kt,ss=Qe(e,"MATHML_TEXT_INTEGRATION_POINTS",(()=>he({},ts))),rs=Qe(e,"HTML_INTEGRATION_POINTS",(()=>he({},is)));const t=Qe(e,"CUSTOM_ELEMENT_HANDLING",(()=>L(null)));if(bt=L(null),ne(t,"tagNameCheck")&&ps(t.tagNameCheck)&&(bt.tagNameCheck=t.tagNameCheck),ne(t,"attributeNameCheck")&&ps(t.attributeNameCheck)&&(bt.attributeNameCheck=t.attributeNameCheck),ne(t,"allowCustomizedBuiltInElements")&&"boolean"==typeof t.allowCustomizedBuiltInElements&&(bt.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),P(bt),At&&(xt=!1),Ot&&(Mt=!0),Ft&&(ht=he({},ke),gt=L(null),!0===Ft.html&&(he(ht,be),he(gt,Se)),!0===Ft.svg&&(he(ht,ye),he(gt,Ae),he(gt,Re)),!0===Ft.svgFilters&&(he(ht,ve),he(gt,Ae),he(gt,Re)),!0===Ft.mathMl&&(he(ht,we),he(gt,Ie),he(gt,Re))),$t.tagCheck=null,$t.attributeCheck=null,ne(e,"ADD_TAGS")&&("function"==typeof e.ADD_TAGS?$t.tagCheck=e.ADD_TAGS:Y(e.ADD_TAGS)&&(ht===mt&&(ht=ge(ht)),he(ht,e.ADD_TAGS,ls))),ne(e,"ADD_ATTR")&&("function"==typeof e.ADD_ATTR?$t.attributeCheck=e.ADD_ATTR:Y(e.ADD_ATTR)&&(gt===ft&&(gt=ge(gt)),he(gt,e.ADD_ATTR,ls))),ne(e,"ADD_FORBID_CONTENTS")&&Y(e.ADD_FORBID_CONTENTS)&&(Bt===jt&&(Bt=ge(Bt)),he(Bt,e.ADD_FORBID_CONTENTS,ls)),zt&&(ht["#text"]=!0),Rt&&he(ht,["html","head","body"]),ht.table&&(he(ht,["tbody"]),delete yt.tbody),e.TRUSTED_TYPES_POLICY){if("function"!=typeof e.TRUSTED_TYPES_POLICY.createHTML)throw ce('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if("function"!=typeof e.TRUSTED_TYPES_POLICY.createScriptURL)throw ce('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');const t=T;T=e.TRUSTED_TYPES_POLICY;try{N=U("")}catch(e){throw T=t,e}}else null===e.TRUSTED_TYPES_POLICY?(T=void 0,N=""):(void 0===T&&(T=ue()),T&&"string"==typeof N&&(N=U("")));q&&q(e),ds=e},hs=he({},[...ye,...ve,...$e]),ms=he({},[...we,...xe]),gs=function(e){const t=R(e),s=Q(A(e)),i=y(e);let r,a;return i&&S(i)===Be?(r={namespaceURI:R(i)},a=Q(A(i))):(r={namespaceURI:Qt},a="template"),!!Xt[t]&&(t===Vt?function(e,t,s){return t.namespaceURI===Kt?"svg"===e:t.namespaceURI===Jt?"svg"===e&&("annotation-xml"===s||ss[s]):Boolean(hs[e])}(s,r,a):t===Jt?function(e,t,s){return t.namespaceURI===Kt?"math"===e:t.namespaceURI===Vt?"math"===e&&rs[s]:Boolean(ms[e])}(s,r,a):t===Kt?function(e,t,s){return!(t.namespaceURI===Vt&&!rs[s])&&!(t.namespaceURI===Jt&&!ss[s])&&!ms[e]&&(as[e]||!hs[e])}(s,r,a):!("application/xhtml+xml"!==os||!Xt[t]))},fs=function(e){W(s.removed,{element:e});try{y(e).removeChild(e)}catch(t){if(m(e),!y(e))throw ce("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},bs=function(e,t,s){try{g(e,t)}catch(t){try{e.removeAttribute(s)}catch(e){}}},ys=function(e){xs(e);const t=b(e);t&&F(G(t),(e=>{try{m(e)}catch(e){}}));const s=S(e)===Be?$(e):null;if(s)for(let t=s.length-1;t>=0;--t){const i=s[t],r=i&&i.name;"string"==typeof r&&bs(e,i,r)}},vs=function(e,t,i){if(!i)try{i=t.getAttributeNode(e)}catch(e){i=null}W(s.removed,{attribute:i||null,from:t});try{i?g(t,i):t.removeAttribute(e)}catch(s){try{t.removeAttribute(e)}catch(e){}}if("is"===e)if(Mt||Ot)try{fs(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},$s=function(e){const t=$(e);if(t)for(let s=t.length-1;s>=0;--s){const i=t[s],r=i&&i.name;"string"!=typeof r||gt[ls(r)]||bs(e,i,r)}},ws=function(e,t){let s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];const i=[e];for(;i.length>0;){const e=i.pop();if(!1===t(e))continue;if(s&&S(e)===Be){const t=v(e);Os(t)&&i.push(t)}const r=b(e);if(r)for(let e=r.length-1;e>=0;--e)i.push(r[e])}},xs=function(e){ws(e,(e=>{S(e)===Be&&$s(e)}))},ks=function(e){const t=[];return ws(e,(e=>{t.push(e)}),!0),t},Ss=function(e,t){let i=!1;return F(s.removed,(t=>{t.element&&(i=i||t.element===e,xs(t.element))})),function(e,t){const s=J();F(ks(e),(e=>{S(e)===Be&&V(s,e)})),F(t,(e=>{S(e)!==Be||K(s,e)||$s(e)}))}(e,t),i},As=function(e,t,s,i){const r=Ts(e);let a;for(;a=r.nextNode();)K(i,a)&&!K(Ut,a)&&(t&&qs(it.uponSanitizeShadowNode,a,null),_s(a,s),Hs(a,s),Os(a.content)&&Ys(a.content))},Is=function(e,t){return!!It&&("patchsrc"===e||"for"===e&&"label"!==t&&"output"!==t)},Rs=function(e){let t=null,s=null;if(Nt)e="<remove></remove>"+e;else{const t=X(e,/^[\r\n\t ]+/);s=t&&t[0]}"application/xhtml+xml"===os&&Qt===Kt&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");const r=T?U(e):e;if(Qt===Kt)try{t=(new c).parseFromString(r,os)}catch(e){}if(!t||!t.documentElement){t=Ze.createDocument(Qt,"template",null);try{t.documentElement.innerHTML=Zt?N:r}catch(e){}}const a=t.body||t.documentElement;return e&&s&&a.insertBefore(i.createTextNode(s),a.childNodes[0]||null),Qt===Kt?tt.call(t,Rt?"html":"body")[0]:Rt?t.documentElement:a},Ts=function(e){const t=k?k(e):e.ownerDocument;return Xe.call(t||e,e,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT|d.SHOW_PROCESSING_INSTRUCTION|d.SHOW_CDATA_SECTION,null)},Cs=function(e){return e=ee(e,rt," "),e=ee(e,at," "),e=ee(e,ot," ")},Es=function(e){var t;Ns(e);const s=null===(t=e.querySelectorAll)||void 0===t?void 0:t.call(e,"template");s&&F(s,(e=>{Os(e.content)&&Es(e.content)}))},Ns=function(e){e.normalize();const t=k?k(e):e.ownerDocument,s=Xe.call(t||e,e,d.SHOW_TEXT|d.SHOW_COMMENT|d.SHOW_CDATA_SECTION|d.SHOW_PROCESSING_INSTRUCTION,null);let i=s.nextNode();for(;i;)i.data=Cs(i.data),i=s.nextNode()},Ms=function(e){const t=x?x(e):null;return"string"==typeof t&&("form"===ls(t)&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||e.attributes!==$(e)||"function"!=typeof e.removeAttribute||"function"!=typeof e.removeAttributeNode||"function"!=typeof e.getAttributeNode||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore||"function"!=typeof e.hasChildNodes||e.nodeType!==w(e)||e.childNodes!==b(e)))},Os=function(e){if(!w||"object"!=typeof e||null===e)return!1;try{return w(e)===Ye}catch(e){return!1}},Ds=function(e){if(!w||"object"!=typeof e||null===e)return!1;try{return"number"==typeof w(e)}catch(e){return!1}};function qs(e,t,i){0!==e.length&&F(e,(e=>{e.call(s,t,i,ds)}))}const Ps=function(e,t){if(e instanceof RegExp)return de(e,t);if(e instanceof Function){for(var s=arguments.length,i=new Array(s>2?s-2:0),r=2;r<s;r++)i[r-2]=arguments[r];return Boolean(e(t,...i))}return!1},Ls=function(e,t,s,i){return 0===e.length?t:t===s||t===i?ge(t):t},zs=function(e,t){return e!==t&&null===y(e)&&(_t&&xs(e),!0)},_s=function(e,t){var i;if(i=e,Ut&&V(Ut,i),qs(it.beforeSanitizeElements,e,null),zs(e,t))return!0;if(Ms(e))return fs(e),!0;const r=ls(A(e));if(ht=Ls(it.uponSanitizeElement,ht,mt,Ct),qs(it.uponSanitizeElement,e,{tagName:r,allowedTags:ht}),zs(e,t))return!0;if(function(e,t){return!!(It&&e.hasChildNodes()&&!Ds(e.firstElementChild)&&de(ze,e.textContent)&&de(ze,e.innerHTML))||!!(It&&Je[t]&&S(e)===Be&&R(e)===Kt&&(Ds(e.firstElementChild)||"string"==typeof e.textContent&&de(ze,e.textContent)))||e.nodeType===We||!(!It||e.nodeType!==Ge||!de(_e,e.data))}(e,r))return fs(e),!0;if(yt[r]||!($t.tagCheck instanceof Function&&$t.tagCheck(r))&&!ht[r]){const s=function(e,t,s){if(!yt[t]&&Bs(t)&&Ps(bt.tagNameCheck,t))return!1;if(zt&&!Bt[t]&&!Bt[Q(t)]){const t=y(e),i=b(e);if(i&&t)for(let r=i.length-1;r>=0;--r){const a=e===s?h(i[r],!0):i[r];t.insertBefore(a,f(e))}}return fs(e),!0}(e,r,t);return!(!1!==s||(qs(it.afterSanitizeElements,e,null),!zs(e,t)))||s}if(S(e)===Be&&!gs(e))return fs(e),!0;if(("noscript"===r||"noembed"===r||"noframes"===r)&&de(Ue,e.innerHTML))return fs(e),!0;if(At&&e.nodeType===je){const t=Cs(e.textContent);e.textContent!==t&&(W(s.removed,{element:e.cloneNode()}),e.textContent=t)}return qs(it.afterSanitizeElements,e,null),zs(e,t)},Us=function(e,t,s){if(vt[t])return!1;if(Is(t,e))return!1;if(qt&&("id"===t||"name"===t)&&(s in i||s in cs))return!1;const r=gt[t]||$t.attributeCheck instanceof Function&&$t.attributeCheck(t,e);return!(!xt||!de(nt,t))||(!(!wt||!de(lt,t))||(r?!!Ht[t]||(!!de(ut,ee(s,ct,""))||(!("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==te(s,"data:")||!Wt[e])||(!(!kt||de(dt,ee(s,ct,"")))||!s))):Bs(e)&&Ps(bt.tagNameCheck,e)&&Ps(bt.attributeNameCheck,t,e)||"is"===t&&bt.allowCustomizedBuiltInElements&&Ps(bt.tagNameCheck,s)))},Fs=he({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Bs=function(e){return!Fs[Q(e)]&&de(pt,e)},js=function(e,t,s,i){if(T&&"object"==typeof p&&"function"==typeof p.getAttributeType&&!s)switch(p.getAttributeType(e,t)){case"TrustedHTML":return U(i);case"TrustedScriptURL":return function(e){_(),z++;try{return T.createScriptURL(e)}finally{z--}}(i)}return i},Ws=function(e,t,s,i){try{return s?e.setAttributeNS(s,t,i):e.setAttribute(t,i),!Ms(e)||(fs(e),!1)}catch(s){return vs(t,e),!1}},Gs=function(e,t){return!(!It||!de(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t))||"attributename"===Q(e)&&null!==X(t,"href")},Hs=function(e,t){if(qs(it.beforeSanitizeAttributes,e,null),zs(e,t))return;const i=e.attributes;if(!i||Ms(e))return;gt=Ls(it.uponSanitizeAttribute,gt,ft,Et);const r={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:gt,forceKeepAttr:void 0};let a=i.length;const o=ls(e.nodeName);for(;a--;){const t=i[a],n=t.name,l=t.namespaceURI,d=t.value,c=ls(n),p=d;let u="value"===n?p:se(p),h=!1;r.attrName=c,r.attrValue=u,r.keepAttr=!0,r.forceKeepAttr=void 0,qs(it.uponSanitizeAttribute,e,r),u=r.attrValue,!Pt||"id"!==c&&"name"!==c||0===te(u,Lt)||(vs(n,e,t),u=Lt+u,h=!0),Gs(n,u)?vs(n,e,t):r.forceKeepAttr||(r.keepAttr&&(St||!de(Fe,u))?(At&&(u=Cs(u)),Us(o,c,u)?(u=js(o,c,l,u),u!==p&&Ws(e,n,l,u)&&h&&j(s.removed)):vs(n,e,t)):vs(n,e,t))}qs(it.afterSanitizeAttributes,e,null),zs(e,t)},Ys=function(e){let t=null;const s=Ts(e);for(qs(it.beforeSanitizeShadowDOM,e,null);t=s.nextNode();)if(qs(it.uponSanitizeShadowNode,t,null),_s(t,e),Hs(t,e),Os(t.content)&&Ys(t.content),S(t)===Be){const e=v(t);Os(e)&&(Js(e),Ys(e))}At&&Ns(e),qs(it.afterSanitizeShadowDOM,e,null)},Js=function(e){const t=[{node:e,shadow:null}];for(;t.length>0;){const e=t.pop();if(e.shadow){Ys(e.shadow);continue}const s=e.node,i=S(s)===Be,r=b(s);if(r)for(let e=r.length-1;e>=0;--e)t.push({node:r[e],shadow:null});if(i){const e=x?x(s):null;if("string"==typeof e&&"template"===ls(e)){const e=s.content;Os(e)&&t.push({node:e,shadow:null})}}if(i){const e=v(s);Os(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return s.sanitize=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=null,a=null,o=null,n=null;if(Zt=!e,Zt&&(e="\x3c!--\x3e"),"string"!=typeof e&&!Ds(e)&&"string"!=typeof(e=function(e){switch(typeof e){case"string":return e;case"number":return ie(e);case"boolean":return re(e);case"bigint":return ae?ae(e):"0";case"symbol":return oe?oe(e):"Symbol()";case"undefined":default:return le(e);case"function":case"object":{if(null===e)return le(e);const t=e,s=fe(t,"toString");if("function"==typeof s){const e=s(t);return"string"==typeof e?e:le(e)}return le(e)}}}(e)))throw ce("dirty is not a string, aborting");if(!s.isSupported)return e;Tt?(ht=Ct,gt=Et):us(t),(it.uponSanitizeElement.length>0||it.uponSanitizeAttribute.length>0)&&(ht=ge(ht)),it.uponSanitizeAttribute.length>0&&(gt=ge(gt)),s.removed=[];const l=_t&&"string"!=typeof e&&Ds(e);let d=[];const c=Ut;if(l){p=e,It&&ws(p,(e=>{const t=S(e);if(t===We||t===Ge&&de(_e,e.data)){try{m(e)}catch(e){}return!1}if(t===Be){const t=e,s=ls(A(e));try{t.hasAttribute&&t.hasAttribute("patchsrc")&&t.removeAttribute("patchsrc"),t.hasAttribute&&t.hasAttribute("for")&&Is("for",s)&&t.removeAttribute("for")}catch(e){}}return!0}));const t=A(e);if("string"==typeof t){const s=ls(t);if(!ht[s]||yt[s])throw ys(e),ce("root node is forbidden and cannot be sanitized in-place")}if(Ms(e))throw ys(e),ce("root node is clobbered and cannot be sanitized in-place");d=ks(e),Ut=J()}else if(Ds(e))i=Rs("\x3c!----\x3e"),a=i.ownerDocument.importNode(e,!0),a.nodeType===Be&&"BODY"===a.nodeName||"HTML"===a.nodeName?i=a:i.appendChild(a),Js(i);else{if(!Mt&&!At&&!Rt&&-1===e.indexOf("<"))return T&&Dt?U(e):e;if(i=Rs(e),!i)return Mt?null:Dt?N:""}var p;i&&Nt&&fs(i.firstChild);const u=l?e:i;try{l&&Js(e);const t=Ts(u);for(;o=t.nextNode();)_s(o,u),Hs(o,u),Os(o.content)&&Ys(o.content);l&&function(e,t){const s=Ut;let i=null;const r=()=>(i||(i=J(),F(t,(e=>{V(i,e)}))),i);for(let t=0;;t++){const i=ks(e),a=[e];let o=!1;if(F(i,(e=>{S(e)===Ye?W(a,e):o||K(s,e)||(o=K(r(),e))})),!o)return;if(t>=8)throw ce("the tree kept changing during in-place sanitization; refusing to return it");F(a,((t,s)=>{As(t,s>0,e,r())}))}}(e,d)}catch(t){throw l&&(ys(e),Ss(e,d)),t}finally{Ut=c}if(l){if(Ss(e,d))throw ce("a node selected for removal could not be safely returned; refusing to sanitize in place");return At&&Es(e),e}if(Mt){if(At&&Es(i),Ot)for(n=et.call(i.ownerDocument);i.firstChild;)n.appendChild(i.firstChild);else n=i;return(gt.shadowroot||gt.shadowrootmode)&&(n=st.call(r,n,!0)),n}let h=Rt?i.outerHTML:i.innerHTML;return Rt&&ht["!doctype"]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&de(Pe,i.ownerDocument.doctype.name)&&(h="<!DOCTYPE "+i.ownerDocument.doctype.name+">\n"+h),At&&(h=Cs(h)),T&&Dt?U(h):h},s.setConfig=function(){us(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}),Tt=!0,Ct=ht,Et=gt},s.clearConfig=function(){ds=null,Tt=!1,Ct=null,Et=null,T=C,N=""},s.isValidAttribute=function(e,t,s){ds||us({});const i=ls(e),r=ls(t);return("string"!=typeof s||!(Gs(t,s)||!St&&de(Fe,s)))&&Us(i,r,s)},s.addHook=function(e,t){"function"==typeof t&&ne(it,e)&&W(it[e],t)},s.removeHook=function(e,t){if(ne(it,e)){if(void 0!==t){const s=B(it[e],t);return-1===s?void 0:H(it[e],s,1)[0]}return j(it[e])}},s.removeHooks=function(e){ne(it,e)&&(it[e]=[])},s.removeAllHooks=function(){it={afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},s}(),Xe=function(e,t,s,i){for(var r,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i,n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a<3?r(o):a>3?r(t,s,o):r(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o};const et=Ze();et.addHook("uponSanitizeAttribute",((e,t)=>{if("A"!==e.nodeName)return void(t.keepAttr=!1);if("href"!==t.attrName)return;const s=t.attrValue.replace(/[\u0000-\u0020\u007f-\u009f]/g,"");try{t.keepAttr=!/^[\\/]{2}/.test(s)&&["http:","https:","mailto:"].includes(new URL(s,"https://workflow.invalid/").protocol)}catch{t.keepAttr=!1}})),et.addHook("afterSanitizeAttributes",(e=>{"A"===e.nodeName&&(e.setAttribute("target","_blank"),e.setAttribute("rel","noopener noreferrer"))}));let tt=class extends r{constructor(){super(...arguments),this.messageRole="assistant",this.assistantName="Workflow Assistant",this.text="",this.completed=!1}willUpdate(e){(e.has("text")||e.has("messageRole"))&&(this.formatted=void 0,"assistant"===this.messageRole&&(this.formatted=et.sanitize(n.parse(this.text,{gfm:!0,breaks:!0}),{ALLOWED_TAGS:["p","br","strong","em","del","code","pre","ul","ol","li","blockquote","a","h1","h2","h3","hr","table","thead","tbody","tr","th","td"],ALLOWED_ATTR:["href","title"],ALLOW_ARIA_ATTR:!1,ALLOW_DATA_ATTR:!1})))}avatarUrl(){if(this.sender)try{const e=l.getImageFormatUrl(this.sender.UserProfileImages,0)||(this.sender.facebook_id?`https://graph.facebook.com/${this.sender.facebook_id}/picture`:"");if(!e||e===this.failedAvatar)return;const t=new URL(e,window.location.href);return["http:","https:"].includes(t.protocol)?e:void 0}catch{return}}time(){if(!this.at)return o;const e=new Date(this.at);return a`<time datetime=${this.at} title=${e.toLocaleString()}
      >${e.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}</time
    >`}render(){if("activity"===this.messageRole)return a`<details class="activity">
        <summary>${this.assistantName} activity ${this.time()}</summary>
        <pre>${this.text}</pre>
      </details>`;const e="user"===this.messageRole,t=e?this.sender?.name||"Group operator":this.assistantName,s=e?this.avatarUrl():void 0,i=t.split(/\s+/).filter(Boolean).slice(0,2).map((e=>e[0])).join("").toUpperCase();return a`<article class="message ${this.messageRole}">
      <div
        class="avatar"
        role="img"
        aria-label=${e?`${t} profile image`:this.assistantName}
      >
        ${s?a`<img
              src=${s}
              alt=""
              @error=${()=>{this.failedAvatar=s}}
            />`:e?a`<span aria-hidden="true">${i}</span>`:a`<svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                <path
                  d="m8 6-5 6 5 6m8-12 5 6-5 6m-3-14-2 16"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>`}
      </div>
      <div class="content">
        <div class="meta">
          <strong>${t}</strong
          ><span class="caption"
            >${e?this.sender?"You":"Operator":"Workflow assistant"}</span
          >${this.time()}
        </div>
        ${this.modelDetails?a`<p class="caption">${this.modelDetails}</p>`:o}
        <div class="bubble ${void 0===this.formatted?"":"markdown"}">
          ${void 0===this.formatted?a`<span class="plain">${this.text}</span>`:d(this.formatted)}
        </div>
        ${e||this.completed?o:a`<div class="streaming">Writing…</div>`}
      </div>
    </article>`}};tt.styles=e`
    :host {
      display: block;
      margin: 20px 0;
      min-width: 0;
    }
    .message {
      display: grid;
      grid-template-columns: 34px minmax(0, 1fr);
      gap: 10px;
    }
    .message.user {
      grid-template-columns: minmax(0, 1fr) 34px;
      margin-left: 28px;
    }
    .user .avatar {
      grid-column: 2;
      grid-row: 1;
    }
    .user .content {
      grid-column: 1;
      grid-row: 1;
    }
    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 12px;
      display: grid;
      place-items: center;
      overflow: hidden;
      background: linear-gradient(145deg, #8575c9, #504282);
      color: white;
      box-shadow: 0 3px 8px #55428c24;
      font-size: 12px;
      font-weight: 700;
    }
    .avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .user .avatar {
      border-radius: 50%;
      background: #e6e2f2;
      color: #574477;
    }
    .avatar svg {
      width: 21px;
      height: 21px;
    }
    .meta {
      display: flex;
      align-items: baseline;
      gap: 8px;
      margin: 0 0 7px;
      min-width: 0;
      flex-wrap: wrap;
    }
    .user .meta {
      justify-content: flex-end;
    }
    .meta strong {
      font-size: 13px;
    }
    .caption,
    time,
    .streaming {
      font-size: 11px;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    time {
      margin-left: auto;
      font-variant-numeric: tabular-nums;
    }
    .user time {
      margin-left: 0;
    }
    .bubble {
      padding: 14px 16px;
      border: 1px solid var(--md-sys-color-outline-variant, #e5e1ee);
      border-radius: 4px 18px 18px 18px;
      background: var(--md-sys-color-surface, #fff);
      box-shadow: 0 3px 12px #2b204508;
      font-size: 14px;
      line-height: 1.65;
      overflow-wrap: anywhere;
    }
    .user .bubble {
      border-radius: 18px 4px 18px 18px;
      border-color: color-mix(
        in srgb,
        var(--md-sys-color-primary, #7663a8) 18%,
        transparent
      );
      background: color-mix(
        in srgb,
        var(--md-sys-color-primary, #7663a8) 9%,
        var(--md-sys-color-surface, #fff)
      );
    }
    .plain {
      white-space: pre-wrap;
    }
    .markdown > :first-child {
      margin-top: 0;
    }
    .markdown > :last-child {
      margin-bottom: 0;
    }
    p {
      margin: 0.6em 0;
    }
    h1,
    h2,
    h3 {
      font-size: 1em;
      margin: 1em 0 0.4em;
    }
    ul,
    ol {
      padding-left: 20px;
    }
    li {
      margin: 4px 0;
    }
    pre {
      overflow: auto;
      padding: 12px;
      border-radius: 9px;
      background: var(--md-sys-color-surface-container, #f3f0f8);
      white-space: pre-wrap;
    }
    code {
      font-size: 0.9em;
      background: var(--md-sys-color-surface-container, #f3f0f8);
      border-radius: 4px;
      padding: 1px 4px;
    }
    pre code {
      padding: 0;
    }
    a {
      color: var(--md-sys-color-primary, #655194);
      text-underline-offset: 3px;
    }
    blockquote {
      margin: 12px 0;
      padding-left: 12px;
      border-left: 3px solid #aaa0c4;
    }
    table {
      border-collapse: collapse;
      display: block;
      overflow-x: auto;
      max-width: 100%;
    }
    th,
    td {
      padding: 6px;
      border-bottom: 1px solid #ddd;
      text-align: left;
    }
    .streaming {
      margin-top: 7px;
      display: flex;
      gap: 5px;
      align-items: center;
    }
    .streaming::before {
      content: "";
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #8575c9;
    }
    .activity {
      margin-left: 44px;
      border-left: 2px solid var(--md-sys-color-outline-variant, #e5e1ee);
      padding-left: 12px;
    }
    .activity summary {
      cursor: pointer;
      font-size: 12px;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .activity time {
      margin-left: 8px;
    }
    .activity pre {
      max-height: 220px;
      font-size: 11px;
      overflow-wrap: anywhere;
    }
    @media (max-width: 520px) {
      .message.user {
        margin-left: 10px;
      }
      .bubble {
        padding: 12px;
      }
    }
  `,Xe([t()],tt.prototype,"messageRole",void 0),Xe([t()],tt.prototype,"assistantName",void 0),Xe([t()],tt.prototype,"text",void 0),Xe([t()],tt.prototype,"at",void 0),Xe([t()],tt.prototype,"modelDetails",void 0),Xe([t({type:Boolean})],tt.prototype,"completed",void 0),Xe([t({attribute:!1})],tt.prototype,"sender",void 0),Xe([s()],tt.prototype,"failedAvatar",void 0),tt=Xe([i("yp-live-workflow-message")],tt);var st=function(e,t,s,i){for(var r,a=arguments.length,o=a<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i,n=e.length-1;n>=0;n--)(r=e[n])&&(o=(a<3?r(o):a>3?r(t,s,o):r(t,s))||o);return a>3&&o&&Object.defineProperty(t,s,o),o};let it=class extends r{constructor(){super(...arguments),this.error="",this.busy=!1,this.assistantSettingsPending=!1,this.missing=!1,this.mayCreate=!1,this.tab="graph",this.agentError="",this.agentSaving=!1,this.selectedAssets=[],this.viewedRunId="",this.chat=[],this.approvals=[],this.uploadProgress=0,this.usage=[],this.firecrawlBalances={},this.quota="",this.sampleCount=5,this.targetNodeId="",this.reuseRunId="",this.restartNodeId="",this.connectionGroups=[],this.connectionMessage="",this.cursor=0,this.userChanged=e=>{this.loggedInUser=e.detail??void 0}}get api(){return new u(this.groupId)}get workspace(){return this.snapshot?.workspace}get assistantName(){return this.snapshot?.assistantName??"Workflow Assistant"}get operator(){return this.workspace?.operator?.userId===this.snapshot?.permissions.userId}get run(){return this.snapshot?.runs.find((e=>e.id===(this.viewedRunId||this.workspace?.activeRunId)))}updated(e){e.has("groupId")&&this.groupId&&(this.stream?.close(),this.stream=void 0,this.cursor=0,this.chat=[],this.assistantSettingsPending=!1,this.approvals=[],this.snapshot=void 0,this.usage=[],this.firecrawlBalances={},this.selectedAssets=[],this.viewedRunId="",this.draft=void 0,this.auth=void 0,this.quota="",this.preview=void 0,this.history=void 0,this.comparedRevision=void 0,this.storageInfo=void 0,this.targetNodeId="",this.reuseRunId="",this.restartNodeId="",this.selectedNode=void 0,this.agentEditor=void 0,this.agentError="",this.connectionGroups=[],this.connectionMessage="",clearTimeout(this.refreshTimer),this.refreshTimer=void 0,this.refresh())}connectedCallback(){super.connectedCallback(),this.loggedInUser=window.appUser?.user??void 0,document.addEventListener("yp-logged-in",this.userChanged)}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("yp-logged-in",this.userChanged),this.stream?.close(),this.stream=void 0,clearTimeout(this.refreshTimer),this.refreshTimer=void 0}async refresh(){const e=this.groupId;try{const t=await this.api.request();if(this.groupId!==e)return;if(t.workspace.revision!==this.snapshot?.workspace.revision&&(this.firecrawlBalances={}),this.viewedRunId||!this.snapshot?.workspace.activeRunId||t.workspace.activeRunId||(this.viewedRunId=this.snapshot.workspace.activeRunId),this.snapshot=t,"usage"===this.tab){const t=await this.api.request("/usage");if(this.groupId!==e)return;this.usage=t}this.missing=!1,!this.stream&&this.isConnected&&this.connect()}catch(t){if(this.groupId!==e)return;if(this.error=t instanceof Error?t.message:"Cannot load workflow",this.missing=t instanceof h&&404===t.status,this.missing)try{this.mayCreate=(await this.api.request("/access")).admin}catch{this.mayCreate=!1}}}connect(){this.stream=new EventSource(`${this.api.base}/stream?after=${this.cursor}`),this.stream.onmessage=e=>{try{const t=JSON.parse(e.data);if(t.seq<=this.cursor)return;this.cursor=t.seq,this.event(t)}catch{this.error="A workflow event could not be displayed. Refresh to replay the history."}},this.stream.onerror=()=>{this.error="Live connection interrupted. Reconnecting and replaying saved events…"},this.stream.onopen=()=>{this.error.startsWith("Live connection interrupted")&&(this.error="")}}record(e){return e&&"object"==typeof e&&!Array.isArray(e)?e:{}}event(e){if("asset.deleted"===e.type&&this.forgetAsset(String(e.data.assetId)),["operator.changed","host.restarted","session.closed"].includes(e.type)&&(this.approvals=[]),"chat.user"===e.type){const t=this.record(e.data.assistantSettings);this.chat=[...this.chat,{id:`user:${e.seq}`,role:"user",text:String(e.data.text),userId:"number"==typeof e.data.userId?e.data.userId:void 0,at:e.at,modelDetails:"string"==typeof t.model?`${e.data.steer?"Steering":"Requested"}: ${m(t)}`:void 0}]}if("session.event"===e.type){const t=String(e.data.eventType),s=this.record(e.data.payload),i=this.record(s.item),r=`${e.data.sessionId}:${e.data.itemId??s.itemId??e.data.turnId}`;if("message.delta"===t||"message.completed"===t){const a=String("message.delta"===t?s.delta??"":i.text??s.text??""),o=this.chat.find((e=>e.id===r));this.chat=o?this.chat.map((e=>e.id===r?"message.delta"===t&&e.completed?e:{...e,completed:"message.completed"===t,text:"message.delta"===t?e.text+a:a||e.text}:e)):[...this.chat,{id:r,role:"assistant",text:a,completed:"message.completed"===t,at:e.at}]}else if("quota.updated"===t)this.quota=JSON.stringify(s,null,2);else if("approval.requested"===t){const e=s.requestId;void 0===e||this.approvals.some((t=>t.requestId===e))||(this.approvals=[...this.approvals,{requestId:e,method:String(s.method??"approval"),params:this.record(s.params??s)}])}else"approval.resolved"===t?this.approvals=this.approvals.filter((e=>e.requestId!==s.requestId)):["command.output.delta","file.output.delta","turn.plan.updated","session.error","usage.routing.unavailable"].includes(t)&&(this.chat=[...this.chat,{id:`activity:${e.seq}`,role:"activity",at:e.at,text:`${t}: ${String(s.delta??s.message??JSON.stringify(s))}`}])}this.refreshTimer||(this.refreshTimer=setTimeout((()=>{this.refreshTimer=void 0,this.refresh()}),750))}async action(e){this.busy=!0,this.error="";try{await e(),await this.refresh()}catch(e){this.error=e instanceof Error?e.message:"Workflow operation failed"}finally{this.busy=!1}}async login(){await this.action((async()=>{this.auth=await this.api.request("/account/login","POST",{})}))}async loginApiKey(e){e.preventDefault();const t=e.target;let s=t.elements.namedItem("apiKey").value;t.reset(),await this.action((async()=>{try{await this.api.request("/account/api-key","POST",{apiKey:s}),this.auth=void 0}finally{s=""}}))}async send(e){if(e.preventDefault(),this.assistantSettingsPending)return;const t=e.target,s=String(new FormData(t).get("message")??"");await this.action((async()=>{await this.api.request("/chat","POST",{text:s,steer:"on"===new FormData(t).get("steer")}),t.reset()}))}async upload(e){const t=e.target,s=t.files;s&&await this.action((async()=>{try{for(const e of s){if(e.size>262144e3)throw new Error("Each file must be 250 MiB or smaller");const t=await this.api.upload(e,(e=>{this.uploadProgress=e}));this.selectedAssets=[...this.selectedAssets,t.id]}}finally{this.uploadProgress=0,t.value=""}}))}async draftRun(e){await this.action((async()=>{const t=await this.api.request("/runs","POST",{mode:e,assetIds:this.selectedAssets,sampleCount:this.sampleCount,...this.targetNodeId?{targetNodeId:this.targetNodeId}:{},...this.reuseRunId?{reuse:{runId:this.reuseRunId,fromNodeId:this.restartNodeId}}:{}});"trial"===e?(await this.api.request(`/runs/${t.id}/start`,"POST",{}),this.viewedRunId=t.id):this.draft=t}))}async approve(e){e.preventDefault();const t=Math.round(1e6*Number(new FormData(e.target).get("cap")));await this.action((async()=>{await this.api.request(`/runs/${this.draft.id}/start`,"POST",{budgetMicros:t}),this.viewedRunId=this.draft.id,this.draft=void 0}))}async openAgentSettings(e,t=this.run){const s=t?.graph??this.workspace?.graph;if(!s?.nodes.some((t=>t.id===e&&"agent"===t.kind)))return;this.selectedNode=e,this.agentError="",this.agentEditor={nodeId:e,graph:structuredClone(s),revision:t?.revision??this.workspace.revision,runId:t?.id},await this.updateComplete;const i=this.renderRoot.querySelector(".agent-dialog");i&&!i.open&&i.showModal()}closeAgentSettings(){this.renderRoot.querySelector(".agent-dialog")?.close()}async agentDialogClosed(){const e=this.agentEditor?.nodeId;this.agentEditor=void 0,this.agentError="",await this.updateComplete,e&&this.renderRoot.querySelector("yp-live-workflow-graph")?.shadowRoot?.querySelector(`[model-id="${CSS.escape(e)}"]`)?.focus()}editAgentDraft(){const e=this.agentEditor?.nodeId;e&&(this.viewedRunId="draft",this.draft=void 0,this.openAgentSettings(e))}async saveNode(e){e.preventDefault();const t=this.agentEditor;if(!t||t.runId||!this.operator||this.agentSaving)return;const s=new FormData(e.target),i=structuredClone(t.graph),r=i.nodes.find((e=>e.id===t.nodeId));this.agentSaving=!0,this.agentError="";try{r.enabled="on"===s.get("enabled"),r.models=Object.fromEntries(w(r,this.snapshot?.modelRoles??["default","review"]).map((e=>[e,String(s.get(`agent-model:${e}`)??"")])).filter((([,e])=>e))),r.configuration=JSON.parse(String(s.get("configuration")??"{}"));const e=String(s.get("reasoningEffort")??"");e?r.reasoningEffort=e:delete r.reasoningEffort;for(const t of Object.values(r.models)){const s=this.snapshot.models.find((e=>e.id===t));if(!s)throw new Error(`Model ${t} is no longer available. Choose an available model.`);if(e&&("openai"!==s.provider||!s.reasoning))throw new Error("Choose Use model default for reasoning effort, or select OpenAI reasoning models for every role.")}const a=String(s.get("nodeCap")??"");a?r.budgetMicros=Math.round(1e6*Number(a)):delete r.budgetMicros;const o=s.get("recordCap");o?r.recordBudgetMicros=Math.round(1e6*Number(o)):delete r.recordBudgetMicros,"normalize"===r.id&&(r.configuration.fields={name:String(s.get("nameColumn")||"name"),text:String(s.get("textColumn")||"text")}),await this.api.request("/graph","PUT",{graph:i,revision:t.revision}),this.draft=void 0,await this.refresh(),this.closeAgentSettings()}catch(e){this.agentError=e instanceof Error?e.message:"Could not save agent settings"}finally{this.agentSaving=!1}}async bindConnector(e){e.preventDefault();const t=e.target,s=new FormData(t);await this.action((async()=>{await this.api.request("/connectors","POST",{binding:{id:String(s.get("id")),label:String(s.get("label")),kind:String(s.get("kind")),resourceId:String(s.get("resource")),writeEnabled:"on"===s.get("write"),settings:JSON.parse(String(s.get("settings")||"{}"))},credential:JSON.parse(String(s.get("credential")||"{}"))}),t.reset()}))}async previewAsset(e){const t=this.groupId;this.preview=void 0,await this.action((async()=>{const s=await this.api.request(`/assets/${e.id}/preview`);this.groupId===t&&(this.preview={assetId:e.id,name:e.name,inputCount:s.inputCount,rows:s.preview})}))}forgetAsset(e){this.selectedAssets=this.selectedAssets.filter((t=>t!==e)),this.preview?.assetId===e&&(this.preview=void 0)}async deleteAsset(e){await this.action((async()=>{await this.api.request(`/assets/${e.id}`,"DELETE"),this.forgetAsset(e.id)}))}async connectGroup(e){e.preventDefault();const t=new FormData(e.target),s=String(t.get("group")),i=this.connectionGroups.find((e=>String(e.id)===s));i&&await this.action((()=>this.api.request("/connectors","POST",{binding:{id:`group-${s}`,kind:"your-priorities",label:i.name,resourceId:s,writeEnabled:"on"===t.get("write"),settings:{}},credential:{}})))}async reconcile(e,t){e.preventDefault();const s=new FormData(e.target);await this.action((async()=>{await this.api.request(`/usage/${t}/reconcile`,"POST",{actualMicros:Math.round(1e6*Number(s.get("cost"))),result:JSON.parse(String(s.get("result")??"null")),note:String(s.get("note"))}),this.usage=await this.api.request("/usage")}))}async respond(e,t){await this.action((async()=>{await this.api.request("/session/approval","POST",{requestId:e.requestId,...t?{result:{decision:"accept"}}:{error:{code:-32e3,message:"Declined by the operator"}}}),this.approvals=this.approvals.filter((t=>t!==e))}))}async answer(e,t){e.preventDefault();const s=new FormData(e.target),i=Array.isArray(t.params.questions)?t.params.questions.map((e=>this.record(e))):[];await this.action((async()=>{const e=Object.fromEntries(i.map((e=>[String(e.id),{answers:[String(s.get(String(e.id))??"")]}])));await this.api.request("/session/approval","POST",{requestId:t.requestId,result:{answers:e}}),this.approvals=this.approvals.filter((e=>e!==t))}))}renderApproval(e){return"item/tool/requestUserInput"===e.method&&Array.isArray(e.params.questions)?a`<form
        class="approval"
        @submit=${t=>this.answer(t,e)}
      >
        <strong>${this.assistantName} needs your input</strong
        >${e.params.questions.map((e=>{const t=this.record(e);return a`<label
            >${String(t.question??t.header??"")}<input
              name=${String(t.id)}
              required
              list=${`choices-${t.id}`}
            /><datalist id=${`choices-${t.id}`}>
              ${(Array.isArray(t.options)?t.options:[]).map((e=>a`<option value=${String(this.record(e).label??"")}>
                    ${String(this.record(e).description??"")}
                  </option>`))}
            </datalist></label
          >`}))}<button ?disabled=${!this.operator||this.busy}>
          Send answers
        </button>
      </form>`:a`<div class="approval">
      <strong>${this.assistantName} requests approval</strong>
      <pre>${JSON.stringify(e.params,null,2)}</pre>
      <div class="toolbar">
        <button
          ?disabled=${!this.operator||this.busy}
          @click=${()=>this.respond(e,!0)}
        >
          Approve</button
        ><button
          ?disabled=${!this.operator||this.busy}
          @click=${()=>this.respond(e,!1)}
        >
          Decline
        </button>
      </div>
    </div>`}async resume(e,t){e.preventDefault();const s=new FormData(e.target),i=Math.round(1e6*Number(s.get("cap"))),r=Object.fromEntries(t.nodeIds.flatMap((e=>{const t=s.get(`node:${e}`);return t?[[e,Math.round(1e6*Number(t))]]:[]}))),a=Object.fromEntries(t.nodeIds.flatMap((e=>{const t=s.get(`record:${e}`);return t?[[e,Math.round(1e6*Number(t))]]:[]})));await this.action((()=>this.api.request(`/runs/${t.id}/resume`,"POST",{budgetMicros:i,nodeBudgets:r,nodeRecordBudgets:a})))}render(){if(this.missing)return a`<section class="panel">
        <h2>Live workflow setup</h2>
        ${this.mayCreate?a`<yp-live-workflow-admin
              .groupId=${this.groupId}
              @workflow-updated=${()=>{this.error="",this.refresh()}}
            ></yp-live-workflow-admin>`:a`<p>A group administrator needs to set up this workflow.</p>`}
      </section>`;if(!this.snapshot)return this.error?a`<p class="error" role="alert">${this.error}</p>
            <button @click=${()=>this.refresh()}>Retry</button>`:a`<p>Loading live workflow…</p>`;const e=this.workspace,t=this.snapshot.permissions;return a` <div class="header">
        <div>
          <h2>
            ${"skills-first"===e.config.packageId?"Skills First":e.config.packageId}
            · Live workflow
          </h2>
          <div class="muted">
            Draft revision ${e.revision} ·
            ${e.operator?`Operator #${e.operator.userId}`:"No active operator"}
          </div>
        </div>
        <div class="cost">
          ${p(e.spentMicros)} spent + ${p(e.reservedMicros)}
          reserved / ${p(e.config.budgetMicros)}
        </div>
        <div class="toolbar">
          ${t.operate?a`<button
                ?disabled=${this.busy||this.operator}
                @click=${()=>this.action((()=>this.api.request("/operator","POST",{takeover:Boolean(e.operator)})))}
              >
                ${e.operator&&!this.operator?`Take over and stop the current ${this.assistantName} session`:"Take operator control"}
              </button>`:o}
        </div>
      </div>
      ${this.error?a`<p class="error" role="alert">${this.error}</p>`:o}
      <div class="layout">
        <section class="panel chat">
          <div class="chat-heading">
            <span class="codex-mark" aria-hidden="true">&lt;/&gt;</span>
            <div>
              <h3>Talk with ${this.assistantName}</h3>
              <p>Plan, build, and run your workflow.</p>
            </div>
          </div>
          ${t.operate?a`<div class="toolbar">
                <button ?disabled=${this.busy} @click=${this.login}>
                  ${this.snapshot.chatgptConnected?"Reconnect ChatGPT":"Connect ChatGPT"}</button
                >${this.snapshot.codexAuthMode?a`<button
                      ?disabled=${this.busy}
                      @click=${()=>this.action((()=>this.api.request("/account","DELETE")))}
                    >
                      Disconnect
                    </button>`:o}
              </div>`:o}
          ${t.operate?a` <p
                  role="status"
                  class="connection-status"
                  ?data-connected=${Boolean(this.snapshot.codexAuthMode)}
                >
                  ${"api-key"===this.snapshot.codexAuthMode?"OpenAI API key connected":"chatgpt"===this.snapshot.codexAuthMode?"ChatGPT connected":`Connect ChatGPT or an OpenAI API key to talk with ${this.assistantName}.`}
                </p>
                <details class="auth">
                  <summary>Use an OpenAI API key</summary>
                  <p>
                    Assistant usage is billed to your OpenAI API account.
                    Processing agents use the workflow's configured provider
                    credentials.
                  </p>
                  <form @submit=${this.loginApiKey}>
                    <label
                      >OpenAI API key<input
                        name="apiKey"
                        type="password"
                        required
                        minlength="20"
                        maxlength="512"
                        autocomplete="off"
                        spellcheck="false"
                        ?disabled=${this.busy||Boolean(this.auth)}
                    /></label>
                    <button ?disabled=${this.busy||Boolean(this.auth)}>
                      Connect API key
                    </button>
                  </form>
                </details>`:o}
          ${this.auth?a`<div class="auth">
                <p>
                  <a
                    href=${this.auth.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    >Sign in with ChatGPT</a
                  >
                  and enter:
                </p>
                <code>${this.auth.userCode}</code>
                <div class="toolbar">
                  <button
                    @click=${()=>navigator.clipboard.writeText(this.auth.userCode)}
                  >
                    Copy code</button
                  ><button
                    ?disabled=${this.busy}
                    @click=${()=>this.action((async()=>{await this.api.request("/account/complete","POST",{}),this.auth=void 0}))}
                  >
                    I have signed in</button
                  ><button
                    ?disabled=${this.busy}
                    @click=${()=>this.action((async()=>{await this.api.request("/account","DELETE"),this.auth=void 0}))}
                  >
                    Cancel login
                  </button>
                </div>
              </div>`:o}
          <div class="history" role="log" aria-live="polite">
            ${this.chat.length?this.chat.map((e=>a`<yp-live-workflow-message
                      .messageRole=${e.role}
                      .assistantName=${this.assistantName}
                      .text=${e.text}
                      .at=${e.at}
                      .modelDetails=${e.modelDetails}
                      .completed=${Boolean(e.completed)}
                      .sender=${e.userId===this.loggedInUser?.id?this.loggedInUser:void 0}
                    ></yp-live-workflow-message>`)):a`<p class="empty">
                  Describe the experiment you want to run. ${this.assistantName}
                  can inspect data, improve agents, and update the workflow
                  diagram.
                </p>`}
          </div>
          ${this.approvals.map((e=>this.renderApproval(e)))}
          <yp-live-workflow-assistant-settings
            .groupId=${this.groupId}
            .settings=${{model:e.config.codexModel,reasoningEffort:e.config.codexReasoningEffort,serviceTier:e.config.codexServiceTier??"regular"}}
            .session=${this.snapshot.assistantSession}
            .canEdit=${t.operate&&this.operator}
            .connected=${Boolean(this.snapshot.codexAuthMode)}
            @assistant-settings-pending=${e=>{this.assistantSettingsPending=e.detail}}
            @workflow-updated=${t=>{t.detail&&(e.config={...e.config,codexModel:t.detail.model,codexReasoningEffort:t.detail.reasoningEffort,codexServiceTier:t.detail.serviceTier}),this.refresh()}}
          ></yp-live-workflow-assistant-settings>
          <form class="composer" @submit=${this.send}>
            <label
              >Message ${this.assistantName}<textarea
                name="message"
                required
                ?disabled=${!this.operator||!this.snapshot.codexAuthMode}
                placeholder="Inspect the uploaded job descriptions and propose a Skills First trial…"
              ></textarea>
            </label>
            <div class="toolbar">
              <button
                class="primary"
                ?disabled=${this.busy||this.assistantSettingsPending||!this.operator||!this.snapshot.codexAuthMode}
              >
                Send</button
              ><label class="inline"
                ><input type="checkbox" name="steer" />Steer current turn</label
              ><button
                type="button"
                ?disabled=${!this.operator||this.busy}
                @click=${()=>this.action((()=>this.api.request("/session/interrupt","POST",{})))}
              >
                Interrupt
              </button>
              <button
                type="button"
                ?disabled=${!this.operator||this.busy||!this.workspace?.sessionId}
                @click=${()=>this.action((()=>this.api.request("/session/terminate","POST",{})))}
              >
                Restart ${this.assistantName} session
              </button>
            </div>
          </form>
          ${"chatgpt"===this.snapshot.codexAuthMode?a`<details>
                <summary>ChatGPT plan usage</summary>
                <p class="muted">
                  ChatGPT quotas are separate from processing API charges.
                </p>
                <pre>
${this.quota||`Quota information appears when reported by ${this.assistantName}.`}</pre
                >
              </details>`:o}
        </section>
        <section class="panel">
          <nav class="tabs" aria-label="Workflow views">
            ${["graph","data","results","usage","settings"].filter((e=>"settings"!==e||t.admin)).map((e=>a`<button
                    aria-selected=${this.tab===e}
                    @click=${()=>{this.tab=e,"usage"===e&&this.action((async()=>{this.usage=await this.api.request("/usage")}))}}
                  >
                    ${{graph:"Agents",data:"Data",results:"Results",usage:"Usage",settings:"Settings"}[e]}
                  </button>`))}
          </nav>
          ${"graph"===this.tab?this.renderGraph():"data"===this.tab?this.renderData():"results"===this.tab?a`<yp-live-workflow-results
                    .groupId=${this.groupId}
                    .runs=${this.snapshot.runs}
                    .runId=${this.run?.id??""}
                    @workflow-run-selected=${e=>{this.viewedRunId=e.detail}}
                    .revision=${this.snapshot.workspace.nextEvent}
                  ></yp-live-workflow-results>`:"usage"===this.tab?this.renderUsage():a`<yp-live-workflow-admin
                        .groupId=${this.groupId}
                        @workflow-updated=${()=>this.refresh()}
                      ></yp-live-workflow-admin
                      >${this.renderStorage()}`}
          ${this.renderRuns()}
        </section>
      </div>
      ${this.renderAgentDialog()}`}renderGraph(){const e=(this.run?.graph??this.workspace?.graph)?.nodes.find((e=>e.id===this.selectedNode));return a` <div class="toolbar">
        <label
          >Display<select
            .value=${this.viewedRunId}
            @change=${e=>{this.viewedRunId=e.target.value,this.draft="awaiting_approval"===this.run?.status?this.run:void 0}}
          >
            <option value="" ?selected=${!this.viewedRunId}>
              ${this.workspace?.activeRunId?"Active run":"Current draft"}
            </option>
            <option value="draft" ?selected=${"draft"===this.viewedRunId}>
              Current draft
            </option>
            ${this.snapshot.runs.map((e=>a`<option
                  value=${e.id}
                  ?selected=${this.viewedRunId===e.id}
                >
                  ${e.mode} · ${e.status} · ${e.createdAt.slice(0,16)}
                </option>`))}
          </select></label
        ><button
          ?disabled=${this.busy||!this.operator}
          @click=${()=>this.action((()=>this.api.request("/validate","POST",{})))}
        >
          Validate ${this.assistantName} changes
        </button>
      </div>
      <yp-live-workflow-graph
        .graph=${this.run?.graph??this.workspace.graph}
        .run=${this.run}
        .selectedNode=${this.selectedNode}
        @select-node=${e=>{this.selectedNode=e.detail.id,e.detail.configure&&e.detail.id&&this.openAgentSettings(e.detail.id)}}
      ></yp-live-workflow-graph>
      ${"agent"===e?.kind?a`<div class="agent-selection">
            <strong>${e.label}</strong
            ><button @click=${()=>this.openAgentSettings(e.id)}>
              Models &amp; settings
            </button>
          </div>`:o}
      ${this.renderHistory()}`}renderAgentDialog(){const e=this.agentEditor;if(!e||!this.snapshot)return o;const t=e.graph.nodes.find((t=>t.id===e.nodeId)),s=this.snapshot.runs.find((t=>t.id===e.runId)),i=s?.nodeRecordBudgets?.[t.id]??t.recordBudgetMicros,r=e.runId?s?.modelCatalog??[]:this.snapshot.models,n=Boolean(e.runId)||!this.operator,l=!e.runId&&e.revision!==this.workspace.revision;return a`<dialog
      class="agent-dialog"
      aria-labelledby="agent-dialog-title"
      @close=${this.agentDialogClosed}
      @cancel=${e=>{e.preventDefault(),this.agentSaving||this.closeAgentSettings()}}
    >
      ${c(e,a`
          <header>
            <div>
              <h2 id="agent-dialog-title">${t.label}</h2>
              <span class="muted"
                >Models &amp; settings ·
                ${e.runId?`Saved run · revision ${e.revision}`:`Current draft · revision ${e.revision}`}</span
              >
            </div>
            <button
              type="button"
              aria-label="Close agent settings"
              ?disabled=${this.agentSaving}
              @click=${this.closeAgentSettings}
            >
              ✕
            </button>
          </header>
          ${e.runId?a`<div class="notice">
                <p>
                  This run keeps its original models and reasoning settings.
                  Changes to the draft apply to future runs.
                </p>
                ${this.operator&&this.workspace.graph.nodes.some((e=>e.id===t.id))?a`<button type="button" @click=${this.editAgentDraft}>
                      Edit current draft
                    </button>`:o}
              </div>`:a`<p class="notice">
                Choose models for this agent’s next run. Other agents and the
                chat assistant keep their own model settings. Model changes
                require a new trial before bulk approval.
              </p>`}
          ${this.operator?o:a`<p class="notice">
                ${this.snapshot.permissions.operate?"Take operator control to change models.":"You can review this agent’s settings and model history."}
              </p>`}
          ${l?a`<p class="error" role="alert">
                The draft changed while this window was open. Reload the current
                draft before saving.
                <button type="button" @click=${this.editAgentDraft}>
                  Reload current draft
                </button>
              </p>`:o}
          ${this.agentError?a`<p class="error" role="alert">${this.agentError}</p>`:o}
          <form @submit=${this.saveNode}>
            <fieldset ?disabled=${n||this.agentSaving}>
              <div class="row">
                ${w(t,this.snapshot.modelRoles??["default","review"]).map((s=>{const i=t.models[s]??"",n=r.find((e=>e.id===(i||t.models.default)));return a`<div>
                    <label
                      >${x(s)} model
                      <select
                        name=${`agent-model:${s}`}
                        .value=${i}
                        @change=${e=>this.modelChoiceChanged(e,s)}
                      >
                        <option value="" ?selected=${!i}>
                          ${"default"===s?"No model selected":"Use processing model"}
                        </option>
                        ${i&&!r.some((e=>e.id===i))?a`<option value=${i} selected>
                              ${i}
                              (${e.runId?"saved model":"unavailable"})
                            </option>`:o}
                        ${r.map((e=>a`<option
                              value=${e.id}
                              ?selected=${i===e.id}
                            >
                              ${e.label} · ${e.id}
                            </option>`))}
                      </select></label
                    >
                    <span class="model-note"
                      >${$(t,n)}${i||"default"===s?"":" · uses processing model"}</span
                    >
                    ${n?a`<span class="model-note"
                          >${p(n.inputMicrosPerMillion)} input /
                          ${p(n.outputMicrosPerMillion)} output per 1M
                          tokens${n.inferenceType?` · ${n.inferenceType}`:""}</span
                        >`:o}
                  </div>`}))}
              </div>
              <label
                >Agent reasoning effort<select
                  name="reasoningEffort"
                  .value=${t.reasoningEffort??""}
                  @change=${e=>{const s=e.target.value;s?t.reasoningEffort=s:delete t.reasoningEffort,this.requestUpdate()}}
                >
                  <option value="" ?selected=${!t.reasoningEffort}>
                    Use model default
                  </option>
                  ${["low","medium","high","xhigh","max"].map((e=>a`<option
                        value=${e}
                        ?selected=${t.reasoningEffort===e}
                      >
                        ${e}
                      </option>`))}
                </select></label
              >
              <small
                >Reasoning overrides apply to every role and require OpenAI
                reasoning models. Review and other roles use the processing
                model unless you choose an override. Only roles requested by the
                agent make model calls.</small
              >
              <label
                >Agent spending cap (USD, optional)<input
                  name="nodeCap"
                  type="number"
                  min="0.01"
                  step="0.01"
                  .value=${void 0===t.budgetMicros?"":String(t.budgetMicros/1e6)}
              /></label>
              <label
                >Per-parent record cap (USD, optional)<input
                  name="recordCap"
                  type="number"
                  min="0.01"
                  step="0.01"
                  .value=${void 0===i?"":String(i/1e6)}
              /></label>
              <p class="muted">
                Includes model and connector requests, with outstanding
                reservations. Applies to future runs.
              </p>
              <details>
                <summary>Agent configuration</summary>
                ${t.description?a`<p>${t.description}</p>`:o}
                <label class="inline"
                  ><input
                    name="enabled"
                    type="checkbox"
                    .checked=${t.enabled}
                  />Enabled</label
                >
                ${t.enabled?o:a`<p class="muted">
                      Enabling a disconnected template agent restores its
                      template connections when the path is unambiguous. Custom
                      paths need a graph edit.
                    </p>`}
                ${"normalize"===t.id?a`<div class="row">
                      <label
                        >Title column<input
                          name="nameColumn"
                          .value=${String(this.record(t.configuration.fields).name??"name")} /></label
                      ><label
                        >Description column<input
                          name="textColumn"
                          .value=${String(this.record(t.configuration.fields).text??"text")}
                      /></label>
                    </div>`:o}
                <label
                  >Agent settings (JSON)<textarea
                    name="configuration"
                    .value=${JSON.stringify(t.configuration,null,2)}
                  ></textarea>
                </label>
              </details>
            </fieldset>
            ${n?o:a`<div class="dialog-actions">
                  <button
                    type="button"
                    ?disabled=${this.agentSaving}
                    @click=${this.closeAgentSettings}
                  >
                    Cancel</button
                  ><button
                    class="primary"
                    ?disabled=${this.agentSaving||l}
                  >
                    ${this.agentSaving?"Saving…":"Save agent settings"}
                  </button>
                </div>`}
          </form>
          ${s?.nodeCosts?.[t.id]?a`<p>
                ${p(s.nodeCosts[t.id].spentMicros)} settled ·
                ${p(s.nodeCosts[t.id].reservedMicros)} reserved ·
                ${s.nodeCosts[t.id].requests} requests
              </p>`:o}
          ${s?.nodeStates[t.id]?.failedRecords?a`<p class="error">
                ${s.nodeStates[t.id].failedRecords} records need review.
              </p>`:o}
          ${this.renderAgentModelHistory(t.id)}
        `)}
    </dialog>`}modelChoiceChanged(e,t){const s=this.agentEditor.graph.nodes.find((e=>e.id===this.agentEditor.nodeId)),i=e.target.value;i?s.models[t]=i:delete s.models[t],this.requestUpdate()}renderAgentModelHistory(e){const t=this.snapshot.runs.filter((t=>t.nodeIds.includes(e))).slice().sort(((e,t)=>t.createdAt.localeCompare(e.createdAt)));return a`<section aria-label="Model history">
      <h3>Model history</h3>
      <p class="muted">
        Saved selections for this agent in each run. Other roles inherit the
        processing model unless an override is listed.
      </p>
      ${t.length?a`<div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">Run</th>
                  <th scope="col">Models &amp; reasoning</th>
                  <th scope="col">Agent cost</th>
                </tr>
              </thead>
              <tbody>
                ${t.map((t=>{const s=t.graph.nodes.find((t=>t.id===e));if(!s)return o;const i=t.nodeBudgets?.[e]??s.budgetMicros;return a`<tr>
                    <td>
                      <button
                        type="button"
                        class="history-run"
                        ?disabled=${this.agentSaving}
                        aria-current=${t.id===this.agentEditor?.runId?"true":"false"}
                        @click=${()=>{this.viewedRunId=t.id,this.openAgentSettings(e,t)}}
                      >
                        ${t.mode} · ${t.id.slice(0,8)}</button
                      ><small>${new Date(t.createdAt).toLocaleString()}</small
                      ><small>Revision ${t.revision} · ${t.status}</small>
                    </td>
                    <td>
                      ${Object.entries(s.models).length?Object.entries(s.models).map((([e,i])=>{const r=t.modelCatalog?.find((e=>e.id===i));return a`<div class="model-role">
                              <strong>${x(e)}</strong>:
                              ${i}<small>${$(s,r)}</small>${r?a`<small
                                    >${p(r.inputMicrosPerMillion)} in
                                    / ${p(r.outputMicrosPerMillion)}
                                    out per 1M · ${r.priceVersion}</small
                                  >`:o}
                            </div>`})):"No model selected"}
                    </td>
                    <td>
                      ${t.reuse?.nodeIds.includes(e)?a`${p(0)} new<small
                              >Reused from
                              ${(t.stageOutputs?.[e]?.originRunId??t.reuse.runId).slice(0,8)}</small
                            >`:t.nodeCosts?.[e]?p(t.nodeCosts[e].spentMicros):"Not recorded"}${i?a`<small>Cap ${p(i)}</small>`:o}
                      ${void 0!==(t.nodeRecordBudgets?.[e]??s.recordBudgetMicros)?a`<small
                            >Per parent
                            ${p(t.nodeRecordBudgets?.[e]??s.recordBudgetMicros)}</small
                          >`:o}
                    </td>
                  </tr>`}))}
              </tbody>
            </table>
          </div>`:a`<p>No saved runs for this agent yet.</p>`}
    </section>`}async compareRevision(e){const t=this.groupId;await this.action((async()=>{const s=await this.api.request(`/revisions/${e}`),i=this.history?.currentHash?await this.api.request(`/revisions/${this.history.currentHash}`):{files:{}};this.groupId===t&&(this.comparedRevision={hash:e,files:s.files,currentFiles:i.files})}))}renderHistory(){const e=this.comparedRevision,t=e?[...new Set([...Object.keys(e.files),...Object.keys(e.currentFiles)])].filter((t=>e.files[t]!==e.currentFiles[t])).sort():[];return a`<details>
      <summary>Package revision history</summary>
      <p>
        Validate ${this.assistantName} changes to save a revision. Comparisons
        use the last validated draft.
      </p>
      <button
        ?disabled=${this.busy}
        @click=${()=>this.action((async()=>{this.history=await this.api.request("/revisions")}))}
      >
        Load saved revisions
      </button>
      ${this.history?.revisions.map((e=>a`<p>
            ${e.at.slice(0,16)} · ${e.agents} agents ·
            ${e.hash.slice(0,10)}
            <button
              ?disabled=${this.busy}
              @click=${()=>this.compareRevision(e.hash)}
            >
              Inspect revision
            </button>
          </p>`))}
      ${e?a`<h4>Revision ${e.hash.slice(0,10)}</h4>
            <p>${t.length} files differ from the last validated draft.</p>
            ${t.map((t=>a`<details>
                  <summary>${t}</summary>
                  <h5>Selected revision</h5>
                  <pre>${e.files[t]??"File absent"}</pre>
                  <h5>Last validated draft</h5>
                  <pre>${e.currentFiles[t]??"File absent"}</pre>
                </details>`))}
            <details>
              <summary>All files in selected revision</summary>
              ${Object.entries(e.files).map((([e,t])=>a`<details>
                    <summary>${e}</summary>
                    <pre>${t}</pre>
                  </details>`))}
            </details>
            <p>
              Restore requires an idle assistant and no active run. The current
              draft is retained as a VM backup. New runs require a fresh trial.
            </p>
            <button
              ?disabled=${this.busy||!this.operator||Boolean(this.workspace?.activeRunId)}
              @click=${()=>this.action((async()=>{await this.api.request(`/revisions/${e.hash}/restore`,"POST",{revision:this.workspace.revision}),this.history=await this.api.request("/revisions"),this.comparedRevision=void 0,this.viewedRunId="draft",this.draft=void 0}))}
            >
              Restore this revision and retain draft backup
            </button>`:o}
    </details>`}renderStorage(){return a`<details>
      <summary>VM storage</summary>
      <button
        ?disabled=${this.busy}
        @click=${()=>this.action((async()=>{this.storageInfo=await this.api.request("/storage")}))}
      >
        Check host disk space
      </button>
      ${this.storageInfo?a`<p>
              ${(this.storageInfo.availableBytes/1024**3).toFixed(1)} GiB
              available ·
              ${(this.storageInfo.minimumFreeBytes/1024**3).toFixed(1)} GiB
              required before starting work.
            </p>
            <p>
              ${this.storageInfo.eligibleRuns} finished runs have VM snapshots
              eligible for cleanup after 30 days. Uploaded data, exported
              results and audit history are retained.
            </p>
            <button
              ?disabled=${this.busy||!this.storageInfo.eligibleRuns}
              @click=${()=>this.action((async()=>{this.storageInfo=await this.api.request("/storage/prune","POST",{})}))}
            >
              Remove up to 100 old run snapshots
            </button>`:o}
    </details>`}renderData(){return a` <h3>Private workspace data</h3>
      <p class="muted">
        ${(this.workspace.storedBytes/1048576).toFixed(1)} MiB used ·
        ${(this.workspace.config.quotaBytes/1024**3).toFixed(1)} GiB quota.
        Uploads create immutable file versions.
      </p>
      <label
        >Upload documents or tables (250 MiB per file)<input
          type="file"
          multiple
          accept=".json,.csv,.tsv,.txt,.md,.html,.pdf,.docx"
          ?disabled=${!this.operator||this.busy}
          @change=${this.upload} /></label
      >${this.uploadProgress?a`<progress .value=${this.uploadProgress} max="1"></progress>`:o}
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Use</th>
              <th>File</th>
              <th>Version</th>
              <th>Size</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${this.snapshot.assets.filter((e=>!e.stagePart)).map((e=>a`<tr>
                  <td>
                    <input
                      aria-label=${`Select ${e.name}`}
                      type="checkbox"
                      .checked=${this.selectedAssets.includes(e.id)}
                      @change=${t=>{this.selectedAssets=t.target.checked?[...this.selectedAssets,e.id]:this.selectedAssets.filter((t=>t!==e.id))}}
                    />
                  </td>
                  <td>
                    <a href=${`${this.api.base}/assets/${e.id}`} download
                      >${e.name}</a
                    >
                    <div class="muted">${e.source}</div>
                  </td>
                  <td>${e.version}</td>
                  <td>${(e.bytes/1024).toFixed(1)} KiB</td>
                  <td>
                    <button
                      ?disabled=${!this.operator||this.busy}
                      @click=${()=>this.deleteAsset(e)}
                    >
                      Delete
                    </button>
                    <button
                      ?disabled=${this.busy}
                      @click=${()=>this.previewAsset(e)}
                    >
                      Preview
                    </button>
                  </td>
                </tr>`))}
          </tbody>
        </table>
      </div>
      <details>
        <summary>
          Saved agent outputs
          (${this.snapshot.assets.filter((e=>e.stagePart)).length}
          parts)
        </summary>
        <p class="muted">
          These snapshots allow completed analysis to be reused. Removing a part
          prevents reuse of that stage; existing final downloads remain
          available.
        </p>
        ${this.snapshot.assets.filter((e=>e.stagePart)).map((e=>a`<div class="row">
              <a href=${`${this.api.base}/assets/${e.id}`} download
                >${e.stagePart.nodeId} ·
                ${e.stagePart.runId.slice(0,8)} · part
                ${e.stagePart.part+1}/${e.stagePart.parts}</a
              >
              <span>${(e.bytes/1024).toFixed(1)} KiB</span>
              <button
                ?disabled=${!this.operator||this.busy}
                @click=${()=>this.deleteAsset(e)}
              >
                Delete snapshot part
              </button>
            </div>`))}
      </details>
      ${this.preview?a`<section class="inspector">
            <h3>${this.preview.name}</h3>
            <p>
              ${this.preview.inputCount} records · preview shows up to 20
              records with shortened long fields.
            </p>
            ${this.preview.rows.map((e=>a`<details>
                  <summary>
                    ${String(e.name??e.title??e.id??"Record")} ·
                    ${String(e.status??"input")}
                  </summary>
                  ${e.text||e.description?a`<h4>Original</h4>
                        <pre>${String(e.text??e.description)}</pre>`:o}
                  ${e.rewrittenText?a`<h4>Proposed rewrite</h4>
                        <pre>${String(e.rewrittenText)}</pre>`:o}
                  ${e.citations?a`<h4>Evidence</h4>
                        <pre>${JSON.stringify(e.citations,null,2)}</pre>`:o}
                  ${e.errors?a`<h4>Review notes</h4>
                        <pre>${JSON.stringify(e.errors,null,2)}</pre>`:o}
                  <details>
                    <summary>All fields</summary>
                    <pre>${JSON.stringify(e,null,2)}</pre>
                  </details>
                </details>`))}
          </section>`:o}
      <h3 style="margin-top:24px">Data connections</h3>
      ${(this.snapshot.connectionProposals??[]).filter((e=>"pending"===e.status)).map((e=>a` <section class="panel">
              <h4>Proposed connection: ${e.binding.label}</h4>
              <p>${e.purpose}</p>
              <p>
                ${e.binding.kind} · ${e.binding.resourceId} ·
                ${e.binding.writeEnabled?"Read and approved exports":"Read only"}
              </p>
              <details>
                <summary>Connection settings</summary>
                <pre>${JSON.stringify(e.binding,null,2)}</pre>
              </details>
              ${this.snapshot.permissions.admin?a` <form
                    @submit=${t=>{t.preventDefault();const s=t.target;this.action((async()=>{const t=JSON.parse(String(new FormData(s).get("credential")||"{}"));await this.api.request(`/connection-proposals/${e.id}/approve`,"POST",{credential:t}),s.reset()}))}}
                  >
                    ${"your-priorities"!==e.binding.kind?a`
                          <label
                            >Credentials (JSON, encrypted)<textarea
                              name="credential"
                              required
                              autocomplete="off"
                              placeholder='Google service account JSON, or {"apiKey":"…"} for Firecrawl'
                            ></textarea>
                          </label>
                          <p class="muted">
                            Credentials are stored by the server.
                            ${this.assistantName} does not receive them.
                            ${"firecrawl"===e.binding.kind?"Verify the configured credit price and request limit before approving.":"Share the Google file with the service account first."}
                          </p>
                        `:o}
                    <button ?disabled=${this.busy}>Approve connection</button>
                    <button
                      type="button"
                      ?disabled=${this.busy}
                      @click=${()=>this.action((()=>this.api.request(`/connection-proposals/${e.id}/reject`,"POST",{})))}
                    >
                      Reject
                    </button>
                  </form>`:a`<p>Waiting for an administrator to review.</p>`}
            </section>`))}
      ${this.snapshot.permissions.admin?a`<details>
            <summary>Connect a Your Priorities group</summary>
            <form
              @submit=${e=>{e.preventDefault();const t=String(new FormData(e.target).get("search")??"");this.action((async()=>{this.connectionGroups=await this.api.request(`/connection-groups?q=${encodeURIComponent(t)}`)}))}}
            >
              <label>Group name<input name="search" /></label
              ><button ?disabled=${this.busy}>Find accessible groups</button>
            </form>
            ${this.connectionGroups.length?a`<form @submit=${this.connectGroup}>
                  <label
                    >Group<select name="group" aria-label="Group">
                      ${this.connectionGroups.map((e=>a`<option value=${e.id}>
                            ${e.name}
                          </option>`))}
                    </select></label
                  >
                  <label class="inline"
                    ><input type="checkbox" name="write" />Allow approved
                    exports (requires group administration)</label
                  >
                  <button ?disabled=${this.busy}>Connect group</button>
                </form>`:o}
          </details>`:o}
      ${this.connectionMessage?a`<p role="status">${this.connectionMessage}</p>`:o}
      ${this.snapshot.connectors.map((e=>a`<div class="row">
            <strong>${e.label}</strong
            ><span class="muted">${e.kind} · ${e.resourceId}</span
            >${"firecrawl"!==e.kind?a`<button
                  ?disabled=${!this.operator||this.busy}
                  @click=${()=>this.action((async()=>{const t=await this.api.request(`/connectors/${e.id}/import`,"POST",{});this.selectedAssets=[...this.selectedAssets,t.id]}))}
                >
                  Import a version
                </button>`:o}
            ${this.snapshot.permissions.admin?a` ${"firecrawl"!==e.kind?a`<button
                        ?disabled=${this.busy}
                        @click=${()=>this.action((async()=>{const t=await this.api.request(`/connectors/${e.id}/check`,"POST",{});this.connectionMessage=`${e.label}: connected, ${t.records} records available.`}))}
                      >
                        Test connection
                      </button>`:o}
                  <button
                    ?disabled=${this.busy}
                    @click=${()=>this.action((()=>this.api.request(`/connectors/${e.id}`,"DELETE")))}
                  >
                    Disconnect
                  </button>`:o}
          </div>`))}
      ${this.snapshot.permissions.admin?a`<details>
            <summary>Add or update a connection</summary>
            <form @submit=${this.bindConnector}>
              <div class="row">
                <label
                  >Binding ID<input
                    name="id"
                    required
                    placeholder="firecrawl" /></label
                ><label>Label<input name="label" required /></label>
              </div>
              <label
                >Connector<select name="kind" aria-label="Connector">
                  <option>your-priorities</option>
                  <option>google-sheets</option>
                  <option>google-docs</option>
                  <option>google-drive</option>
                  <option>firecrawl</option>
                </select></label
              ><label>Group or Google file ID<input name="resource" /></label
              ><label
                >Settings (JSON)<textarea
                  name="settings"
                  placeholder='{"range":"A:ZZ"} or {"creditMicros":1000,"maxCreditsPerRequest":20}'
                ></textarea></label
              ><label
                >Credentials (JSON, encrypted)<textarea
                  name="credential"
                  autocomplete="off"
                  placeholder='Google service account JSON, or {"apiKey":"…"} for Firecrawl'
                ></textarea></label
              ><label class="inline"
                ><input type="checkbox" name="write" />Allow approved output
                stages to write</label
              ><button ?disabled=${this.busy}>Save connection</button>
            </form>
          </details>`:o}`}renderFirecrawlUsage(){const e=function(e){const t=new Map;let s=0;for(const i of e){const e=i.creditUsage;if(!e){i.description.startsWith("firecrawl:")&&s++;continue}const r=JSON.stringify([i.runId,i.nodeId,e.bindingId]),a=t.get(r)??{runId:i.runId,nodeId:i.nodeId,bindingId:e.bindingId,searches:0,scrapes:0,credits:0,reservedCredits:0,unknownRequests:0,costMicros:0};"search"===e.operation?a.searches++:a.scrapes++,"settled"===i.status?(a.credits+=e.actualCredits??0,a.costMicros+=i.actualMicros??0,void 0===e.actualCredits&&a.unknownRequests++):(a.reservedCredits+=e.maximumCredits,"unknown"===i.status&&a.unknownRequests++),t.set(r,a)}const i=[...t.values()];return{rows:i,legacyRequests:s,credits:i.reduce(((e,t)=>e+t.credits),0),reservedCredits:i.reduce(((e,t)=>e+t.reservedCredits),0),unknownRequests:i.reduce(((e,t)=>e+t.unknownRequests),0)}}(this.usage),t=e.rows.filter((e=>e.runId===this.run?.id)),s=this.snapshot.connectors.filter((e=>"firecrawl"===e.kind));return s.length||e.rows.length||e.legacyRequests?a`<section class="inspector" aria-label="Firecrawl usage">
      <h3>Firecrawl credits</h3>
      <p>
        ${e.credits.toLocaleString()} credits used ·
        ${e.reservedCredits.toLocaleString()} credits reserved ·
        ${e.unknownRequests} unresolved requests
      </p>
      <p class="muted">
        Workspace totals across all runs. Dollar estimates use each request’s
        saved credit price and are already included in processing costs.
      </p>
      ${t.length?a`<p>
            Selected run: ${t.reduce(((e,t)=>e+t.credits),0)}
            credits used ·
            ${t.reduce(((e,t)=>e+t.reservedCredits),0)}
            reserved ·
            ${p(t.reduce(((e,t)=>e+t.costMicros),0))}
            estimated cost.
          </p>`:o}
      ${e.legacyRequests?a`<p>
            ${e.legacyRequests} older requests lack credit tracking; their
            dollar costs remain in the ledger.
          </p>`:o}
      ${e.rows.length?a`<div class="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Run / agent / connection</th>
                  <th>Searches / documents</th>
                  <th>Credits used / reserved</th>
                  <th>Estimated cost</th>
                </tr>
              </thead>
              <tbody>
                ${e.rows.map((e=>a`<tr>
                      <td>
                        ${e.runId.slice(0,8)} · ${e.nodeId} ·
                        ${e.bindingId}
                      </td>
                      <td>${e.searches} / ${e.scrapes}</td>
                      <td>
                        ${e.credits} /
                        ${e.reservedCredits}${e.unknownRequests?a` · ${e.unknownRequests} unresolved`:o}
                      </td>
                      <td>${p(e.costMicros)}</td>
                    </tr>`))}
              </tbody>
            </table>
          </div>`:o}
      ${this.snapshot.permissions.admin?s.map((e=>{const t=this.firecrawlBalances[e.id];return a`<div class="panel">
              <strong>${e.label}</strong>
              <button
                ?disabled=${this.busy}
                @click=${()=>this.action((async()=>{const t=this.groupId,s=this.workspace.revision,i=await this.api.request(`/connectors/${e.id}/credits`);t===this.groupId&&s===this.workspace?.revision&&(this.firecrawlBalances={...this.firecrawlBalances,[e.id]:i})}))}
              >
                Refresh account credits
              </button>
              ${t?a`<p>
                      ${t.remainingCredits.toLocaleString()} account
                      credits remaining ·
                      ${t.planCredits.toLocaleString()} plan credits
                    </p>
                    <p class="muted">
                      Checked ${new Date(t.checkedAt).toLocaleString()}.
                      Billing period: ${t.billingPeriodStart??"unknown"}
                      – ${t.billingPeriodEnd??"unknown"}.
                    </p>`:o}
              <p class="muted">
                Account balance includes other groups and applications using
                this Firecrawl team. It is not this workflow’s spending
                allowance.
              </p>
            </div>`})):o}
    </section>`:o}renderUsage(){return a`<h3>Processing costs</h3>
      ${this.run?.forecast?a`<p>
              Selected run forecast:
              ${p(this.run.forecast.remainingMicros)} remaining ·
              ${p(this.run.forecast.totalMicros)} total.
            </p>
            <p class="muted">${this.run.forecast.basis}</p>
            ${this.run.forecast.exceedsAllowance?a`<p role="alert">
                  The current forecast exceeds this run’s approved allowance.
                </p>`:o}`:o}
      <p>
        ${p(this.workspace.spentMicros)} settled ·
        ${p(this.workspace.reservedMicros)} reserved
      </p>
      <p class="muted">
        Trial allowance: ${p(this.workspace.trialSpentMicros)} used /
        ${p(this.workspace.config.trialBudgetMicros)}. Infrastructure
        charges are separate.
      </p>
      ${this.renderFirecrawlUsage()}
      <div class="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Request</th>
              <th>Status</th>
              <th>Cost / reserved</th>
            </tr>
          </thead>
          <tbody>
            ${this.usage.map((e=>a`<tr>
                  <td>
                    ${e.description}
                    <div class="muted">${e.id}</div>
                  </td>
                  <td>${e.status}</td>
                  <td>
                    ${p(e.actualMicros??e.maximumMicros)}${"unknown"===e.status&&this.snapshot.permissions.admin?a`<details>
                          <summary>Reconcile</summary>
                          <form
                            @submit=${t=>this.reconcile(t,e.id)}
                          >
                            ${e.creditUsage?a`<p>
                                  Include verified <code>creditsUsed</code> in
                                  the result JSON. The charge must equal credits
                                  × ${p(e.creditUsage.creditMicros)} (the
                                  saved price per credit).
                                </p>`:o}
                            <label
                              >Verified charge (USD)<input
                                name="cost"
                                type="number"
                                min="0"
                                step="0.000001"
                                required /></label
                            ><label
                              >Verified result (JSON)<textarea
                                name="result"
                                required
                              >
null</textarea
                              ></label
                            ><label
                              >Reconciliation note<input
                                name="note"
                                minlength="5"
                                required /></label
                            ><button ?disabled=${this.busy}>
                              Record verified outcome
                            </button>
                          </form>
                        </details>`:o}
                  </td>
                </tr>`))}
          </tbody>
        </table>
      </div>`}renderRuns(){const e=this.run,t=this.snapshot.runs.find((e=>e.id===this.reuseRunId));return a`<section class="run">
      <div class="row">
        <label
          >Trial records<input
            type="number"
            min="1"
            max="20"
            .value=${String(this.sampleCount)}
            @change=${e=>{this.sampleCount=Math.max(1,Math.min(20,Number(e.target.value)||5))}}
        /></label>
        <label
          >Experiment scope<select
            .value=${this.targetNodeId}
            @change=${e=>{this.targetNodeId=e.target.value,this.draft=void 0}}
          >
            <option value="">Whole workflow</option>
            ${this.workspace.graph.nodes.filter((e=>"agent"===e.kind&&e.enabled)).map((e=>a`<option value=${e.id}>
                  Through ${e.label} (including dependencies)
                </option>`))}
          </select></label
        >
      </div>
      <details class="reuse-settings">
        <summary>Reuse completed analysis</summary>
        <p>
          Keep the same inputs and records. Saved stages before the restart
          agent must have matching code, dependencies and models. Reused work is
          not charged again. Bulk reruns need a fresh complete trial for the
          remaining-work estimate and a new explicit spending approval. Trials
          reuse the same sampled parents.
        </p>
        <label
          >Completed run<select
            .value=${this.reuseRunId}
            @change=${e=>{this.reuseRunId=e.target.value;const t=this.snapshot.runs.find((e=>e.id===this.reuseRunId));t&&(this.sampleCount=Math.min(20,t.inputCount),this.selectedAssets=[...t.assetIds]),this.restartNodeId=""}}
          >
            <option value="">Start fresh</option>
            ${this.snapshot.runs.filter((e=>"completed"===e.status&&e.stageOutputs&&!e.reservedMicros)).map((e=>a`<option value=${e.id}>
                  ${e.mode} · ${e.id.slice(0,8)} · ${e.inputCount} records
                </option>`))}
          </select></label
        >
        <label
          >Restart from agent<select
            .value=${this.restartNodeId}
            @change=${e=>{this.restartNodeId=e.target.value}}
          >
            <option value="">Select agent</option>
            ${this.workspace.graph.nodes.filter((e=>"agent"===e.kind&&e.enabled)).map((e=>a`<option value=${e.id}>${e.label}</option>`))}
          </select></label
        >
      </details>
      ${e?.reuse?a`<p class="muted">
            Reused ${e.reuse.nodeIds.join(", ")} from run
            ${e.reuse.runId.slice(0,8)}. Historical processing cost
            ${p(e.reuse.historicalMicros)}; new usage is recorded
            separately.
          </p>`:o}
      <div class="toolbar">
        <button
          ?disabled=${!this.operator||this.busy||!this.selectedAssets.length||Boolean(this.reuseRunId&&!this.restartNodeId)||"bulk"===t?.mode||Boolean(this.workspace.activeRunId)}
          @click=${()=>this.draftRun("trial")}
        >
          Run ${this.sampleCount}-record trial</button
        ><button
          ?disabled=${!this.operator||this.busy||!this.selectedAssets.length||Boolean(this.reuseRunId&&(!this.restartNodeId||"bulk"!==t?.mode))||Boolean(this.workspace.activeRunId)}
          @click=${()=>this.draftRun("bulk")}
        >
          Estimate full run</button
        ><span class="muted"
          >${this.selectedAssets.length} input file(s) selected</span
        >
      </div>
      ${this.draft?a`<form class="estimate" @submit=${this.approve}>
            <h3>Approve bulk processing</h3>
            <p>
              ${this.draft.inputCount} records · expected
              ${p(this.draft.estimate.expectedMicros)} · upper projection
              ${p(this.draft.estimate.upperMicros)}
            </p>
            <p class="muted">${this.draft.estimate.notes.join(" ")}</p>
            ${this.draft.estimate.evidence?a`<p>
                  Sample coverage:
                  ${(100*this.draft.estimate.evidence.coverage).toFixed(2)}%
                  · per-parent cost range
                  ${p(this.draft.estimate.evidence.minRecordMicros)}–${p(this.draft.estimate.evidence.maxRecordMicros)}
                  · cost attributed to records:
                  ${(100*this.draft.estimate.evidence.attributedCostFraction).toFixed(0)}%.
                </p>`:o}
            ${this.draft.estimate?.agents?a`<div class="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Agent</th>
                        <th>Sample cost</th>
                        <th>Expected</th>
                        <th>Upper projection</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${this.draft.estimate.agents.map((e=>a`<tr>
                            <td>
                              ${this.draft.graph.nodes.find((t=>t.id===e.nodeId))?.label??e.nodeId}
                            </td>
                            <td>${p(e.sampleMicros)}</td>
                            <td>${p(e.expectedMicros)}</td>
                            <td>${p(e.upperMicros)}</td>
                          </tr>`))}
                    </tbody>
                  </table>
                </div>`:o}
            <label
              >Maximum approved spend (USD)<input
                name="cap"
                type="number"
                min="0.01"
                step="0.01"
                required
                .value=${String(Math.ceil(this.draft.estimate.upperMicros/1e4)/100)} /></label
            ><button class="primary" ?disabled=${this.busy}>
              Approve and start this revision</button
            ><button
              type="button"
              @click=${()=>{this.draft=void 0}}
            >
              Close
            </button>
          </form>`:o}
      ${e?a`<p>
              <strong>${e.mode} · ${e.status}</strong> · ${e.inputCount}
              records · ${p(e.spentMicros)} /
              ${p(e.budgetMicros)}
            </p>
            ${e.error?a`<p class="error">${e.error}</p>`:o}
            <div class="toolbar">
              ${["pause","cancel"].map((t=>a`<button
                    ?disabled=${!this.operator||this.busy||["completed","failed","cancelled"].includes(e.status)}
                    @click=${()=>this.action((()=>this.api.request(`/runs/${e.id}/${t}`,"POST",{})))}
                  >
                    ${t}
                  </button>`))}
            </div>
            ${"paused"===e.status?a`<form @submit=${t=>this.resume(t,e)}>
                  <label
                    >Approved total run cap (USD)<input
                      name="cap"
                      type="number"
                      min=${String(e.spentMicros/1e6)}
                      step="0.000001"
                      required
                      .value=${String(e.budgetMicros/1e6)}
                  /></label>
                  ${e.nodeIds.map((t=>{const s=e.graph.nodes.find((e=>e.id===t)),i=e.nodeBudgets?.[t]??s.budgetMicros;return a`<label
                        >${s.label} total cap (USD, optional)
                        <input
                          name=${`node:${t}`}
                          type="number"
                          step="0.000001"
                          min="0.000001"
                          .value=${void 0===i?"":String(i/1e6)}
                          placeholder="Run cap applies" /></label
                      ><label
                        >${s.label} per-parent cap (USD, optional)<input
                          name=${`record:${t}`}
                          type="number"
                          min="0.000001"
                          step="0.000001"
                          .value=${void 0===(e.nodeRecordBudgets?.[t]??s.recordBudgetMicros)?"":String((e.nodeRecordBudgets?.[t]??s.recordBudgetMicros)/1e6)}
                      /></label>`}))}
                  <button ?disabled=${!this.operator||this.busy}>
                    Approve allowance and resume
                  </button>
                </form>`:o}`:o}
    </section>`}};it.styles=e`
    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      min-width: 0;
      display: grid;
      gap: 12px;
    }
    :host {
      display: block;
      color: var(--md-sys-color-on-surface, #222);
      font-family: inherit;
    }
    .header {
      display: flex;
      gap: 16px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    h2,
    h3 {
      margin: 0 0 10px;
    }
    .muted {
      opacity: 0.7;
      font-size: 13px;
    }
    .layout {
      display: grid;
      grid-template-columns: minmax(320px, 38%) minmax(0, 1fr);
      gap: 16px;
      align-items: start;
    }
    .panel {
      border: 1px solid var(--md-sys-color-outline-variant, #ddd);
      border-radius: 20px;
      padding: 18px;
      background: var(--md-sys-color-surface, #fff);
      min-width: 0;
      box-shadow: 0 6px 28px #30234506;
    }
    .chat {
      display: flex;
      flex-direction: column;
      min-height: 630px;
      background: linear-gradient(
        165deg,
        color-mix(
          in srgb,
          var(--md-sys-color-primary, #7663a8) 5%,
          var(--md-sys-color-surface, #fff)
        ),
        var(--md-sys-color-surface, #fff) 48%
      );
    }
    .chat-heading {
      display: flex;
      gap: 12px;
      align-items: center;
      margin-bottom: 16px;
    }
    .chat-heading h3 {
      margin: 0;
      font-size: 18px;
      letter-spacing: -0.3px;
      overflow-wrap: anywhere;
    }
    .chat-heading p {
      margin: 4px 0 0;
      font-size: 12px;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .codex-mark {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: 42px;
      height: 42px;
      border-radius: 14px;
      background: linear-gradient(135deg, #8e7bc6, #574788);
      color: white;
      box-shadow: 0 5px 12px #59438d24;
      font-family: monospace;
      font-size: 19px;
      font-weight: 600;
    }
    .connection-status {
      font-size: 12px;
      margin: 10px 0;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .connection-status[data-connected]::before {
      content: "";
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #44816e;
      margin-right: 7px;
    }
    .history {
      flex: 1;
      min-height: 230px;
      max-height: 580px;
      overflow: auto;
      padding: 4px 2px 10px;
      scrollbar-width: thin;
      scrollbar-color: #ccc4de transparent;
    }
    .composer {
      padding: 10px 12px 12px;
      border-radius: 16px;
      border: 1px solid var(--md-sys-color-outline-variant, #dcd5e9);
      background: var(--md-sys-color-surface, #fff);
      box-shadow: 0 4px 16px #30234508;
    }
    .composer:focus-within {
      border-color: var(--md-sys-color-primary, #7663a8);
      box-shadow: 0 0 0 3px #8e7bc614;
    }
    .composer label {
      margin-top: 0;
      font-size: 12px;
    }
    .composer textarea {
      min-height: 78px;
      border: 0;
      padding: 6px 0;
      outline: none;
      font-size: 14px;
      line-height: 1.5;
    }
    .composer .toolbar {
      justify-content: space-between;
    }
    .composer .inline {
      margin: 0;
      font-size: 11px;
    }
    .toolbar,
    .tabs,
    .row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      align-items: center;
    }
    .tabs {
      margin-bottom: 16px;
      padding: 4px;
      border-radius: 12px;
      background: var(--md-sys-color-surface-container, #f4f1f8);
      width: fit-content;
      gap: 4px;
    }
    .tabs button {
      border: none;
      padding: 8px 14px;
      font-size: 13px;
      font-weight: 600;
    }
    .tabs button[aria-selected="true"] {
      background: var(--md-sys-color-primary, #65558f);
      color: var(--md-sys-color-on-primary, #fff);
      box-shadow: 0 2px 6px #46345c24;
    }
    button,
    input,
    select,
    textarea {
      font: inherit;
      border: 1px solid var(--md-sys-color-outline, #aaa);
      border-radius: 8px;
      padding: 9px;
      background: transparent;
      color: inherit;
      box-sizing: border-box;
    }
    button {
      cursor: pointer;
      transition:
        background 120ms,
        border-color 120ms,
        box-shadow 120ms;
    }
    button:hover:not(:disabled) {
      border-color: var(--md-sys-color-primary, #7663a8);
      box-shadow: 0 2px 6px #46345c12;
    }
    button:focus-visible {
      outline: 2px solid var(--md-sys-color-primary, #7663a8);
      outline-offset: 3px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.5;
    }
    button.primary {
      background: linear-gradient(
        135deg,
        var(--md-sys-color-primary, #7663a8),
        color-mix(in srgb, var(--md-sys-color-primary, #7663a8) 80%, #292039)
      );
      color: var(--md-sys-color-on-primary, #fff);
      border-color: transparent;
      padding-inline: 20px;
      font-weight: 600;
      box-shadow: 0 3px 8px #65558f22;
    }
    textarea {
      width: 100%;
      resize: vertical;
      min-height: 84px;
    }
    .error {
      padding: 12px;
      border-radius: 8px;
      background: var(--md-sys-color-error-container, #ffe3e3);
      color: var(--md-sys-color-on-error-container, #811);
    }
    label {
      display: grid;
      gap: 6px;
      margin: 10px 0;
    }
    label.inline {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .table-scroll {
      max-width: 100%;
      overflow-x: auto;
    }
    .agent-dialog {
      width: min(780px, calc(100vw - 32px));
      max-width: calc(100vw - 32px);
      max-height: calc(100dvh - 40px);
      box-sizing: border-box;
      border: 1px solid var(--md-sys-color-outline-variant, #ddd);
      border-radius: 20px;
      padding: 24px;
      color: inherit;
      background: var(--md-sys-color-surface, #fff);
      box-shadow: 0 20px 80px #251b4533;
      overflow: auto;
    }
    .agent-dialog::backdrop {
      background: #21172c66;
      backdrop-filter: blur(3px);
    }
    .agent-dialog header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 16px;
      margin-bottom: 16px;
    }
    .agent-dialog h3 {
      margin-top: 20px;
    }
    .agent-dialog h2 {
      overflow-wrap: anywhere;
    }
    .agent-dialog p {
      line-height: 1.5;
    }
    .agent-dialog .row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
      align-items: start;
    }
    .agent-dialog .row label {
      margin: 0;
    }
    .agent-dialog .model-note {
      display: block;
      font-size: 12px;
      margin-top: 6px;
      color: var(--md-sys-color-on-surface-variant, #716b80);
    }
    .agent-dialog details {
      margin-block: 12px;
    }
    .agent-dialog summary {
      cursor: pointer;
    }
    .agent-dialog td small {
      display: block;
      margin-top: 4px;
    }
    .agent-dialog .model-role {
      margin-bottom: 8px;
    }
    .agent-dialog .history-run {
      text-align: left;
      font-size: 12px;
    }
    .agent-dialog .notice {
      background: var(--md-sys-color-surface-container, #f4f1f8);
      padding: 12px;
      border-radius: 10px;
    }
    .agent-dialog .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
      flex-wrap: wrap;
    }
    .agent-selection {
      margin-top: 14px;
      padding: 12px;
      border-radius: 12px;
      background: var(--md-sys-color-surface-container, #f4f1f8);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }
    input,
    select {
      min-width: 0;
      max-width: 100%;
    }
    label {
      min-width: 0;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 13px;
    }
    th,
    td {
      text-align: left;
      padding: 10px 6px;
      border-bottom: 1px solid var(--md-sys-color-outline-variant, #ddd);
      vertical-align: top;
    }
    td {
      overflow-wrap: anywhere;
    }
    a {
      color: var(--md-sys-color-primary, #65558f);
    }
    .run {
      margin-top: 14px;
      border-top: 1px solid #ddd;
      padding-top: 14px;
    }
    .estimate {
      padding: 14px;
      background: var(--md-sys-color-secondary-container, #e8e7f4);
      border-radius: 12px;
      margin-top: 12px;
    }
    .inspector {
      margin-top: 16px;
    }
    .auth {
      padding: 10px 12px;
      border: 1px solid var(--md-sys-color-outline-variant, #e7e2ee);
      border-radius: 10px;
      margin-bottom: 12px;
      font-size: 12px;
    }
    .auth code {
      font-size: 20px;
      letter-spacing: 2px;
    }
    details {
      margin: 12px 0;
    }
    pre {
      white-space: pre-wrap;
      overflow-wrap: anywhere;
      font-size: 12px;
    }
    .cost {
      font-variant-numeric: tabular-nums;
    }
    form {
      margin: 0;
    }
    .empty {
      padding: 30px 10px;
      opacity: 0.7;
    }
    .approval {
      border: 1px solid #b68929;
      border-radius: 8px;
      padding: 12px;
      margin: 10px 0;
    }
    @media (max-width: 1000px) {
      .layout {
        grid-template-columns: 1fr;
      }
      .chat {
        min-height: 400px;
      }
      .history {
        max-height: 400px;
      }
    }
  `,st([t({type:Number})],it.prototype,"groupId",void 0),st([s()],it.prototype,"snapshot",void 0),st([s()],it.prototype,"error",void 0),st([s()],it.prototype,"busy",void 0),st([s()],it.prototype,"assistantSettingsPending",void 0),st([s()],it.prototype,"missing",void 0),st([s()],it.prototype,"mayCreate",void 0),st([s()],it.prototype,"tab",void 0),st([s()],it.prototype,"selectedNode",void 0),st([s()],it.prototype,"agentEditor",void 0),st([s()],it.prototype,"agentError",void 0),st([s()],it.prototype,"agentSaving",void 0),st([s()],it.prototype,"selectedAssets",void 0),st([s()],it.prototype,"viewedRunId",void 0),st([s()],it.prototype,"chat",void 0),st([s()],it.prototype,"loggedInUser",void 0),st([s()],it.prototype,"approvals",void 0),st([s()],it.prototype,"auth",void 0),st([s()],it.prototype,"uploadProgress",void 0),st([s()],it.prototype,"draft",void 0),st([s()],it.prototype,"usage",void 0),st([s()],it.prototype,"firecrawlBalances",void 0),st([s()],it.prototype,"quota",void 0),st([s()],it.prototype,"sampleCount",void 0),st([s()],it.prototype,"targetNodeId",void 0),st([s()],it.prototype,"reuseRunId",void 0),st([s()],it.prototype,"restartNodeId",void 0),st([s()],it.prototype,"preview",void 0),st([s()],it.prototype,"connectionGroups",void 0),st([s()],it.prototype,"connectionMessage",void 0),st([s()],it.prototype,"history",void 0),st([s()],it.prototype,"comparedRevision",void 0),st([s()],it.prototype,"storageInfo",void 0),it=st([i("yp-live-workflow")],it);export{it as YpLiveWorkflow};
