import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, startWith } from 'rxjs';
import { Requeststatus } from 'src/app/enums/requeststatus';
import { Appstate } from 'src/app/interfaces/appstate';
import { FetchService } from 'src/app/services/fetch.service';
import { Branch, FetchResponse, responseContent } from 'src/types/general';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {

  appState$!: Observable<Appstate<FetchResponse<Branch>>>;
  readonly DataState = Requeststatus;
  dataSubject = new BehaviorSubject<FetchResponse<Branch>>(responseContent);
  isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  showAddForm:boolean = false;
  showEditForm: boolean = false;
  formType:string = "";
  isAll:boolean = false;
  title:string="";
  branches:Branch[] = [];
  url:string = this.router.url.toString().slice(1,);

  constructor(
    private fetchService: FetchService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData(this.url.split("/").length);
  }

  getData(urlLength:number){
    let urlPath = urlLength === 1 ? `${this.url}/list` : `${this.url.split("/")[0]}/get/${this.url.split("/")[1]}`;
    urlLength === 1 ? this.formType = "save" : this.formType = "edit";
    urlLength === 1 ? this.isAll = true : this.isAll = false;
    this.title = this.url.split("/")[0].toString().slice(0,1).toUpperCase() + this.url.split("/")[0].toString().slice(1,);
    this.getList(urlPath);
  }

  getList(path:string){
    this.isLoadingSubject.next(true);
    this.appState$ = this.fetchService.getBranches$(path)
      .pipe(
        map(res=>{
          this.dataSubject.next(res);
          this.isLoadingSubject.next(false);
          return {
            dataState:Requeststatus.LOADED,
            appData:{
              ...res,
              data:res.data!.flat(1)
            }
          }
        }),
        startWith({
          dataState:Requeststatus.LOADING
        }),
        catchError((error:string)=>{
          this.isLoadingSubject.next(false);
          return of({
            dataState:Requeststatus.ERROR,
            error
          })
        })
      )
  }

  getInfo(id:string){
    this.router.navigate([this.url,id])
  }

  closeAddForm(){
    this.showAddForm = !this.showAddForm;
  }
  
  closeEditForm(){
    this.showEditForm = !this.showEditForm;
  }

  refreshBranchView(response:FetchResponse<Branch>){
    if(response.statusCode === 200){
      this.getData(this.url.split("/").length);
    }
  }

}
