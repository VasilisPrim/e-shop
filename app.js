const path = require("path");

const express = require("express");
const session = require("express-session");
const csrf = require('csurf');


const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const db = require("./data/database");

const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin')
const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const sessionConfig = require('./config/session-config');
const errorHandlerMiddleware = require("./middlewares/error-handler");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const protectRoutesMiddleware = require("./middlewares/protect-routes");
const cartMiddleware = require("./middlewares/cart");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const mongoDbSessionStore = sessionConfig.createSessionStore(session);
const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session(sessionConfig.createSessionConfig(mongoDbSessionStore)));


app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);

app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use(protectRoutesMiddleware);
app.use("/orders", ordersRoutes);
app.use("/admin", adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to the database!");
    console.log(error);
  });
