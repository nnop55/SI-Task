import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

}
