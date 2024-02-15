import { nothing, html } from "lit";
import { customElement } from "lit/decorators.js";
import { YpApp } from "@yrpri/webapp/yp-app/yp-app.js";

import './admin/aoi-admin-app.js';

@customElement("aoi-app")
export class AoiApp extends YpApp {
  override renderAdminApp() {
    if (this.appMode == "main") {
      return nothing;
    } else {
      const isActive = this.appMode === "admin";
      const showSpinner = this.loadingAppSpinner;

      return html`
        <div class="loadingAppSpinnerPage ${showSpinner ? "" : "hidden"}">
          <md-circular-progress indeterminate></md-circular-progress>
        </div>
        <aoi-admin-app
          ?active="${isActive}"
          class="${isActive ? "active" : ""}"
          ?hidden="${showSpinner}"
        ></aoi-admin-app>

      `;
    }
  }
}