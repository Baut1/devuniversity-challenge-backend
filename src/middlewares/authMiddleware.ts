import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-bpabacel53tiyxn6.us.auth0.com/.well-known/jwks.json', // Cambia esto por tu dominio Auth0
  }) as unknown as GetVerificationKey, // Fuerza el tipo como `unknown` primero
  audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE, // Reemplaza por el API Identifier de Auth0
  issuer: process.env.AUTH0_ISSUER_BASE_URL, // Reemplaza por tu dominio Auth0
  algorithms: ['RS256'],
});

export default checkJwt;
