import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from 'src/app/shared/utils/helpers';
import { ProductStoreService } from '../../services/product-store.service';
import { Product, ProductForm } from 'src/app/shared/utils/unions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-inner',
  templateUrl: './product-inner.component.html',
  styleUrls: ['./product-inner.component.scss']
})
export class ProductInnerComponent {

  private route = inject(ActivatedRoute)
  private service = inject(ProductStoreService)
  private destroy$ = new Subject<void>();

  product!: Product | null;

  isEdit!: boolean;
  form!: FormGroup;

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    this.isEdit = !!this.product;
    this.initForm()
    this.getById()
  }

  getById() {
    if (this.product) {
      this.form.patchValue({
        title: this.product.title,
        price: this.product.price,
        productCount: this.product.productCount
      })
    }
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = new FormGroup<ProductForm>({
      title: new FormControl(null, [Validators.required, Helpers.latinOrGeorgianValidator]),
      price: new FormControl(null, [Validators.required]),
      productCount: new FormControl(null, [Validators.required]),
    })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      Helpers.markFormGroupDirty(form)
      return
    }

    switch (this.isEdit) {
      case true:
        this.service.updateProduct({ '_id': this.product?.['_id'], ...form.value })
        break;
      default:
        this.service.addProduct(form.value)
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
