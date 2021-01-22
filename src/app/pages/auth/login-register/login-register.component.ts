import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  logeado: boolean = false;
  logeado_fallido: boolean = false;
  login_form: FormGroup;
  roles: string[] = [];
  iniciar_sesion_activo: string = 'active';
  registro_activo: string = '';
  register_form: FormGroup;
  pattern: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private authService: AuthService, private router: Router, private toastrService: ToastrService) {
    this.login_form = this.createFormGroup();
    this.register_form = this.createFormGroup1();
  }

  ngOnInit(): void {
    if (this.authService.getToken()) {
      this.logeado = true;
      this.logeado_fallido = false;
      this.roles = this.authService.getAuthorities();
    }
  }

  createFormGroup() {
    return new FormGroup({
      'nombre_usuario': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  createFormGroup1() {
    return new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.pattern(this.pattern)]),
      'nombreUsuario': new FormControl('', [Validators.required]),
      'contrasenia': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  changeActive(): void {
    if (this.iniciar_sesion_activo == 'active') {
      this.registro_activo = 'active';
      this.iniciar_sesion_activo = '';
    } else {
      this.iniciar_sesion_activo = 'active';
      this.registro_activo = '';
    };
  }

  login(): void {
    const objL = {
      nombreUsuario: this.login_form.value.nombre_usuario,
      password: this.login_form.value.password
    }
    this.authService.login(objL).then((res: any) => {
      this.logeado = true;
      this.logeado_fallido = false;
      this.authService.setToken(res.token);
      this.authService.setUsername(res.nombreUsuario);
      this.authService.setAuthorities(res.authorities);
      this.roles = res.authorities;
      this.authService.getUser(res.nombreUsuario).then((res: any) => {
        this.authService.setID(res.id);
        this.router.navigate(["/products"]);
      }).catch(err => {
        this.logeado = false;
        this.logeado_fallido = true;
        this.toastrService.error('Error en nombre de usuario o contraseña.');
      });
    }).catch(err => {
      this.logeado = false;
      this.logeado_fallido = true;
      this.toastrService.error('Error en nombre de usuario o contraseña.');
    });
  }

  signup(): void {
    const objR = {
      nombre: this.register_form.value.nombre,
      email: this.register_form.value.email,
      nombreUsuario: this.register_form.value.nombreUsuario,
      password: this.register_form.value.contrasenia
    }
    this.authService.newUser(objR).then((res: any) => {
      this.changeActive();
      this.toastrService.success("Usuario guardado, por favor inicia sesión");
    }).catch(err => {
      this.logeado = false;
      this.logeado_fallido = true;
      this.toastrService.error('Error en nombre de usuario o contraseña.');
    });
  }

  get nombre_usuario() {
    return this.login_form.get('nombre_usuario');
  }
  get password() {
    return this.login_form.get('password');
  }
  get nombre() {
    return this.register_form.get('nombre');
  }
  get email() {
    return this.register_form.get('email');
  }
  get nombreUsuario() {
    return this.register_form.get('nombreUsuario');
  }
  get contrasenia() {
    return this.register_form.get('contrasenia');
  }

}