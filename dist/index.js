"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const configFilePath = path_1.default.resolve(__dirname, 'config.json');
app.use(body_parser_1.default.json());
if (!fs_1.default.existsSync(configFilePath)) {
    fs_1.default.writeFileSync(configFilePath, JSON.stringify({}));
}
app.get('/api/config', (req, res) => {
    fs_1.default.readFile(configFilePath, 'utf8', (err, data) => {
        if (err)
            return res.status(500).json({ error: 'Failed to read config file' });
        res.json(JSON.parse(data));
    });
});
app.put('/api/config', (req, res) => {
    fs_1.default.writeFile(configFilePath, JSON.stringify(req.body, null, 2), (err) => {
        if (err)
            return res.status(500).json({ error: 'Failed to write config file' });
        res.status(200).json({ message: 'Config updated successfully' });
    });
});
app.listen(port, () => {
    console.log(`Server running at https:localhost:${port}`);
});
