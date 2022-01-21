import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';

interface Product {
  product_id:string;
  pname:string;
};

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: ['./name-editor.component.css'],
})

export class NameEditorComponent {

  form = this.fb.group({
    id: [''],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    role: [null,Validators.required],
    location:[null,Validators.required],
    products:this.fb.array([])
  });

  submitted:boolean = false;
  roles: string[] = ['Sales', 'Admin', 'Manager','Supervisor','Maintenance'];
  locations: string[] = ["Appleton","Green Bay","Gladstone","Escanaba"];
  productList:Product[] = [
    {product_id:"123",pname:"Paper"},
    {product_id:"234",pname:"Desk"},
    {product_id:"345",pname:"Pen"}
  ]

  constructor(private fb: FormBuilder) {}

  get firstName(){ return this.form.get('firstName')};
  get lastName(){ return this.form.get('lastName')};
  get role(){ return this.form.get('role')};
  get location(){ return this.form.get('location')};

  onCheckboxChange(e:any,p:Product) {
    const products: FormArray = this.form.get('products') as FormArray;
  
    if (e.target.checked) {      
      products.push(new FormControl(p));
    } else {
      let i: number = 0;
      products.controls.forEach((item: any) => {
        if (item.product_id == p.product_id) {
          products.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.valid){
      console.log(this.form.value)
      // send data to api      
    } else {
      console.log("not valid");
    }
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/