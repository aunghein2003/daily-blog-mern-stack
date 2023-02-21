const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blogs", require("./routes//blogRoutes"));

app.listen(port, () => console.log(`Server is running on port ${port}`));
