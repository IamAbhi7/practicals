import { Component,EventEmitter,Input,Output } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../products-list/product-service.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.scss']
})
export class AddEditProductsComponent {

  @Input() product: any;
  @Output() close = new EventEmitter();

  public productForm = new FormGroup({   
    name: new FormControl("",[Validators.required,Validators.minLength(2),Validators.pattern(/^[A-Za-z\s]+$/)]),
    quantity: new FormControl("",[Validators.required,Validators.max(50),Validators.min(1)]),
    price: new FormControl("",[Validators.required]),
    category: new FormControl("",[Validators.required]),
    review: new FormControl("",[Validators.required])
  });

  constructor(private productService : ProductService,
    private toastrService : ToastrService){} 

  ngOnInit(){
    if(this.product){
      this.productForm.patchValue(this.product)
    }
  }

  public onClose(): void{
    this.close.emit();
  }

  public save(): void{
      let payload = this.assignValueToModel();
      if(!this.product){
        this.addProduct(payload);
      }else{
        this.updateProduct(payload);
      }
  }

  private addProduct(payload: any): void{
    this.productService.addProduct(payload).subscribe((response: any) => {
      this.toastrService.success("Product added successfully","Success");
      this.onClose();
    },(error: any) => {
      this.toastrService.error("Error adding product","Error")
    });
  }

  private updateProduct(payload: any): void{
    this.productService.updateProduct(payload).subscribe((response: any) => {
      this.toastrService.success("Product updated successfully","Success");
      this.onClose();
    },(error: any) => {
      this.toastrService.error("Error updated product","Error")
    });
  }

  private assignValueToModel(): any {
    let product = {
      "id": this.product ? this.product.id : 0,
      "name": this.productForm.get("name")?.value,
      "quantity":this.productForm.get("quantity")?.value,
      "price": this.productForm.get("price")?.value,
      "category": this.productForm.get("category")?.value,
      "review": this.productForm.get("review")?.value
    };  
    return product;
  }

  public checkIfControlValid(controlName: any): boolean{
    return this.productForm.get(controlName)?.invalid &&
    this.productForm.get(controlName)?.errors &&
      (this.productForm.get(controlName)?.dirty || this.productForm.get(controlName)?.touched) ? true : false;
  }

  public checkControlHasError(controlName: any, error: any): boolean {
    return this.productForm.get(controlName)?.hasError(error) ? true : false; 
  }
}
