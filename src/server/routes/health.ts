import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "../schemas";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  res.json(HealthCheckResponse.parse({ status: "ok" }));
});

export default router;
