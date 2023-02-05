const createError = require("http-errors");
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { db } = require("./src/db/connect");
const passport = require("passport");
const { jwtStrategy } = require('./src/config/passport');

const authRouter = require("./src/auth/auth.route");
const userRouter = require("./src/user/user.route");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.get("/", (req, res) => {
    res.send({ message: "Welcome to AltruFund Backend API" });
});

app.use('*', (req, res) => {
    res.send({message: "Route Not found"})
})

// db.sequelize.sync().then(async () => {
//     await db.roles.findOrCreate({
//       where: { name: 'user' },
//       defaults: {
//         name: 'user',
//         description: 'self permission',
//       },
//     });

//     await db.roles.findOrCreate({
//       where: { name: 'admin' },
//       defaults: {
//         name: 'admin',
//         description: 'all permission',
//       },
//     });

//     await db.categories.findOrCreate({
//       where: { name: 'Health' },
//       defaults: {
//         name: 'Health',
//         status: 'enabled',
//       },
//     });

//     await db.categories.findOrCreate({
//       where: { name: 'Education' },
//       defaults: {
//         name: 'Education',
//         status: 'enabled',
//       },
//     });

//     await db.categories.findOrCreate({
//       where: { name: 'Business' },
//       defaults: {
//         name: 'Business',
//         status: 'enabled',
//       },
//     });

//     await db.categories.findOrCreate({
//       where: { name: 'Physiological' },
//       defaults: {
//         name: 'Physiological',
//         status: 'enabled',
//       },
//     });
//   });

db.sequelize.sync();

module.exports = app;
