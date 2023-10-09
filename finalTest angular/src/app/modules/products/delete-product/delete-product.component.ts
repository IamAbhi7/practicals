import { Component,EventEmitter,Output,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../products-list/product-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})

export class DeleteProductComponent {
  @Input() product: any;
  @Output() close = new EventEmitter();

  constructor(private productService : ProductService,
  private toastrService : ToastrService){} 

  public onClose(): void{
    this.close.emit(); 
  }

  public onDelete(): void{
    this.deleteProduct(this.product)
  }

  private deleteProduct(product: any): void{
    this.productService.deleteProduct(product).subscribe((response: any) => {
      this.toastrService.success("Product deleted successfully","Success");
      this.onClose();
    },(error: any) => {
      this.toastrService.error("Error deleted product","Error")
    });
  }
}
