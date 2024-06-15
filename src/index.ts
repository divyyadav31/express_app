import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const configFilePath = path.resolve(__dirname, "config.json");

app.use(bodyParser.json());

if (!fs.existsSync(configFilePath)) {
  fs.writeFileSync(configFilePath, JSON.stringify({}));
}

app.get("/api/config", (req, res) => {
  fs.readFile(configFilePath, "utf8", (err, data) => {
    if (err)
      return res.status(500).json({ error: "Failed to read config file" });
    res.json(JSON.parse(data));
  });
});

app.put("/api/config", (req, res) => {
  fs.writeFile(configFilePath, JSON.stringify(req.body, null, 2), (err) => {
    if (err)
      return res.status(500).json({ error: "Failed to write config file" });
    res.status(200).json({ message: "Config updated successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
