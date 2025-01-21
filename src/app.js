"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
// load env vars (MONGO_URI, etc)
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routas
app.use('/', taskRoutes_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.use((req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization);
    next();
});
// Configure port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
