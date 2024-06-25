import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
      <button
      mat-raised-button
      [color]="btnColor"
      (click)="btnClick()"
      [type]="btnType"
      [class]="className"
    >
      <div class="btn-content">
      <ng-content></ng-content>
      </div>
    </button>
`,
  styles: [`
      .mdc-button {
        z-index: 1;
        background:#fff !important;
        color: black !important;
        width:100%;
      }

      .btn-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

      .small-btn{
        width:50px;
      }
  `]
})
export class ButtonComponent {

  @Input() btnColor: string = 'basic';
  @Input() btnType: string = 'button';
  @Input() className: string = '';
  @Output() onClick = new EventEmitter<void>();

  btnClick() {
    this.onClick.emit()
  }

}
