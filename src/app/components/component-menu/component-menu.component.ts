import {
  Component,
  OnInit
} from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getToken())
      this.logeado = true;
    else
      this.logeado = false;
  }

  logout() {
    this.authService.logOut();
    window.location.reload();
  }

}