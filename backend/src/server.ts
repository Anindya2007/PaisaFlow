import express from "express";

const app = express();

const PORT = 5001;

app.get("/", (req, res) => {
    res.send("Finance Manager API is running!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});