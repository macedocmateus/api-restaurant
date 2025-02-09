import { Router } from "express";

import { TablesSessionsController } from "../controllers/tables-sessions-controller";

const tablesSessionsRoutes = Router();
const tablesSessionsController = new TablesSessionsController();

tablesSessionsRoutes.post("/", tablesSessionsController.create);
tablesSessionsRoutes.get("/", tablesSessionsController.index);

export { tablesSessionsRoutes };
