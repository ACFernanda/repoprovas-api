import cors from "cors";
import express, { json } from "express";
import "express-async-errors";

import router from "./routes/index.js";
import handleErrorsMiddleware from "./middlewares/handleErrorMiddleware.js";

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(handleErrorsMiddleware);

const port = +process.env.PORT;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

export default app;
