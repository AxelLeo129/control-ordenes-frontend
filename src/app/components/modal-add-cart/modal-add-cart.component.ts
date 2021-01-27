import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-modal-add-cart',
  templateUrl: './modal-add-cart.component.html',
  styleUrls: ['./modal-add-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAddCartComponent implements OnInit {

  @Input() producto: any;
  cantidad: number = 1;
  total: number = 0;

  constructor(public modal: NgbActiveModal, private cartService: CartService, private toastrService: ToastrService, private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.total = (this.cantidad * this.producto.precio);
  }

  sum() {
    this.cantidad++;
    this.total = (this.cantidad * this.producto.precio);
    this.change.detectChanges();
  }

  rest() {
    if(this.cantidad > 0) {
      this.cantidad--;
      this.total = (this.cantidad * this.producto.precio);
      this.change.detectChanges();
    }
  }

  addToCart() {
    this.cartService.add(this.producto, this.cantidad);
    this.toastrService.success('Producto agregado al carrito');
    this.modal.dismiss();
  }

}
