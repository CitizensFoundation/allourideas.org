import { runLocalMigrations } from './migration.js';
import { AoiServerApi } from './app.js';

await runLocalMigrations();

const app = new AoiServerApi(
  8000
);

app.listen();
