import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Helpers } from 'src/app/shared/utils/helpers';
import { ProductStoreService } from '../../services/product-store.service';

@Component({
  selector: 'app-sale-product-modal',
  templateUrl: './sale-product-modal.component.html',
  styleUrls: ['./sale-product-modal.component.scss']
})
export class SaleProductModalComponent {
  form!: FormGroup;

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
    this.form = new FormGroup<{}>({
      quantity: new FormControl(null, [Validators.required]),
    })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      Helpers.markFormGroupDirty(form)
      return
    }
    this.service.saleProduct(this.data.id, parseInt(this.f['quantity']?.value))
    this.close()
  }

  close(): void {
    this.dialogRef.close();
  }
}
