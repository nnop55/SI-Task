import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Helpers } from 'src/app/shared/utils/helpers';
import { ProductStoreService } from '../services/product-store.service';
import { Product, ProductForm } from 'src/app/shared/utils/unions';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-inner',
  templateUrl: './product-inner.component.html',
  styleUrls: ['./product-inner.component.scss']
})
export class ProductInnerComponent {

  private route = inject(ActivatedRoute)
  private service = inject(ProductStoreService)
  private destroy$ = new Subject<void>();

  product$!: Observable<Product | null>

  isEdit!: boolean;
  id!: string | null;
  form!: FormGroup;

  ngOnInit(): void {
    this.product$ = this.service.product$
    this.id = this.route.snapshot.params['id'];
    this.isEdit = !!this.id;
    this.initForm()
    this.getById()
  }

  getById() {
    if (this.isEdit && this.id) {
      this.service.getProductById(this.id)

      this.product$.pipe(
        takeUntil(this.destroy$)
      ).subscribe(product => {
        if (product) {
          this.form.patchValue({
            title: product.title,
            price: product.price,
            productCount: product.productCount
          })
        }
      })
    }
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = new FormGroup<ProductForm>({
      title: new FormControl(null, [Validators.required]),
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
        this.service.updateProduct({ '_id': this.id, ...form.value })
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
