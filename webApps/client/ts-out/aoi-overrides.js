import i18next from "i18next";
import HttpApi from "i18next-http-backend";
import { html } from "lit";
import { YpAppGlobals } from "@yrpri/webapp/yp-app/YpAppGlobals.js";
import { YpDomain } from "@yrpri/webapp/yp-collection/yp-domain.js";
const isObject = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const mergeTranslations = (base, override) => {
    const merged = { ...base };
    for (const [key, value] of Object.entries(override)) {
        if (isObject(value) && isObject(merged[key])) {
            merged[key] = mergeTranslations(merged[key], value);
        }
        else {
            merged[key] = value;
        }
    }
    return merged;
};
const pathWithPrefix = (prefix, path) => {
    const trimmedPrefix = prefix.replace(/\/$/, "");
    const trimmedPath = path.replace(/^\//, "");
    return trimmedPrefix ? `${trimmedPrefix}/${trimmedPath}` : `/${trimmedPath}`;
};
const normalizeLocale = (locale) => locale.replace("-", "_").toLowerCase();
const getDefaultLocale = () => {
    const hostname = window.location.hostname;
    let defaultLocale = "en";
    if (hostname.indexOf("betrireykjavik") > -1) {
        defaultLocale = "is";
    }
    else if (hostname.indexOf("betraisland") > -1) {
        defaultLocale = "is";
    }
    else if (hostname.indexOf("forbrukerradet") > -1) {
        defaultLocale = "no";
    }
    else {
        const tld = hostname.substring(hostname.lastIndexOf("."));
        const localeByTld = {
            ".fr": "fr",
            ".hr": "hr",
            ".hu": "hu",
            ".nl": "nl",
            ".no": "no",
            ".pl": "pl",
            ".tw": "zh_tw",
        };
        defaultLocale = localeByTld[tld] || "en";
    }
    const storedLocale = localStorage.getItem("yp-user-locale");
    if (storedLocale) {
        defaultLocale = storedLocale;
    }
    const localeFromUrl = window.appGlobals.originalQueryParameters?.locale;
    if (typeof localeFromUrl === "string" && localeFromUrl.length > 1) {
        defaultLocale = localeFromUrl;
        localStorage.setItem("yp-user-locale", localeFromUrl);
    }
    return normalizeLocale(defaultLocale);
};
export class AoiAppGlobals extends YpAppGlobals {
    constructor() {
        super(...arguments);
        this.translationLoadPathPrefix = "";
    }
    setupTranslationSystem(loadPathPrefix = "") {
        this.translationLoadPathPrefix = loadPathPrefix;
        void this.setupMergedTranslationSystem(loadPathPrefix);
    }
    changeLocaleIfNeededAfterWait(locale, force) {
        const normalizedLocale = normalizeLocale(locale);
        if (window.appGlobals.haveLoadedLanguages === true &&
            normalizedLocale &&
            this.language !== normalizedLocale &&
            (force || !localStorage.getItem("yp-user-locale"))) {
            void this.loadMergedLocale(normalizedLocale).then(() => {
                i18next.changeLanguage(normalizedLocale, () => {
                    this.language = normalizedLocale;
                    this.locale = normalizedLocale;
                    this.updateDocumentLanguage(normalizedLocale);
                    this.fireGlobal("yp-language-loaded", {
                        language: normalizedLocale,
                    });
                    this.fireGlobal("language-loaded", {
                        language: normalizedLocale,
                    });
                });
            });
        }
    }
    async setupMergedTranslationSystem(loadPathPrefix) {
        const defaultLocale = getDefaultLocale();
        if (window.appGlobals.originalQueryParameters?.startAutoTranslate) {
            setTimeout(() => {
                this.startTranslation();
            }, 2500);
        }
        const resources = {};
        const initialLocales = Array.from(new Set(["en", defaultLocale]));
        for (const locale of initialLocales) {
            resources[locale] = {
                translation: await this.getMergedTranslation(locale, loadPathPrefix),
            };
        }
        const localesFolder = typeof __LOCALES_DIR__ !== "undefined" ? __LOCALES_DIR__ : "locales";
        i18next.use(HttpApi).init({
            lng: defaultLocale,
            fallbackLng: "en",
            resources,
            backend: {
                loadPath: pathWithPrefix(loadPathPrefix, `${localesFolder}/{{lng}}/{{ns}}.json`),
            },
        }, () => {
            window.appGlobals.locale = defaultLocale;
            window.appGlobals.i18nTranslation = i18next;
            window.appGlobals.haveLoadedLanguages = true;
            this.language = defaultLocale;
            this.locale = defaultLocale;
            this.updateDocumentLanguage(defaultLocale);
            this.fireGlobal("yp-language-loaded", { language: defaultLocale });
            this.fireGlobal("language-loaded", { language: defaultLocale });
        });
    }
    async loadMergedLocale(locale) {
        const translation = await this.getMergedTranslation(locale, this.translationLoadPathPrefix);
        i18next.addResourceBundle(locale, "translation", translation, true, true);
    }
    async getMergedTranslation(locale, loadPathPrefix) {
        const localesFolder = typeof __LOCALES_DIR__ !== "undefined" ? __LOCALES_DIR__ : "locales";
        const packageUrl = pathWithPrefix(loadPathPrefix, `yrpri-webapp-locales/${locale}/translation.json`);
        const localUrl = pathWithPrefix(loadPathPrefix, `${localesFolder}/${locale}/translation.json`);
        const [packageTranslation, localTranslation] = await Promise.all([
            this.fetchTranslation(packageUrl),
            this.fetchTranslation(localUrl),
        ]);
        return mergeTranslations(packageTranslation, localTranslation);
    }
    async fetchTranslation(url) {
        try {
            const response = await fetch(url, { cache: "no-cache" });
            if (response.ok) {
                return (await response.json());
            }
        }
        catch (error) {
            console.warn(`Unable to load translations from ${url}`, error);
        }
        return {};
    }
}
export const installAoiWebAppOverrides = () => {
    const domainPrototype = YpDomain.prototype;
    if (!domainPrototype.__aoiWelcomeHtmlOverrideInstalled) {
        domainPrototype.__aoiWelcomeHtmlOverrideInstalled = true;
        domainPrototype.__aoiOriginalRender = domainPrototype.render;
        domainPrototype.render = function () {
            const collection = this.collection;
            const configuration = collection?.configuration;
            if (collection &&
                !this.loggedInUser &&
                configuration?.useLoginOnDomainIfNotLoggedIn) {
                return this.renderDomainLogin();
            }
            if (collection &&
                configuration?.welcomeHtmlInsteadOfCommunitiesList) {
                if (this.customWelcomeHtml) {
                    return html `
            <yp-magic-text
              id="domainWelcomeHtml"
              .contentId="${collection.id}"
              unsafeHtml
              .content="${this.customWelcomeHtml}"
              .contentLanguage="${collection.language}"
              textType="domainWelcomeHtml"
            ></yp-magic-text>
          `;
                }
                else {
                    return html ``;
                }
            }
            return domainPrototype.__aoiOriginalRender.call(this);
        };
    }
};
//# sourceMappingURL=aoi-overrides.js.map