import { Injectable } from '@angular/core';
import { productModel } from '../productModel';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl: string;
  GetAllProductsURL: string;
  GetProductByIdURL: string;
  AddProductURL: string;
  UpdateProductURL: string;
  DeleteProductURL: string;
  GetAllquantityPerUnitURL: string;
  GetAllProductByFilterURL: string;
  GetProductNeedReOrderURL: string;



  constructor(private http: HttpClient) {
    this.baseUrl =  "https://localhost:44388";
    this.GetAllProductsURL = this.baseUrl + '/api/Product';
    this.GetProductByIdURL = this.baseUrl + '/api/Product/';
    this.AddProductURL = this.baseUrl + '/api/Product';
    this.UpdateProductURL = this.baseUrl + '/api/Product';
    this.DeleteProductURL = this.baseUrl + '/api/Product/';
    this.GetAllquantityPerUnitURL = this.baseUrl + '/api/Product';
    this.GetAllProductByFilterURL = this.baseUrl + '/api/Product/GetByFilter';
    this.GetProductNeedReOrderURL = this.baseUrl + '/api/Product/GetProductNeedReOrder';
  }

  getProducts() {
    return this.http.get(this.GetAllProductsURL).pipe(
      map((res: any) => res)
    );
  }
  getProductNeedReOrders() {
    return this.http.get(this.GetProductNeedReOrderURL).pipe(
      map((res: any) => res)
    );
  }

  getProductsByFilter(productModel: productModel) {
    return this.http.post(this.GetAllProductByFilterURL,productModel).pipe(
      map((res: any) => res)
    );
  }

  getProductsByID(id: number) {
    return this.http.get(this.GetProductByIdURL + id).pipe(
      map((res: any) => res)
    );
  }

  addProduct(productModel: productModel) {
    return this.http.post(this.AddProductURL , productModel).pipe(
      map((res: any) => res)
    );
  }

  updateProduct(productModel: productModel) {
    return this.http.put(this.UpdateProductURL , productModel).pipe(
      map((res: any) => res)
    );
  }

  removeProduct(id: number) {
    return this.http.delete(this.DeleteProductURL+id);
  }
  
}
