import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SupplierService } from '../service/supplier.service';
import { SupplierModel } from '../supplierModel';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {
  SupplierList: SupplierModel[] = [];
  first = 0;
  rows = 10;
  constructor(private supplierService: SupplierService,private messageService: MessageService,) 
  {
    
   }

  ngOnInit(): void {
      this.LoadSuppliers();
  }

  LoadSuppliers() {
      // Get Supplier from SupplierService
      this.supplierService.getSuppliers().subscribe(res => {
          if (res) {
              this.SupplierList = res;
          }
      }, error => {
      });
  }

  remove(id: number) {
   this.supplierService.removeSupplier(id).subscribe((res) => {
       if(res)
       {
         this.LoadSuppliers();
       }else
       {
        this.messageService.add({
            severity: 'error',
            summary: 'Remove Failed',
            detail: 'Something goes wrong While Remove this Record',
        });
       }
   });
  }
  //****************PrimeNG DataTable Pagination method Start*********************** */
  next() {
      this.first = this.first + this.rows;
  }
  prev() {
      this.first = this.first - this.rows;
  }
  reset() {
      this.first = 0;
  }
  isLastPage(): boolean {
      return this.SupplierList ? this.first === (this.SupplierList.length - this.rows) : true;
  }
  isFirstPage(): boolean {
      return this.SupplierList ? this.first === 0 : true;
  }
  //****************PrimeNG DataTable Pagination Method End*********************** */

}
