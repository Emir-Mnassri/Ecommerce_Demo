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
  const token = getBearer(req);
  if (!token) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  if (token === "admin") {
    req.userRole = "admin";
    next();
    return;
  }

  if (token === "sales") {
    req.userRole = "sales";
    next();
    return;
  }

  if (token === "inventory") {
    req.userRole = "inventory";
    next();
    return;
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
