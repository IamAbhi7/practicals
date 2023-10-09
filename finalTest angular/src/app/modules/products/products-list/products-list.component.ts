import { Component } from '@angular/core';
import { ProductService } from './product-service.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddEditProductsComponent } from '../add-edit-products/add-edit-products.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  public totalCount: number = 0;
  public products: any[] = [];
  public addEditProductModal !: BsModalRef;
  public deleteProductModal !: BsModalRef;

  constructor(private productService: ProductService,
    private toastrService: ToastrService,
    private modalService: BsModalService) {}

  ngOnInit(){
    this.loadProducts();
  }

  private loadProducts(): void{
    this.productService.getProducts().subscribe((response: any) => {
      this.products = response;
      this.totalCount = this.products.length;
    },(error: any) => {
      this.toastrService.error("Error loading products list","Error")
    })
  } 

  openAddEditProductModal(product: any = null): void {
    this.addEditProductModal = this.modalService.show(AddEditProductsComponent,{
      initialState: { product: product}, class:"modal-lg",
      ignoreBackdropClick: true
    });

    this.addEditProductModal.content.close.subscribe(() => {
      this.addEditProductModal.hide();
      this.loadProducts();
    })
  }

  openDeleteProductModal(product: any): void{
    this.deleteProductModal = this.modalService.show(DeleteProductComponent,{
      initialState: { product: product}, 
      class:"modal-sm",
      ignoreBackdropClick: true
    });

    this.deleteProductModal.content.close.subscribe(() => {
      this.deleteProductModal.hide();
      this.loadProducts();
    })
  }
}
