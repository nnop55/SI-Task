import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sign } from 'src/app/shared/utils/unions';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {

  route: ActivatedRoute = inject(ActivatedRoute)
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
      this.mode === Sign.In ? Sign.Up : Sign.In
  }

  onAnimationEnd(event: AnimationEvent) {
    this.animate = false;
  }
}
