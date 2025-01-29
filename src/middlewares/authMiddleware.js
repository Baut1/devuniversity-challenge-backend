"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const checkJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-bpabacel53tiyxn6.us.auth0.com/.well-known/jwks.json', // Cambia esto por el dominio Auth0
    }), // Fuerza el tipo como `unknown` primero
    audience: process.env.AUTH0_AUDIENCE, // Reemplaza por el API Identifier de Auth0
    issuer: process.env.AUTH0_ISSUER_BASE_URL, // Reemplaza por el dominio Auth0
    algorithms: ['RS256'],
});
exports.default = checkJwt;
