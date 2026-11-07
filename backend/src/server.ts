import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Finance Manager API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});