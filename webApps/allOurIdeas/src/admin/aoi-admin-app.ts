import { customElement } from "lit/decorators.js";
import { YpAdminApp } from "@yrpri/webapp/admin/yp-admin-app.js";
import { html } from "lit";

import './aoi-admin-config-group.js';

@customElement('aoi-admin-app')
export class AnteosAdminApp extends YpAdminApp {

  override renderGroupConfigPage() {
    return html`<aoi-admin-config-group
      .collectionType="${this.collectionType}"
      .collection="${this.collection}"
      .collectionId="${this.collectionId}"
      .subRoute="${this.subRoute}"
      @yp-request-update-on-parent="${this.updateFromCollection}"
      .parentCollectionId="${this.parentCollectionId}"
    >
    </aoi-admin-config-group>`;
  }
}