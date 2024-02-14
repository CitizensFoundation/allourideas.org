import { customElement } from "lit/decorators.js";
import { PropertyValueMap, html, nothing } from "lit";
import { YpAdminConfigGroup } from "@yrpri/webapp/admin/yp-admin-config-group.js";

@customElement("aoi-admin-config-group")
export class AoiAdminConfigGroup extends YpAdminConfigGroup {
  override groupTypeIndex = YpAdminConfigGroup.GroupType.allOurIdeas;

  override updated(
    changedProperties: Map<string | number | symbol, unknown>
  ): void {
    super.updated(changedProperties);
    if (
      (changedProperties.has("group") || changedProperties.has("collection")) &&
      this.group &&
      this.collection
    ) {
      this.groupTypeIndex = YpAdminConfigGroup.GroupType.allOurIdeas;
      this.group.configuration.groupType = this.groupTypeIndex;
      this._configChanged();
      this.configTabs = this.setupConfigTabs();
      this.requestUpdate();
    }
  }

  override renderGroupTypeSelection() {
    return html``;
  }
}
