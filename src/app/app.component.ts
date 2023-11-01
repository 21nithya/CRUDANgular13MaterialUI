import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Angular13';

  displayedColumns: string[] = ['productName', 'category', 'freshness', 'price','Comment','date', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api: ApiService){
  }
  ngOnInit(): void {
    this.getAllProducts();
  }
    openDialog() {
      this.dialog.open(DialogComponent, {
       width: '30%'
      })
    }
    getAllProducts(){
      this.api.getProduct()
      .subscribe({
        next:(res)=>{
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error:(err)=>{
          alert("Error while fetching the records!!")
        }
      })
    }
    editProduct(row: any){
      this.dialog.open(DialogComponent,{
        width: '38%',
        data: row
      })
    }
    dateleteProduct(id : number){
      this.api.dateleteProduct(id)
      .subscribe({
        next:(res)=>{
          alert("Product Deleted Successfully");
          this.getAllProducts();
        },
        error:()=>{
          alert("Error while deleting the product!")
        }
      })
    }
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
}
