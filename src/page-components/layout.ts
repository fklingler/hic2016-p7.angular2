import { Component, ViewContainerRef } from '@angular/core';
import * as services from '../services';

@Component({
    selector: 'layout',
    template: require('./layout.pug')
})
export class Layout {
    constructor(
        // Inject "general" services
        viewContainerRef: ViewContainerRef // !important, see https://valor-software.com/ng2-bootstrap/#/modals
    ) {
        // noop
    }
}
