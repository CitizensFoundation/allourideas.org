var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from "lit/decorators.js";
import { YpAdminApp } from "@yrpri/webapp/admin/yp-admin-app.js";
import { html } from "lit";
import './aoi-admin-config-group.js';
let AnteosAdminApp = class AnteosAdminApp extends YpAdminApp {
    renderGroupConfigPage() {
        return html `<aoi-admin-config-group
      .collectionType="${this.collectionType}"
      .collection="${this.collection}"
      .collectionId="${this.collectionId}"
      .subRoute="${this.subRoute}"
      @yp-request-update-on-parent="${this.updateFromCollection}"
      .parentCollectionId="${this.parentCollectionId}"
    >
    </aoi-admin-config-group>`;
    }
};
AnteosAdminApp = __decorate([
    customElement('aoi-admin-app')
], AnteosAdminApp);
export { AnteosAdminApp };
//# sourceMappingURL=aoi-admin-app.js.map