import { json, urlencoded } from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as path from "path";
var cors = require('cors');



import { publicRouter } from "./routes/public";
import { adminRouter } from "./routes/admin";
import { dbRouter } from "./routes/db";
import { userRouter } from "./routes/user";
import { testRouter } from "./routes/test";
import { postRouter } from "./routes/post";

const app: express.Application = express();

app.disable("x-powered-by");
app.use(cors());
app.use(json());
app.use(compression());
app.use(urlencoded({ extended: true }));

// api routes

app.use("/api/public", publicRouter);

app.use("/api/admin", adminRouter);

app.use("/api/db", dbRouter);
app.use("/api/user", userRouter);
app.use("/api/test", testRouter);
app.use("/api/post", postRouter);

if (app.get("env") === "production") {

  // in production mode run application from dist folder
  app.use(express.static(path.join(__dirname, "/../client")));
}

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next) => {
  const err = new Error("Not Found");
  next(err);
});

// production error handler
// no stacktrace leaked to user
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  res.status(err.status || 500);
  res.json({
    error: {},
    message: err.message,
  });
});

export { app };
