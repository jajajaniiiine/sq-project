const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
const jwt = require("jsonwebtoken");

const server = createServer();

//staaaart!!!!
server.express.use(cookieParser());

//decoding JWT so we can get  the userId on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;

  //check if there is a cookies
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});

// Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    "{id,  permissions,  email, name}"
  );
  console.log(user);
  req.user = user;
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      // origin: process.env.FRONTEND_URL,
    },
  },
  (deets) => {
    console.log(`Server is now  running on port http:/localhost:${deets.port}`);
  }
);
