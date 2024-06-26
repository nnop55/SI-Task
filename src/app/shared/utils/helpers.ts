import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";
import { regex } from "./regex";

export class Helpers {
    static markFormGroupDirty(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsDirty();
        });
    }

    static latinOrGeorgianValidator(control: AbstractControl): ValidationErrors | null {

        const value = control.value;

        if (!value) {
            return null; // no value, so no error
        }

        if (regex.onlyLatin.test(value) || regex.onlyGeorgian.test(value)) {
            return null; // valid if it matches either regex
        }

        return { latinOrGeorgian: true }; // invalid if it doesn't match either regex
    }

    static passwordMatchValidator(group: AbstractControl): {
        [key: string]: any
    } | null {
        let password = group.get('password');
        let confirmPassword = group.get('confirmPassword');

        return password && confirmPassword && password.value !== confirmPassword.value ? { mismatch: true } : null;

    }
}