import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  freshnessList = ['Brand New', 'Second Hand', 'Refarbished'];
  productForm !: FormGroup;
  actionbtn :string = "save"
  constructor(private FormBuilder : FormBuilder, 
    private api: ApiService, 
    @Inject (MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void{
    this.productForm = this.FormBuilder.group({
      productName : ['',Validators.required],
      category : ['',Validators.required],
      freshness : ['',Validators.required],
      price:['',Validators.required],
      Comment:['',Validators.required],
      date:['',Validators.required]
    });

    console.log(this.editData);
    if(this.editData){
      this.actionbtn = "update"
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['Comment'].setValue(this.editData.Comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }
  addProduct(){
    console.log(this.productForm.value);
  if(this.editData){
    if(this.productForm.valid){
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next:()=>{
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("error while adding the product")
        }
      })
    }
  }
  else{
    this.updateProduct()
  }
  }
  updateProduct(){
    this.api.putProduct(this.productForm.value, this.editData.id)
    .subscribe({
      next:(res)=>{
        alert('product updated successfully');
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error:()=>{
        alert('error while updating the record!')
      }
    })
  }
}
