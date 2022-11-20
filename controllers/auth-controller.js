const db = require("mongodb");
const User = require("../models/user");

const validation = require("../util/validation");

const validateSession = require("../util/validation-session");

const createUserSession = require("../util/authedication");

function signUpForm(req, res) {
  const sessionErrorData = validateSession.getSessionErrorData(req, {
    email: "",
    confirmEmail: "",
    password: "",
    fullname: "",
    street: "",
    postalCode: "",
    city: "",
  });
  res.render("customer/auth/sign-up", { inputData: sessionErrorData });
}

async function loginForm(req, res) {
  const sessionErrorData = validateSession.getSessionErrorData(req, {
    email: "",
    password: "",
  });
  res.render("customer/auth/login", { inputData: sessionErrorData });
}

async function newUserSignUp(req, res) {
  const userdata = req.body;
  if (!validation.userCredentialsAreValid(userdata)) {
    validateSession.flashErrorsToSession(
      req,
      {
        message:
          "Please check your input.Password must be at least 6 characters long,postal code must be 5 characters long and a number.",
        ...req.body,
      },
      function () {
        res.redirect("/sign-up");
      }
    );
    return;
  }

  const user = new User(userdata.email, userdata.password, userdata.fullname,
    userdata.street,
    userdata["postal-code"],
    userdata.city
  );

  const userExistsAlready = await user.userExistsAlready();

  if (userExistsAlready) {
    validateSession.flashErrorsToSession(
      req,
      {
        message: "User already exists!",
        ...req.body,
      },
      function () {
        res.redirect("/sign-up");
      }
    );
    return;
  }

  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

async function postLogin(req, res) {
  const userData = req.body;
  const userEmail = userData.email;
  const userPassword = userData.password;

  const user = new User(userEmail, userPassword);
  let existingUser;
  try {
    existingUser = await user.getExistingUser();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    validateSession.flashErrorsToSession(
      req,
      {
        message: "Could not log in,please check your email and password",
        email: userEmail,
        password: userPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  const success = await user.login(existingUser.password);

  if (!success) {
    validateSession.flashErrorsToSession(
      req,
      {
        message: "Could not log in,please check your email and password",
        email: userEmail,
        password: userPassword,
      },
      function () {
        res.redirect("/login");
      }
    );

    return;
  }

  createUserSession.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

async function logout(req, res) {
  createUserSession.destroyUserAuthSession(req);
  res.redirect("/login");
}

module.exports = {
  signUpForm: signUpForm,
  loginForm: loginForm,
  newUserSignUp: newUserSignUp,
  postLogin: postLogin,
  logout: logout,
};
