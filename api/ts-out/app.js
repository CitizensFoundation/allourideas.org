import path from "path";
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { YourPrioritiesApi } from "@yrpri/api/app.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export class AoiServerApi extends YourPrioritiesApi {
    constructor(port) {
        super(port);
        this.oldEarlNames = new Set();
        this.loadOldEarlNames();
    }
    addDirnameToRequest() {
        this.app.use((req, res, next) => {
            //TODO: Remove this hack
            req.dirName = __dirname + "/controllers";
            console.log(`didii ${req.dirName}`);
            next();
        });
    }
    async loadOldEarlNames() {
        const filePath = path.join(__dirname, '../oldEarlNames.txt');
        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            data.split('\n').forEach(line => {
                this.oldEarlNames.add(line.trim());
            });
        }
        catch (error) {
            console.error('Error loading oldEarlNames:', error);
        }
    }
    setupStaticFileServing() {
        super.setupStaticFileServing();
        const baseDir = path.join(__dirname, "../../webApps");
        const oldEarlStaticPath = path.join(baseDir, 'client/dist/oldVersionInformation.html');
        // Middleware to check for old URLs
        this.app.use((req, res, next) => {
            let requestPath = req.path;
            if (requestPath.charAt(0) === '/') {
                requestPath = requestPath.slice(1);
            }
            if (this.oldEarlNames.has(requestPath)) {
                return res.sendFile(oldEarlStaticPath);
            }
            next();
        });
        let clientAppPath = path.join(baseDir, "client/dist");
        this.app.use("/", express.static(clientAppPath));
        this.app.use("/domain/*", express.static(clientAppPath));
        this.app.use("/community/*", express.static(clientAppPath));
        this.app.use("/group/*", express.static(clientAppPath));
        this.app.use("/post/*", express.static(clientAppPath));
        this.app.use("/favicon.ico", express.static(clientAppPath));
    }
}
