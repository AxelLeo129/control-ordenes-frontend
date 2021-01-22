import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService
} from 'src/app/services/auth.service';

@Component({
  selector: 'app-component-menu',
  templateUrl: './component-menu.component.html',
  styles: []
})
export class ComponentMenuComponent implements OnInit {

  logeado: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.getToken())
      this.logeado = true;
    else
      this.logeado = false;
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(['/buy']);
  }

}