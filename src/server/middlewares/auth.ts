import { Request, Response, NextFunction } from "express";

export type Role = "admin" | "worker";

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
  const adminSecret = process.env.ADMIN_SECRET;
  const workerSecret = process.env.WORKER_SECRET;

  if (!adminSecret) {
    res.status(503).json({ error: "Admin non configuré — définissez ADMIN_SECRET" });
    return;
  }

  const token = getBearer(req);
  if (!token) {
    res.status(401).json({ error: "Non autorisé" });
    return;
  }

  if (token === adminSecret) {
    req.userRole = "admin";
    next();
    return;
  }

  if (workerSecret && token === workerSecret) {
    req.userRole = "worker";
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
