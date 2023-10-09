import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RouterModule, Routes} from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from 'src/app/shared/helper/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsListComponent } from '../products/products-list/products-list.component';
import { AddEditProductsComponent } from '../products/add-edit-products/add-edit-products.component';
import { DeleteProductComponent } from '../products/delete-product/delete-product.component';
import { AdminComponent } from './components/admin/admin.component';

const routes : Routes = [
  { path: '',
    component: AdminComponent,
    // pathMatch: 'full',
    children: [
      { path:'products', component: ProductsListComponent},
      { path:'home', component: HomeComponent},
      { path:'', redirectTo: '/admin/home', pathMatch:'full' }
    ]
  },
    
]

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ProductsListComponent,
    AddEditProductsComponent,
    DeleteProductComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule, 
    ModalModule.forRoot(),
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    // BrowserAnimationsModule
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
