import { Request, Response, Router } from "express";

const adminRouter: Router = Router();


adminRouter.get("/", (request: Request, response: Response) => {

  response.json(user);
});

export { adminRouter };
