import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-products-seller',
  templateUrl: './products-seller.component.html',
  styles: []
})
export class ProductsSellerComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'acciones'];
  dataSource: Array < any > = [];

  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.getData(); 
  }

  async getData() {
    const data: any = await this.generalService.get('/api/lista');
    this.dataSource = data;
  }

  open() {
    
  }

}
