import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthHelperService } from 'src/app/core/services/auth-helper.service';
import { Helpers } from 'src/app/shared/utils/helpers';
import { regex } from 'src/app/shared/utils/regex';
import { LoginForm } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent {
  private authService = inject(AuthHelperService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup<LoginForm>({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(regex.password)]),
    })
  };

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      Helpers.markFormGroupDirty(form)
      return
    }

    this.authService.login(form.value)
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
