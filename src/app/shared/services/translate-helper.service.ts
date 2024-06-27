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
  }

  switchLanguage(language: 'ka' | 'en') {
    localStorage.setItem('SI-Lang', language);
    this.translate.use(language);
  }
}
