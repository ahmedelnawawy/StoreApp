import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { quantityPerUnitModel } from 'src/app/Shared/models/quantityPerUnitModel';
import { LookUpsService } from 'src/app/Shared/Service/lookUps.service';
import { SupplierService } from 'src/app/Supplier/service/supplier.service';
import { SupplierModel } from 'src/app/Supplier/supplierModel';
import { productModel } from '../productModel';
import { ProductService } from '../service/product.service';


@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    productFilter : productModel = {};
    ProductList: productModel[] = [];
    SupplierList: SupplierModel[] = [];
    quantityPerUnitList: quantityPerUnitModel[] = [];
    first = 0;
    rows = 10;
    constructor(private productService: ProductService,private messageService: MessageService , private lookUpsService: LookUpsService,
        private supplierService: SupplierService,) 
    { 
    }

    ngOnInit(): void {
        this.LoadProducts();
        this.LoadLookUps();
    }

    LoadLookUps()
    {
        //**************Load LookUps********************* */
    this.lookUpsService.getQuantityPerUnits().subscribe(res => {
        if (res) {
          this.quantityPerUnitList = res;
        }
      }, error => {
      });
      this.supplierService.getSuppliers().subscribe(res => {
        if (res) {
          this.SupplierList = res;
        }
      }, error => {
      });
    }
    
    LoadProducts() {
        debugger
        // Get Products from ProductService
        this.productService.getProductsByFilter(this.productFilter).subscribe(res => {
            if (res) {
                this.ProductList = res;
            }
        }, error => {
        });
    }

    remove(id: number) {
        this.productService.removeProduct(id).subscribe((res) => {
            if(res)
       {
         this.LoadProducts();
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

    clearFilter()
    {
        this.productFilter= {};
        this.LoadProducts();
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
        return this.ProductList ? this.first === (this.ProductList.length - this.rows) : true;
    }
    isFirstPage(): boolean {
        return this.ProductList ? this.first === 0 : true;
    }
    //****************PrimeNG DataTable Pagination Method End*********************** */
}
