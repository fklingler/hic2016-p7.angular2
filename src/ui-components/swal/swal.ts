require('sweetalert2/dist/sweetalert2.css');

import swal = require('sweetalert2');
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'swal',
    template: ''
})
export class Swal {
    @Input() public options: swal.Settings;
    @Input() public title: string = '';
    @Input() public text: string = '';
    @Input() public type: swal.AlertType = 'info';

    public show(): Observable<boolean> {
        let options = <swal.Settings> _.defaults(this.options, {
            title: this.title,
            text: this.text,
            type: this.type,
            showCancelButton: false,
            cancelButtonText: 'Annuler',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-lg btn-primary',
            cancelButtonClass: 'btn btn-lg'
        });

        let alert = swal(options);
        alert.catch(err => {
            // Don't display huge error in console when clicking outside of the alert
        });

        return Observable.fromPromise(alert);
    }
}
