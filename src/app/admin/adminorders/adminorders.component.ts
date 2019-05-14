
import { Component, OnInit ,ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'adminorders',
  templateUrl: './adminorders.component.html',
  styleUrls: ['./adminorders.component.css']
})
export class AdminordersComponent implements OnInit,OnDestroy {

  toggleField: string;
  dataSource: MatTableDataSource<any>;
members:any[];
myDocData:any;

  savedChanges = false;
  error:boolean = false;
  errorMessage:string="";
  dataLoading : boolean=false;
  private querySubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['category','scategory','name','price','_id'];

  constructor(private _backendService:BackendService) { }

  ngOnInit() {
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    
  }
   toggle(filter?){
     if(!filter) {filter = "searchMode"}
     else {filter = filter;}
     this.toggleField=filter;
   }

   getData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProducts('orders')
        .subscribe(members => {
            this.members = members;
            this.dataSource = new MatTableDataSource(members);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataLoading=false;
        },
        (error)=>{
          this.error=true;
          this.errorMessage = error.message;
          this.dataLoading=false;
        },()=>{this.error = false;this.dataLoading=false;}
        );
      }
      getFilterData(filters) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.getFilterProducts('orders',filters)
            .subscribe(members => {
                this.members = members;
                this.dataSource = new MatTableDataSource(members);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.dataLoading =false;
            },
            (error)=>{
              this.error=true;
              this.errorMessage = error.message;
              this.dataLoading=false;
            },()=>{this.error = false;this.dataLoading=false;}
            );
          }

          setData(formData) {
            this.dataLoading = true;
            this.querySubscription = this._backendService.setProducts('orders',formData)
                .subscribe(members => {
                    if(members){
                      this.savedChanges = true;
                      this.dataLoading = false;
                    }
                },
                (error)=>{
                  this.error=true;
                  this.errorMessage = error.message;
                  this.dataLoading=false;
                },()=>{this.error = false;this.dataLoading=false;}
                );
              }

              updateData(formData) {
                this.dataLoading = true;
                this.querySubscription = this._backendService.updateProducts('orders',formData)
                    .subscribe(members => {
                        if(members){
                          this.savedChanges = true;
                          this.dataLoading = false;
                        }
                    },
                    (error)=>{
                      this.error=true;
                      this.errorMessage = error.message;
                      this.dataLoading=false;
                    },()=>{this.error = false;this.dataLoading=false;}
                    );
                  }
                  getDoc(docId){
                    this.dataLoading = true;
                this.querySubscription = this._backendService.getOneProductDoc('orders',docId)
                    .subscribe(res => {
                        if(res){
                          this.myDocData = res;
                          this.toggle('editMode');
                          this.dataLoading = false;
                        }
                    },
                    (error)=>{
                      this.error=true;
                      this.errorMessage = error.message;
                      this.dataLoading=false;
                    },()=>{this.error = false;this.dataLoading=false;}
                    );
                  }
                  deleteDoc(docId){
                    if (confirm("Are you sure watn to delete thid record ?")){
                    this.dataLoading = true;
                this.querySubscription = this._backendService.delOneProductDoc('orders',docId)
                    .subscribe(res => {
                        if(res){
                          
                          this.toggle('searchMode');
                          this.dataLoading = false;
                        }
                    },
                    (error)=>{
                      this.error=true;
                      this.errorMessage = error.message;
                      this.dataLoading=false;
                    },()=>{this.error = false;this.dataLoading=false;}
                    );
                  }
                }
   //function for data table
  

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(){
    if(this.querySubscription){
      this.querySubscription.unsubscribe();
    }
  }
}


