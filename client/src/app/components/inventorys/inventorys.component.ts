import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';
import { Inventory, InventoryResponse } from 'src/types/general';

@Component({
  selector: 'app-inventorys',
  templateUrl: './inventorys.component.html',
  styleUrls: ['./inventorys.component.css']
})
export class InventorysComponent implements OnInit {

  inventory:Inventory[] = [];
  showFilterForm: boolean = false;
  formType:string = "filter";
  filteredList:Inventory[] = [];

  constructor(
    private fetchService: FetchService
  ) { }

  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(){
    this.fetchService.getInventoryList().subscribe((response:InventoryResponse)=>{
      if(response.statusCode === 200){
        this.inventory = response.data!.flat(1);
      }
    })
  }

  showFilter(){
    this.showFilterForm = !this.showFilterForm;
  }

  addFilterItem(item:Inventory[]){
    this.filteredList = item;
  }

  resetList(){
    this.filteredList = [];
  }

}
