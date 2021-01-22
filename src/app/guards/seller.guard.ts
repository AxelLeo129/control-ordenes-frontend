import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SellerGuard implements CanActivate {

  rol_usuario: string;
  
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const rol_esperado = next.data.expectedRol;
    const roles = this.authService.getAuthorities();
    this.rol_usuario = 'vendedor';
    roles.forEach(rol => {
      if(rol == 'ROL_ADMIN') 
        this.rol_usuario = 'admin';
    });
    if(!this.authService.getToken() || rol_esperado.indexOf(this.rol_usuario) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
  
}
