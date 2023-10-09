import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  public getProducts(): any {
    // const response = this.http.get(this.baseUrl, { observe: 'response' });
    // return response;
    return this.http.get('http://localhost:3000/products')
  }

  public addProduct(product:any):any{
    return this.http.post('http://localhost:3000/products',product);
  }

  public updateProduct(product:any):any{
    return this.http.put(`http://localhost:3000/products/${product.id}`,product);
  }

  public deleteProduct(product:any):any{
    return this.http.delete(`http://localhost:3000/products/${product.id}`);
  }

}
