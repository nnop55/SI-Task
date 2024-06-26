import { Component, inject } from '@angular/core';
import { Sign } from 'src/app/shared/utils/unions';
import { AuthHelperService } from '../../services/auth-helper.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  private authHelper = inject(AuthHelperService)

  mode: Sign = Sign.In
  Sign = Sign
  animate: boolean = false;

  startAnimation() {
    this.animate = true;
    setTimeout(() => {
      this.handle75Percent();
    }, 1750);
  }

  handle75Percent() {
    this.mode =
      this.mode === Sign.In ? Sign.Up : Sign.In;

    this.authHelper.clearError()
  }

  onAnimationEnd(event: AnimationEvent) {
    this.animate = false;
  }
}
