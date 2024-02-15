import path from "path";
import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { YourPrioritiesApi } from "@yrpri/api/app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class AoiServerApi extends YourPrioritiesApi {
  oldEarlNames: Set<unknown>;

  constructor(port: number) {
    super(port);
    this.oldEarlNames = new Set();
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
    super.setupStaticFileServing();
    const baseDir = path.join(__dirname, "../../webApps/client");

    const oldEarlStaticPath = path.join(baseDir, 'dist/oldVersionInformation.html');

    // Middleware to check for old URLs
    this.app.use((req, res, next) => {
      const requestPath = req.path;
      if (this.oldEarlNames.has(requestPath)) {
        return res.sendFile(oldEarlStaticPath);
      }
      next();
    });
  }
}
