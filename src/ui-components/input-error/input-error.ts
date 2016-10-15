import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
    selector: 'input-error',
    template: require('./input-error.pug')
})
export class InputError implements OnInit {
    @Input() public form: FormGroup;
    @Input() public field: string; // name given in formControlName directive
    @Input() public readableErrors: IInputReadableErrors;

    private control: AbstractControl; // this.form[this.field]

    public ngOnInit(): void {
        if (this.form) {
            this.control = this.form.get(this.field);
        }
    }

    public get errors(): string[] {
        let result: string[] = [];
        let errors = this.control ? this.control.errors : [];

        let readableErrors: IInputReadableErrors = _.defaultsDeep(this.readableErrors, DefaultReadableErrors) as IInputReadableErrors;
        let fieldReadableErrors: IInputFieldReadableErrors = _.defaults(readableErrors[this.field], readableErrors.all);

        _.forEach(errors, (errorValue, errorKey) => {
            let readableError = fieldReadableErrors[errorKey] || errorKey;
            readableError.replace('%value%', errorValue);

            result.push(readableError);
        });

        return result;
    }
}

const DefaultReadableErrors: IInputReadableErrors = {
    all: {
        required: 'Champ requis',
        minlength: 'La valeur doit être égale à %value%'
    }
};

export interface IInputReadableErrors {
    all?: IInputFieldReadableErrors;
    [field: string]: IInputFieldReadableErrors;
}

export interface IInputFieldReadableErrors {
    [errorName: string]: string;
}
