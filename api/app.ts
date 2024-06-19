import path from "path";
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { YourPrioritiesApi } from "@yrpri/api/app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class AoiServerApi extends YourPrioritiesApi {
  oldEarlNames: Set<unknown>;
  urlMappings: Array<{ from: string, toGroupId: number }>;

  constructor(port: number) {
    super(port);
    this.oldEarlNames = new Set();
    this.urlMappings = [
      { from: "unlocking-literacy-en", toGroupId: 2 },
      { from: "unlocking-literacy-es", toGroupId: 3 },
      { from: "unlocking-literacy-ht", toGroupId: 4 },
      { from: "unlocking-literacy-zh", toGroupId: 5 },
      { from: "unlocking-literacy-kea", toGroupId: 6 },
      { from: "AI-risk", toGroupId: 7 },
      { from: "safeAI", toGroupId: 8 },
      { from: "safe-AI", toGroupId: 9 },
      { from: "our-turn-student-agenda", toGroupId: 10 }
    ];
    this.loadOldEarlNames();
  }

  override addDirnameToRequest(): void {
    this.app.use(
      (req: any, res: express.Response, next: any) => {
        //TODO: Remove this hack
        req.dirName = __dirname+"/controllers";
        console.log(`didii ${req.dirName}`)
        next();
      }
    );
  }

  async loadOldEarlNames() {
    const filePath = path.join(__dirname, '../oldEarlNames.txt');
    try {
      const data = await fs.promises.readFile(filePath, 'utf8');
      data.split('\n').forEach(line => {
        this.oldEarlNames.add(line.trim());
      });
    } catch (error) {
      console.error('Error loading oldEarlNames:', error);
    }
  }

  override setupStaticFileServing(): void {
    const baseDir = path.join(__dirname, "../../webApps");

    const oldEarlStaticPath = path.join(baseDir, 'client/dist/oldVersionInformation.html');

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (req.path.endsWith('.js')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=86400, stale-while-revalidate=86400'); // 1 year cache, 1 day revalidate
      } else if (req.path.match(/\.(png|jpg|jpeg|gif)$/)) {
        res.setHeader('Cache-Control', 'public, max-age=2592000, s-maxage=86400, stale-while-revalidate=86400'); // 1 month cache, 1 day revalidate
      } else if (req.path.endsWith('.json')) {
        res.setHeader('Cache-Control', 'public, max-age=43200, s-maxage=60, stale-while-revalidate=60'); // 12 hour cache, 5 minutes revalidate
      } else {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      }
      next();
    });

    // Middleware to check for old URLs and redirect based on mappings
    this.app.use((req, res, next) => {
      let requestPath = req.path;
      if (requestPath.charAt(0) === '/') {
        requestPath = requestPath.slice(1);
      }
      if (this.oldEarlNames.has(requestPath)) {
        return res.sendFile(oldEarlStaticPath);
      }

      requestPath = requestPath.replace(/\/$/, '');

      // Check for URL mappings and redirect if match found
      const mapping = this.urlMappings.find(m => m.from === requestPath);
      if (mapping) {
        // Extract query string if present
        const queryString = req.originalUrl.includes('?') ? req.originalUrl.substring(req.originalUrl.indexOf('?')) : '';
        const newUrl = `/group/${mapping.toGroupId}${queryString}`;
        return res.redirect(newUrl);
      }

      next();
    });

    let clientAppPath = path.join(baseDir, "client/dist");

    this.app.use("/", express.static(clientAppPath));
    this.app.use("/domain/*", express.static(clientAppPath));
    this.app.use("/community/*", express.static(clientAppPath));
    this.app.use("/group/*", express.static(clientAppPath));
    this.app.use("/admin/domain/*", express.static(clientAppPath));
    this.app.use("/admin/community/*", express.static(clientAppPath));
    this.app.use("/admin/group/*", express.static(clientAppPath));
    this.app.use("/analytics/domain/*", express.static(clientAppPath));
    this.app.use("/analytics/community/*", express.static(clientAppPath));
    this.app.use("/analytics/group/*", express.static(clientAppPath));
    this.app.use("/post/*", express.static(clientAppPath));
    this.app.use("/user/*", express.static(clientAppPath));
    this.app.use("/favicon.ico", express.static(clientAppPath));
  }
}