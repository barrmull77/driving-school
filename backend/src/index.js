const express = require("express");
const sessions = require("./data/sessions");
const cors = require("cors");
const delayPromise = require("./lib/delayPromise");

const app = express();
const port = 3100;

app.use(cors());

app.get("/api/sessions", async (req, res) => {
    await delayPromise(Math.random() * 500);
    res.send(sessions);
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}`);
});
