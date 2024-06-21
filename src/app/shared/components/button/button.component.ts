import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
      <button
      mat-raised-button
      [color]="btnColor"
      (click)="btnClick()"
      [type]="btnType"
    >
      <ng-content></ng-content>
    </button>
`,
  styles: [`
      .mdc-button {
        z-index: 1;
        background:#fff !important;
        width:100%;
      }
  `]
})
export class ButtonComponent {

  @Input() btnColor: string = 'basic';
  @Input() btnType: string = 'button';
  @Output() onClick = new EventEmitter<void>();

  btnClick() {
    this.onClick.emit()
  }

}
