var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { nothing, html } from "lit";
import { customElement } from "lit/decorators.js";
import { YpApp } from "@yrpri/webapp/yp-app/yp-app.js";
import './admin/aoi-admin-app.js';
let AoiApp = class AoiApp extends YpApp {
    renderAdminApp() {
        if (this.appMode == "main") {
            return nothing;
        }
        else {
            const isActive = this.appMode === "admin";
            const showSpinner = this.loadingAppSpinner;
            return html `
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
};
AoiApp = __decorate([
    customElement("aoi-app")
], AoiApp);
export { AoiApp };
//# sourceMappingURL=aoi-app.js.map