const path = require("path");

const express = require("express");
const session = require("express-session");
const csrf = require('csurf');


const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const db = require("./data/database");
const shopRoutes = require('./routes/customer/shop')
const authRoutes = require('./routes/customer/auth')
const adminRoutes = require('./routes/admin')
const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const sessionConfig = require('./config/session-config');
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");

const mongoDbSessionStore = sessionConfig.createSessionStore(session);
const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));


app.use(csrf());

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(shopRoutes);
app.use(productsRoutes);
app.use("/admin", adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
