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

  closeResult = '';
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource: Array < any > = [];
  roles: string[];
  rol_admin: boolean = false;
  uid: number;

  constructor(private authService: AuthService, private generalService: GeneralService, private modalService: NgbModal, private utilitiesService: UtilitiesService, private toastrService: ToastrService) { }

  async ngOnInit() {
    this.getData();
    this.roles = this.authService.getAuthorities();
    this.roles.forEach(rol => {
      if(rol == 'ROLE_VENDEDOR')
        this.rol_admin = true;
    })
    if(this.authService.getToken()) {
      const usuario: any = await this.authService.getUser(this.authService.getUsername());
      this.uid = usuario.id;
    } 
  }

  async getData() {
    let data: any;
    if(this.uid)
      data = await this.generalService.get('/api/lista');
    else
      data = await this.generalService.get('/api/lista');
    this.dataSource = data;
  }

  open(producto: any) {
    const modalRef = this.modalService.open(ModalProductComponent);
    modalRef.componentInstance.producto = producto;
    modalRef.result.then((result) => {
      if(result == 'reload')
        this.getData();
    });
  }

  deleteProduct(id: number) {
    this.utilitiesService.showSweetAlertConfirm('¡Atención!', '¡Está seguro de eliminar este producto?', 'Aceptar', 'Cancelar').then((res: any) => {
      if (res.isConfirmed == true) { 
        this.generalService.delete('/delete/' + id).then(() => {
          this.toastrService.success('Producto eliminado exitosamente');
          this.getData();
        }).catch(() => {
          this.toastrService.error('Por favor, itentelo más tarde.');
        })
      }
    })
  }

}
