import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  nombre_usuario: string;
  total: number = 0;
  promedio: number = 0;
  productos: Array<any> = [];

  constructor(private generalService: GeneralService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getData();
  }

  async getData() {
    this.nombre_usuario = this.authService.getUsername();
    const id: string = this.authService.getID();
    this.productos = await this.generalService.get('/producto_compra/reports/' + id);
    const ObjT = await this.generalService.get('/producto_compra/total/' + id);
    this.total = ObjT.total;
    const ObjM = await this.generalService.get('/producto_compra/promedio/' + id);
    this.promedio = ObjM.mean;
  }

}
