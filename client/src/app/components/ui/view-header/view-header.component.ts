import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-header',
  templateUrl: './view-header.component.html',
  styleUrls: ['./view-header.component.css']
})
export class ViewHeaderComponent implements OnInit {
  @Input() title:string="";
  @Input() isAll:boolean=false;
  @Input() showAddForm:boolean=false;

  @Output() toggleAddForm = new EventEmitter<void>();

  siteUrl = this.router.url.split("/")[1];

  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  onToggleAddForm(){
    this.toggleAddForm.emit();
  }
  clickGoBack(){
    this.router.navigate([this.siteUrl]);
  }

}
