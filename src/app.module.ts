require('./style/vendor.global.scss');
require('./style/common.global.scss');

import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule, ConnectionBackend, XHRBackend, RequestOptions, Http, BrowserXhr } from '@angular/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'angular2-cookie/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { APP_ROUTES } from './page-components/routes';
import * as pages from './page-components';
import * as ui from './ui-components';
import * as directives from './directives';
import * as services from './services';
// import * as models from './models';

@NgModule({
    declarations: [
        // PAGES
        pages.Layout, pages.Calc,
        // UI COMPONENTS
        ui.Swal,
        ui.InputError,
        // DIRECTIVES
        directives.FileSelectDirective,
    ],
    imports: [
        // Angular official modules
        BrowserModule,
        RouterModule.forRoot(APP_ROUTES),
        HttpModule,
        FormsModule, ReactiveFormsModule,
        // Vendor
        ToastModule,
    ],
    providers: [
        // Angular providers
        FormBuilder,
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        // Packages
        CookieService,
        // Resolvers
        // Model resources
        // App providers
        // HTTP
        { provide: ConnectionBackend, useClass: XHRBackend },
        { provide: Http, useClass: services.CustomHttp },
        services.CustomBrowserXhr,
        { provide: BrowserXhr, useExisting: services.CustomBrowserXhr }
    ],
    bootstrap: [pages.Layout]
})
export class AppModule { }
