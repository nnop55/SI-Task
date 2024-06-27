import { Component, inject } from '@angular/core';
import { TranslateHelperService } from '../../services/translate-helper.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent {
  private translate = inject(TranslateHelperService)

  switchLang() {
    this.translate.switchLanguage()
  }

}
