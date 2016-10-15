import { Injectable } from '@angular/core';
import { Route, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import * as pages from '.';

export const APP_ROUTES: Route[] = [
    { path: '', redirectTo: 'calc', pathMatch: 'full'},
    { path: 'calc', component: pages.Calc }
];
