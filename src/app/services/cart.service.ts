import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = [];
  // total = 0;

  constructor() {}

  add(product: any, cantidad: number = 1) {
    this.cart = this.get();
    if (this.cart.length != 0) {
      let index = this.cart.findIndex(p => p.id === product.id);
      if (index == -1) {
        product.qty = cantidad;
        product.total = product.precio;
        this.cart.push(product);
        this.increase((this.cart.length - 1), "push");
      } else {
        this.increase(index, "increase");
      }
    } else {
      product.qty = cantidad;
      product.total = product.precio;
      this.cart.push(product);
      this.increase(0, "push");
    }
    sessionStorage.setItem('products', JSON.stringify(this.cart));
  }

  get() {
    this.cart = JSON.parse(sessionStorage.getItem('products'));
    if (this.cart == null) {
      this.cart = [];
    }
    return this.cart;
  }

  clear() {
    this.cart = [];
    sessionStorage.setItem('products', JSON.stringify(this.cart));
  }

  increase(index: number, accion: String) {
    if (accion == "increase") {
      this.cart[index].qty += 1;
    }
    this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].precio);
    sessionStorage.setItem('products', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  decrease(product: any) {
    this.cart = this.get();
    const index = this.cart.findIndex(p => p.id === product.id);
    if (this.cart[index].qty > 1) {
      this.cart[index].qty = this.cart[index].qty - 1;
      this.cart[index].total = this.cart[index].qty * parseInt(this.cart[index].precio);
    } else {
      this.cart.splice(index, 1);
    }
    sessionStorage.setItem('products', JSON.stringify(this.cart));
    this.calculateTotal();
  }

  calculateTotal(): void {
    let finalPrice = this.getVariable('finalPrice');
    let totalQty = this.getVariable('totalQty');
    this.cart.forEach(item => {
      totalQty = totalQty + parseInt(item.qty);
      finalPrice = finalPrice + parseInt(item.total)
    });
    this.setVariable('finalPrice', finalPrice);
    this.setVariable('productCount', this.cart.length);
    this.setVariable('totalQty', totalQty);
  }

  getVariable(nombre: string): number {
    let varible: number = JSON.parse(localStorage.getItem(nombre));
    console.log(varible, nombre)
    if(varible == null)
      varible = 0;
    return varible;
  }

  setVariable(nombre: string, valor: number): void {
    sessionStorage.setItem(nombre, JSON.stringify(valor)); 
  }

}