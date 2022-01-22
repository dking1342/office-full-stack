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

    MySchemaFrom = this.fb.group({
        velocity: this.fb.group({
            speed: ['', Validators.required],
            direction: ['', Validators.required]
        }),
        position: this.fb.group({
            x: ['', Validators.required],
            y: ['', Validators.required]
        })
    });

  constructor(private fb: FormBuilder) {}

  submit(){
      console.log("submit");
  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/