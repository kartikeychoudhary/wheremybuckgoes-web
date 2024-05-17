import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {inject} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { initFlowbite } from 'flowbite';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  ) => {
    const authService = inject(AuthService);
    const router:Router = inject(Router)
    const allowedRoutes = ['/login', '/register']
    if(allowedRoutes.includes(state.url)) {return true;}
    if(authService.isAuthenticated()) { setTimeout(() => {
      initFlowbite();
    }, 200);return true;}
    router.navigate(['/login']);
    return false;
};