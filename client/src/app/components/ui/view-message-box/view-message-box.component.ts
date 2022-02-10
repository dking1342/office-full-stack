import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Requeststatus } from 'src/app/enums/requeststatus';

@Component({
  selector: 'app-view-message-box',
  templateUrl: './view-message-box.component.html',
  styleUrls: ['./view-message-box.component.css']
})
export class ViewMessageBoxComponent implements OnInit {
  @Input() type:Requeststatus | null= null;

  readonly DataState = Requeststatus;
  constructor() { }

  ngOnInit(): void {
  }

}
