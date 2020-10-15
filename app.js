const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const config = require("./src/config");
const createError = require("./src/helpers/createError");
const logger = require("./logger");
const routes = require("./src/modules/routes");
const connectToDB = require("./database");

// MAkes file uploads possible
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const filePath = "images";
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.disable("x-powered-by");

// serve the static images
app.use("/images", express.static("images"));

// global middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.use(multer({ storage: fileStorage, fileFilter }).single("avatar"));

const apiRouter = express.Router();

// expose routes here
apiRouter.use(routes());

// handler for route-not-found
apiRouter.use((_req, _res, next) => {
  next(
    createError(404, [
      {
        status: 404,
        title: "Route not found",
        detail: "The requested route is not implemented",
      },
    ])
  );
});

// error handler for api router
apiRouter.use((error, _req, res, _next) => {
  if (!error.status) {
    error = createError(500, [
      {
        title: "Internal Server Error",
        detail: error.toString(),
      },
    ]);
  }

  res.status(error.status).json({
    status: error.status,
    errors: error.errors,
    // stack: error.stack,
  });
});

const apiURL = `/api/${config().version}`;
app.use(apiURL, apiRouter);

connectToDB(config().secrets.mongodbURL).then(() => {
  const { port } = config();
  app.listen(port, function onListen() {
    logger.info(`Server is up and running at ${apiURL} on port ${port}`);
  });
});
