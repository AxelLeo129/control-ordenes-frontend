import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.scss']
})
export class ModalProductComponent implements OnInit {

  @Input() producto: any;
  loading: boolean = false;
  save_form: FormGroup;
  buttons: any;

  constructor(private authService: AuthService, public activeModal: NgbActiveModal, private generalService: GeneralService, private utilitiesService: UtilitiesService, private toastrService: ToastrService) { 
    this.save_form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.buttons = Object.values(document.getElementsByTagName('button'));
    this.verifyIncommingData();
  }

  createFormGroup() {
    return new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'precio': new FormControl('', [Validators.required]),
    });
  }

  verifyIncommingData() {
    if (this.producto != false) {
      this.save_form.controls['nombre'].setValue(this.producto.nombre);
      this.save_form.controls['precio'].setValue(this.producto.precio);
    }
  }

  create() {
    this.buttons.forEach((element: any) => {
      element.disabled = true;
    });
    this.loading = true;
    if (this.producto != false) {
      this.utilitiesService.showSweetAlertConfirm('¡Atención!', `<p>¿Está seguro de actualizar este producto?<p>`, 'Aceptar', 'Cancelar').then((res: any) => {
        if (res.isConfirmed == true) {
          this.generalService.put('/producto/update/' + this.producto.id, this.save_form.value).then(() => {
            this.buttons.forEach((element: any) => {
              element.disabled = false;
            });
            this.loading = false;
            this.activeModal.close('reload');
            this.toastrService.success("Producto actualizado exitosamente.");
          }).catch((err => {
            this.buttons.forEach((element: any) => {
              element.disabled = false;
            });
            console.log(err);
            this.loading = false;
            this.activeModal.close();
            this.toastrService.error('Error, por favor, intenta más tarde.');
          }));
        } else {
          this.buttons.forEach((element: any) => {
            element.disabled = false;
          });
          this.loading = false;
        }
      });
    } else {
      let objU: any = {
        nombre: this.save_form.value.nombre,
        precio: this.save_form.value.precio,
        vendedor: JSON.parse(this.authService.getID())
      }
      this.generalService.post('/producto/create', objU).then(() => {
        this.buttons.forEach((element: any) => {
          element.disabled = false;
        });
        this.loading = false;
        this.activeModal.close('reload');
        this.toastrService.success("Producto almacenado exitosamente.");
      }).catch((err => {
        console.log(err);
        this.buttons.forEach((element: any) => {
          element.disabled = false;
        });
        this.loading = false;
        this.activeModal.close();
        this.toastrService.error('Error, por favor, intenta más tarde.');
      }));
    }
  }

  get nombre() {
    return this.save_form.get('nombre');
  }
  get precio() {
    return this.save_form.get('precio');
  }

}
