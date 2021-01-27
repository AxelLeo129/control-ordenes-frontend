import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddCartComponent } from 'src/app/components/modal-add-cart/modal-add-cart.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-products-seller',
  templateUrl: './products-seller.component.html',
  styles: []
})
export class ProductsSellerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource: Array < any > = [];

  constructor(private generalService: GeneralService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getData(); 
  }

  async getData() {
    const data: any = await this.generalService.get('/producto/lista');
    this.dataSource = data;
  }

  open(producto: any) {
    const modalRef = this.modalService.open(ModalAddCartComponent);
    modalRef.componentInstance.producto = producto;
  }

}
