import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent {

  @Input() defStartVal!: Date | null;
  @Input() defEndVal!: Date | null;

  @Output() dateStart = new EventEmitter<any>()
  @Output() dateEnd = new EventEmitter<any>()

  dateForm!: FormGroup;

  ngOnInit() {
    this.dateForm = new FormGroup({
      start: new FormControl(this.defStartVal),
      end: new FormControl(this.defEndVal)
    })
  }

  onDateChange(event: any): void {
    this.dateStart.emit(event.value)
  }

  onDateEndChange(event: any): void {
    this.dateEnd.emit(event.value)
  }
}
