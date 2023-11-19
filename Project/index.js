//////////////////initialize EXPRESS APP /////////////////
const express = require("express");
const app = express();
// =============  GLOBAL MIDDLEWARE  ===============s
app.use(express.json());
app.use(express.urlencoded({ extended : true }));//to access url from encoded
app.use(express.static('uploud'));// to show the images
const cors = require("cors");
app.use(cors()); // ALLOW HTTP REQUESTS --> 3n tarek el LOCALHOST
// ============= REQUIRE MODULES  ===============
const auth=require("./routes/Auth");
const med=require("./routes/med");
const category = require('./routes/category');
const request = require("./routes/request");
const search = require("./routes/search");

// ============= RUN THE APP  ===============
app.listen(4000,"localhost",()=>{
    console.log("SERVER IS RUNNING ");
});

// ============= API ROUTES [ ENDPOINTS ]  ===============
app.use("/auth",auth);
app.use("/med",med);
app.use("/category",category);
app.use("/request",request);
app.use("/search",search);