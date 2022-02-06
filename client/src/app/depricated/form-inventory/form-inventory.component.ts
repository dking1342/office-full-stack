import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Inventory, Product } from 'src/types/general';

@Component({
  selector: 'app-form-inventory',
  templateUrl: './form-inventory.component.html',
  styleUrls: ['./form-inventory.component.css']
})
export class FormInventoryComponent implements OnInit {
  @Input() type = "";
  @Input() list:Inventory[] = [];
  @Output() filterUpdate = new EventEmitter<Inventory[]>();
  selectedProduct:Product = {product_id:"",pname:""};

  constructor() { }

  ngOnInit(): void {
  }

  updateList(e:any){
    this.filterUpdate.emit(this.list.filter(item=> item.product.pname === e.target.value));
  }

}
