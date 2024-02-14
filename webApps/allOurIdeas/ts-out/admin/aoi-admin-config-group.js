var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement } from "lit/decorators.js";
import { html } from "lit";
import { YpAdminConfigGroup } from "@yrpri/webapp/admin/yp-admin-config-group.js";
let AoiAdminConfigGroup = class AoiAdminConfigGroup extends YpAdminConfigGroup {
    constructor() {
        super(...arguments);
        this.groupTypeIndex = YpAdminConfigGroup.GroupType.allOurIdeas;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if ((changedProperties.has("group") || changedProperties.has("collection")) &&
            this.group &&
            this.collection) {
            this.groupTypeIndex = YpAdminConfigGroup.GroupType.allOurIdeas;
            this.group.configuration.groupType = this.groupTypeIndex;
            this._configChanged();
            this.configTabs = this.setupConfigTabs();
            this.requestUpdate();
        }
    }
    renderGroupTypeSelection() {
        return html ``;
    }
};
AoiAdminConfigGroup = __decorate([
    customElement("aoi-admin-config-group")
], AoiAdminConfigGroup);
export { AoiAdminConfigGroup };
//# sourceMappingURL=aoi-admin-config-group.js.map