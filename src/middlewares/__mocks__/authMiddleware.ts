// __mocks__/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';

const mockAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Simula que el usuario está autenticado
  req.auth = { sub: 'auth0|test_user' }; // `sub` simulado
  next();
};

export default mockAuthMiddleware;
