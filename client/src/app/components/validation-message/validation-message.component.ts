import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent implements OnInit {
  @Input() component:any;
  @Input() message:string = "";
  @Input() submitted:boolean = false;
  @Input() isFormField:boolean = true;


  constructor() { }

  ngOnInit(): void {
  }

}
