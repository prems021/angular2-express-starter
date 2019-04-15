

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { DashComponent } from './dash/dash';
import { HomeComponents } from './home/home';
import { LoginComponent } from './login/login';
import { Bill_b2b } from './bill/b2b/main';
import { Greeting_Component } from './admin/greeting/main';
import { Tax_manageComponent } from './admin/manage_tax/main';
import { Add_product } from './product/add_product';
import { Invoiceall_b2b } from './bill/view/b2b/main';
import { Invoiceall_b2c } from './bill/view/b2c/main';
import { Update_invoice_b2b } from './bill/update/b2b/main';
import { Update_invoice_b2c } from './bill/update/b2c/main';
import { Customer_Component } from './admin/customer/main';
import { Update_product } from './product/update';
import { MainReportComponent } from './reports/main/main';
import { Expence_main } from './expence/main';
import { ListStock } from './reports/stock/main';
import { Revenue_report } from './reports/revenue/main';
import { Purchase_report } from './reports/purchase/main';
import { Expense_report } from './reports/expense/main';
import  { SalesReport } from './reports/sales/main';
import { PaymentComponents } from './admin/cash_intake/main';
import { Customer_statement } from './reports/customer/main';
import { TestComponents } from './admin/test_admin/main';

const routes: Routes = [
    { path: '', component: HomeComponents },
    { path: 'login',component: LoginComponent },
    { path: 'dash', component: DashComponent,canActivate:[AuthGuard] },
    { path: 'b2b', component: Bill_b2b,canActivate:[AuthGuard] },
    { path: 'invoice-all-b2b', component: Invoiceall_b2b,canActivate:[AuthGuard] },
    { path: 'invoice-all-b2c', component: Invoiceall_b2c,canActivate:[AuthGuard] },
    { path: 'update-all-b2b', component : Update_invoice_b2b ,canActivate:[AuthGuard]},
    { path: 'update-all-b2c', component : Update_invoice_b2c ,canActivate:[AuthGuard]},
    { path: 'add-product', component: Add_product,canActivate:[AuthGuard] },
    { path: 'update-product', component: Update_product,canActivate:[AuthGuard] },
    { path: 'set-greeting', component: Greeting_Component,canActivate:[AuthGuard] },
    { path: 'manage-tax', component: Tax_manageComponent,canActivate:[AuthGuard] },
    { path: 'manage-customer', component: Customer_Component,canActivate:[AuthGuard] },
    { path: 'reports-main', component: MainReportComponent,canActivate:[AuthGuard] },
    { path: 'expense-main', component: Expence_main,canActivate:[AuthGuard] },
    { path: 'report_stock', component: ListStock,canActivate:[AuthGuard] },
    { path: 'report_revenue', component: Revenue_report,canActivate:[AuthGuard] },
    { path: 'purchase_report', component: Purchase_report,canActivate:[AuthGuard] },
    { path: 'expense_report', component: Expense_report,canActivate:[AuthGuard] },
    { path: 'sales_report', component: SalesReport,canActivate:[AuthGuard] },
    { path: 'cash_intake', component: PaymentComponents,canActivate:[AuthGuard] },
    { path: 'customer_statement', component: Customer_statement,canActivate:[AuthGuard] }, 
    { path: 'test_comp', component: TestComponents,canActivate:[AuthGuard] },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
