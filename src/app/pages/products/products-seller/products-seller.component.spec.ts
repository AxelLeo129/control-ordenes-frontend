import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSellerComponent } from './products-seller.component';

describe('ProductsSellerComponent', () => {
  let component: ProductsSellerComponent;
  let fixture: ComponentFixture<ProductsSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
