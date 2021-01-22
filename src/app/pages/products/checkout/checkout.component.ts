import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  cart: Array<any> = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cart = this.cartService.get();
    let total_temporal: number = 0;
    this.cart.forEach((e) => {
      total_temporal = total_temporal + parseInt(e.total)
    });
    this.total = total_temporal;
  }

  rest(producto: any, indice: number) {
    if(producto.qty > 0) {
      producto.qty--;
      this.cartService.decrease(producto);
      this.getCart();
    }
  }

  sum(producto: any){
    producto.qty++;
    this.cartService.add(producto, producto.qty++);
    this.getCart();
  }

}
