import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AuthHelperService } from 'src/app/core/services/auth-helper.service';
import { Helpers } from 'src/app/shared/utils/helpers';
import { regex } from 'src/app/shared/utils/regex';
import { RegisterForm } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent {
  private authService = inject(AuthHelperService);
  @Output() switchToLogin = new EventEmitter<void>();
  form!: FormGroup;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initForm()
  }

  get f() {
    return this.form.controls
  }

  initForm() {
    this.form = new FormGroup<RegisterForm>({
      username: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    }, { validators: Helpers.passwordMatchValidator })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      Helpers.markFormGroupDirty(form)
      return
    }

    const postData = {
      username: this.f['username']?.value,
      name: this.f['name']?.value,
      surname: this.f['surname']?.value,
      password: this.f['password']?.value
    }

    this.authService.register(postData)
    this.authService.isRegistered$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(isRegistered => {
        if (!isRegistered)
          return
        this.switchToLogin.emit()
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
