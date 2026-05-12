import { customElement } from "lit/decorators.js";
import { YpAdminApp } from "@yrpri/webapp/admin/yp-admin-app.js";
import { html } from "lit";

import './aoi-admin-config-group.js';

@customElement('aoi-admin-app')
export class AnteosAdminApp extends YpAdminApp {
  private get isCreatingCommunityForGroup() {
    return !!window.appGlobals?.originalQueryParameters?.[
      "createCommunityForGroup"
    ];
  }

  private setDomainAsParentCollection() {
    if (this.isCreatingCommunityForGroup && window.appGlobals?.domain?.id) {
      this.parentCollectionId = window.appGlobals.domain.id;
    }
  }

  private async waitForDomain() {
    for (let attemptsLeft = 0; attemptsLeft < 50; attemptsLeft++) {
      this.setDomainAsParentCollection();
      if (this.parentCollectionId) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  override updatePageFromPath() {
    super.updatePageFromPath();
    this.setDomainAsParentCollection();
  }

  override async _setAdminFromParent() {
    if (this.isCreatingCommunityForGroup) {
      await this.waitForDomain();
    }

    return super._setAdminFromParent();
  }

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
