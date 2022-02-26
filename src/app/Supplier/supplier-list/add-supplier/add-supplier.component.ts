import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from '../../service/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  id: number = 0;
  supplierform: FormGroup;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private supplierService: SupplierService,
  ) {
    //**************Create Reactive Form with validation********************* */
    this.supplierform = this.fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    //**************Get product ID On Edit********************* */
    this.route.params.subscribe(params => {
      this.id = params['id'];
      if (params['id'] != null) {
        this.supplierform.get('id')?.setValue(params['id']);
        this.supplierService.getSuppliersByID(this.id).subscribe(res => {
          if (res) {
            this.supplierform.patchValue(res);
          }
        });
      }
    });
  }

  save() {
    if (this.supplierform.invalid) // true if any form validation fail
      return

    if (this.supplierform.get('id')?.value === 0) {
      // on Create New product
      this.supplierService.addSupplier(this.supplierform.value).subscribe(res => {
        if (res) {
          this.router.navigate(['/supplier']);
        }
      });
    } else {
      // on Update product info
      this.supplierService.updateSupplier(this.supplierform.value).subscribe(res => {
        if (res) {
          this.router.navigate(['/supplier']);
        }
      });;
    }
  }

  clear() {
    this.supplierform.reset();
    this.id = 0;
  }

}
