import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CreateUserComponent } from './create-user';
import { ChangePasswordComponent } from './change-password';
import { AuthGuard, CreateGuard } from './libs';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: CreateUserComponent, canActivate: [CreateGuard] },
    { path: 'change-password', component: ChangePasswordComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);