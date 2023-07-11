import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/home/login/login.component";
import { RegisterComponent } from "./components/home/register/register.component";
import { PasswordRecoverComponent } from "./components/home/password-recover/password-recover.component";
import { DashboardComponent } from "./components/admin/dashboard/dashboard.component";
import { EstoqueCadastroComponent } from "./components/admin/estoque-cadastro/estoque-cadastro.component";
import { EstoqueConsultaComponent } from "./components/admin/estoque-consulta/estoque-consulta.component";
import { EstoqueEdicaoComponent } from "./components/admin/estoque-edicao/estoque-edicao.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
        path: 'home/login',
        component: LoginComponent
    },
    {
        path: 'home/register',
        component: RegisterComponent,
    },
    {
        path: 'home/password-recover',
        component: PasswordRecoverComponent
    },
    {
        path: 'admin/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/estoque-cadastro',
        component: EstoqueCadastroComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/estoque-consulta',
        component: EstoqueConsultaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'admin/estoque-edicao/:id',
        component: EstoqueEdicaoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home/login'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule { }