import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-modal-input-checkout',
  templateUrl: './modal-input-checkout.component.html',
  styleUrls: ['./modal-input-checkout.component.scss']
})
export class ModalInputCheckoutComponent implements OnInit {

  name_form: FormGroup;
  buttons: any;
  @Input() total: number;

  constructor(public modal: NgbActiveModal, private generalService: GeneralService, private cartService: CartService, private toastrService: ToastrService) { 
    this.name_form = this.createFormGroup();
  }

  ngOnInit(): void {
    this.buttons = Object.values(document.getElementsByTagName('button'));
  }

  createFormGroup() {
    return new FormGroup({
      'nombre': new FormControl('', [Validators.required])
    });
  }

  buy() {
    this.buttons.forEach((element: any) => {
      element.disabled = true;
    });
    const objC = {
      nombre: this.name_form.value.nombre,
      total: this.total
    }
    this.generalService.post('/compra/create', objC).then((res: any) => {
      const id = parseInt(res.mensaje.split(">", 2)[1]);
      let promesas: Array<Promise<any>> = [];
      const carrito = this.cartService.get();
      carrito.forEach((element: any) => {
        const objPC = {
          cantidad: element.qty,
          compra: id,
          producto: element.id,
          precio: element.precio
        }
        promesas.push(this.generalService.post('/producto_compra/create', objPC));
      });
      Promise.all(promesas).then(() => {
        this.buttons.forEach((element: any) => {
          element.disabled = false;
        });
        this.modal.close('reload');
        sessionStorage.removeItem('products');
        this.toastrService.success("Compra realizada exitosamente.");
      }).catch((err: any) => {
        console.log(err);
        this.modal.close();
        this.toastrService.error("Error, por favor inténtelo más tarde.");
      });
    })
  }

  get nombre() {
    return this.name_form.get('nombre');
  }

}
