const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const { handlingError } = require("./middleware/errorMiddleware");

const port = process.env.PORT || 8000;

//DB Connection
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(handlingError);

app.listen(port, () => console.log(`Server is running on port ${port}`));
