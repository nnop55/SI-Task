import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateHelperService {

  constructor(private translate: TranslateService) { }

  setDefaultLanguage() {
    const def = 'ka' || localStorage.getItem('SI-Lang');
    this.translate.setDefaultLang(def);
    this.translate.use(def)
  }

  switchLanguage() {
    const language = this.translate.currentLang == 'ka' ? 'en' : 'ka'
    localStorage.setItem('SI-Lang', language);
    this.translate.use(language);
  }
}
