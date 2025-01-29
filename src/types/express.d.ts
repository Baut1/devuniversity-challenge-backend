declare namespace Express {
  interface User {
    sub: string; // unique user identifier (eg, auth0|...)
  }

  interface Request {
    auth?: User; // `req.auth` can exist
  }
}
