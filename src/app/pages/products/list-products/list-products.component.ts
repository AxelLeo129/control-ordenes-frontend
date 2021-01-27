import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductComponent } from 'src/app/components/modal-product/modal-product.component';
import { GeneralService } from 'src/app/services/general.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource: Array < any > = [];

  constructor(private authService: AuthService, private generalService: GeneralService, private modalService: NgbModal, private utilitiesService: UtilitiesService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    const data: any = await this.generalService.get('/producto/listar_id/' + this.authService.getID());
    this.dataSource = data;
  }

  open(producto: any) {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.producto = producto;
    modalRef.result.then((result) => {
      if(result == 'reload')
        this.getData();
    }).catch(err => console.log(err));
  }

  deleteProduct(id: number) {
    this.utilitiesService.showSweetAlertConfirm('¡Atención!', '¡Está seguro de eliminar este producto?', 'Aceptar', 'Cancelar').then((res: any) => {
      if (res.isConfirmed == true) { 
        this.generalService.delete('/producto/delete/' + id).then(() => {
          this.toastrService.success('Producto eliminado exitosamente');
          this.getData();
        }).catch(() => {
          this.toastrService.error('Por favor, itentelo más tarde.');
        })
      }
    })
  }

}
