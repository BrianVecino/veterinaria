import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Turnos } from './pages/turnos/turnos';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    { path: 'dashboard', component:Dashboard},
    { path: 'turnos', component:Turnos},
    { path: '**', redirectTo: 'dashboard'} 
];