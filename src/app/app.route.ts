import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';
import { DashComponent } from './dash/main';

import { LoginComponent } from './login/login';

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login',component: LoginComponent },
    { path: 'dash', component: DashComponent,canActivate:[AuthGuard] },

    
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
