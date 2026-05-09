import { Request, Response, NextFunction } from "express";

export type Role = "admin" | "sales" | "inventory";

declare module "express" {
  interface Request {
    userRole?: Role;
  }
}

function getBearer(req: Request): string | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.slice(7);
}

export function adminAuth(req: Request, res: Response, next: NextFunction): void {
  const ADMIN_SECRET     = process.env.ADMIN_SECRET;
  const SALES_SECRET     = process.env.SALES_SECRET;
  const INVENTORY_SECRET = process.env.INVENTORY_SECRET;

  const token = getBearer(req);
  if (!token) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  if (ADMIN_SECRET && token === ADMIN_SECRET) {
    req.userRole = "admin"; next(); return;
  }
  if (SALES_SECRET && token === SALES_SECRET) {
    req.userRole = "sales"; next(); return;
  }
  if (INVENTORY_SECRET && token === INVENTORY_SECRET) {
    req.userRole = "inventory"; next(); return;
  }

  res.status(401).json({ error: "Non autorisé" });
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== "admin") {
    res.status(403).json({ error: "Accès réservé aux administrateurs" });
    return;
  }
  next();
}

export function requireAdminOrSales(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== "admin" && req.userRole !== "sales") {
    res.status(403).json({ error: "Accès non autorisé" });
    return;
  }
  next();
}

export function requireAdminOrInventory(req: Request, res: Response, next: NextFunction): void {
  if (req.userRole !== "admin" && req.userRole !== "inventory") {
    res.status(403).json({ error: "Accès non autorisé" });
    return;
  }
  next();
}
