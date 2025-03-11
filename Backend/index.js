const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const condb = require("../Backend/Database/data");  
const userRoute = require("./Routes/UserRoutes");
const scenarioRoute = require("./Routes/ScenarioRoutes");
const projectRoute = require("./Routes/ProjectRoutes");
const moduleRoute = require("./Routes/ModuleRoutes");
const path = require('path');

const cookieParser = require("cookie-parser");

app.use(cors({
 origin :   'http://localhost:3000',
 credentials: true,
  
}));
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/", userRoute);
app.use("/",projectRoute);
app.use("/",moduleRoute);
app.use("/",scenarioRoute);



condb();


app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
