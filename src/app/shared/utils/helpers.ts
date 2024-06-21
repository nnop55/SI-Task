import { FormGroup } from "@angular/forms";

export class Helpers {
    static markFormGroupDirty(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsDirty();
        });
    }
}