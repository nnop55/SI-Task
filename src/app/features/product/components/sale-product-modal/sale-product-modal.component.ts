import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/utils/helpers';
import { ProductStoreService } from '../../services/product-store.service';
import { SaleForm } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-sale-product-modal',
  templateUrl: './sale-product-modal.component.html',
  styleUrls: ['./sale-product-modal.component.scss']
})
export class SaleProductModalComponent {
  form!: FormGroup;
  quantityError!: boolean;

  constructor(
    public dialogRef: MatDialogRef<SaleProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ProductStoreService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = new FormGroup<SaleForm>({
      quantity: new FormControl(null, [Validators.required]),
    })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      Helpers.markFormGroupDirty(form)
      return
    }
    const quantity = parseInt(this.f['quantity']?.value)

    if (quantity > this.data.productCount) {
      this.quantityError = true
      return
    }
    this.quantityError = false
    this.service.saleProduct(this.data['_id'], quantity)
    this.close()
  }

  close(): void {
    this.dialogRef.close();
  }
}
