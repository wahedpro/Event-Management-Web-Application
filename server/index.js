const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send("NexusEvents server is running");
})

app.listen(port, () => {
    console.log(`NexusEvents server is running on port: ${port}`);
})