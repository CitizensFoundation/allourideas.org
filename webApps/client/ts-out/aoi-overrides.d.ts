import { YpAppGlobals } from "@yrpri/webapp/yp-app/YpAppGlobals.js";
export declare class AoiAppGlobals extends YpAppGlobals {
    private translationLoadPathPrefix;
    setupTranslationSystem(loadPathPrefix?: string): void;
    changeLocaleIfNeededAfterWait(locale: string, force: boolean): void;
    private setupMergedTranslationSystem;
    private loadMergedLocale;
    private getMergedTranslation;
    private fetchTranslation;
}
export declare const installAoiWebAppOverrides: () => void;
//# sourceMappingURL=aoi-overrides.d.ts.map