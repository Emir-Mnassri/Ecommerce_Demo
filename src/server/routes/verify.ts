import { Router, type IRouter } from "express";

const router: IRouter = Router();

router.get("/admin/verify", (req, res): void => {
  const ADMIN_SECRET     = process.env.ADMIN_SECRET;
  const SALES_SECRET     = process.env.SALES_SECRET;
  const INVENTORY_SECRET = process.env.INVENTORY_SECRET;

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }
  const token = auth.slice(7);

  if (ADMIN_SECRET && token === ADMIN_SECRET) {
    res.json({ role: "admin" }); return;
  }
  if (SALES_SECRET && token === SALES_SECRET) {
    res.json({ role: "sales" }); return;
  }
  if (INVENTORY_SECRET && token === INVENTORY_SECRET) {
    res.json({ role: "inventory" }); return;
  }

  res.status(401).json({ error: "Non autorisé" });
});

export default router;
