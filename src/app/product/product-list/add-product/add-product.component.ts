import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LookUpsService } from 'src/app/Shared/Service/lookUps.service';
import { SupplierService } from 'src/app/Supplier/service/supplier.service';
import { SupplierModel } from 'src/app/Supplier/supplierModel';
import { quantityPerUnitModel } from '../../../Shared/models/quantityPerUnitModel';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  id: number = 0;
  productform: FormGroup;
  SupplierList: SupplierModel[] = [];
  quantityPerUnitList: quantityPerUnitModel[] = [];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private lookUpsService: LookUpsService,
    private supplierService: SupplierService,
  ) {
    //**************Create Reactive Form with validation********************* */
    this.productform = this.fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]],
      quantityPerUnitId: [0, [Validators.required]],
      reorderLevel: ['', [Validators.required]],
      supplierId: [0, [Validators.required]],
      unitPrice: ['', [Validators.required]],
      unitsInStock: ['', [Validators.required]],
      unitsOnOrder: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
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
    //**************Get product ID On Edit********************* */
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.productform.get('id')?.setValue(params['id']);
        this.productService.getProductsByID(this.id).subscribe(res => {
          if (res) {
            this.productform.patchValue(res);
          }
        });
      }
    });
  }

  save() {
    if (this.productform.invalid) // true if any form validation fail
      return

    if (this.productform.get('id')?.value === 0) {
      // on Create New product
      this.productService.addProduct(this.productform.value).subscribe(res => {
        if (res) {
          this.router.navigate(['/product']);
        }
      });
    } else {
      // on Update product info
      this.productService.updateProduct(this.productform.value).subscribe(res => {
        if (res) {
          this.router.navigate(['/product']);
        }
      });;
    }
  }

  clear() {
    this.productform.reset();
    this.id = 0;
  }

}
