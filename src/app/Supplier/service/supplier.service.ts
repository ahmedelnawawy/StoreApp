import { Injectable } from '@angular/core';
import { SupplierModel } from '../supplierModel';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  baseUrl: string;
  GetAllSuppliersURL: string;
  GetSupplierByIdURL: string;
  AddSupplierURL: string;
  UpdateSupplierURL: string;
  DeleteSupplierURL: string;
  GetLargestSupplierToStoreURL: string;


  constructor(private http: HttpClient) {
    this.baseUrl =  "https://localhost:44388";
    this.GetAllSuppliersURL = this.baseUrl + '/api/Supplier';
    this.GetSupplierByIdURL = this.baseUrl + '/api/Supplier/';
    this.AddSupplierURL = this.baseUrl + '/api/Supplier';
    this.UpdateSupplierURL = this.baseUrl + '/api/Supplier';
    this.DeleteSupplierURL = this.baseUrl + '/api/Supplier/';
    this.GetLargestSupplierToStoreURL = this.baseUrl + '/api/Supplier/GetLargestSupplierToStore';

  }

  getSuppliers() {
    return this.http.get(this.GetAllSuppliersURL).pipe(
      map((res: any) => res)
    );
  }
  getLargestSupplierToStore() {
    return this.http.get(this.GetLargestSupplierToStoreURL).pipe(
      map((res: any) => res)
    );
  }

  getSuppliersByID(id: number) {
    return this.http.get(this.GetSupplierByIdURL + id).pipe(
      map((res: any) => res)
    );
  }

  addSupplier(SupplierModel: SupplierModel) {
    return this.http.post(this.AddSupplierURL , SupplierModel).pipe(
      map((res: any) => res)
    );
  }

  updateSupplier(SupplierModel: SupplierModel) {
    return this.http.put(this.UpdateSupplierURL , SupplierModel).pipe(
      map((res: any) => res)
    );
  }

  removeSupplier(id: number) {
    return this.http.delete(this.DeleteSupplierURL+id);
  }
}
