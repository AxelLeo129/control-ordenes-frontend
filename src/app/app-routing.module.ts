import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  SellerGuard
} from './guards/seller.guard';
import {
  LoginRegisterComponent
} from './pages/auth/login-register/login-register.component';
import {
  CheckoutComponent
} from './pages/products/checkout/checkout.component';
import {
  ListProductsComponent
} from './pages/products/list-products/list-products.component';
import {
  ReportsComponent
} from './pages/products/reports/reports.component';

const routes: Routes = [{
    path: '',
    component: ListProductsComponent
  },
  {
    path: 'productos',
    component: ListProductsComponent
  },
  {
    path: 'login',
    component: LoginRegisterComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'reports',
    component: ReportsComponent,
    canActivate: [SellerGuard],
    data: {
      expectedRol: ['admin', 'vendedor']
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}