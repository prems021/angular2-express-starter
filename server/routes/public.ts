import { Request, Response, Router } from "express";

import { Invoice_master } from '../model/invoice_master';
import { Hb_customers } from '../model/hb_customers';
import { Hb_products } from '../model/products';
import { Expence_category } from '../model/expense_category';
import { Income_expence } from '../model/income_expence';
import { Expence_detail } from '../model/expence_detail';
import { Third_party } from '../model/third_party';
import { Invoice_slave } from '../model/invoice_slave';
import { Cash_reciept} from '../model/cash_reciept';

const publicRouter: Router = Router();

publicRouter.get("/simple", (request: Request, response: Response) => {

  return response.json({
    text: "Hello Angular 2",
    title: "Greetings.",
  });
});

export { publicRouter };
