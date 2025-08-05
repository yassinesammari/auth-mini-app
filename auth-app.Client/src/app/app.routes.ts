import { Routes } from '@angular/router';
import { AuthGuardService } from './data/services/Guards/auth-guard.service';
import { GuestGuardService } from './data/services/Guards/guest-guard.service';

export const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./pages/main/main.module')
        .then(mod => mod.MainModule)
    },
    {
        path: '',
        canActivate: [GuestGuardService],
        loadChildren: () => import('./pages/auth/auth.module')
        .then(mod => mod.AuthModule)
    },
    { path: "", redirectTo: "", pathMatch: "full" },
    { path: "**", redirectTo: "" },
];
