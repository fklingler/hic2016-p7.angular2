import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable, Subject } from 'rxjs/Rx';
import { API_URL } from '../api/api';

// Override Http and use it in DI to authenticate all requests
@Injectable()
export class CustomHttp extends Http {
    public noServerResponseEvent = new Subject();
    public notAuthenticatedEvent = new Subject();

    constructor(
        backend: ConnectionBackend,
        defaultOptions: RequestOptions
    ) {
        super(backend, defaultOptions);
    }

    public request(url: string|Request, options: RequestOptionsArgs = {}): Observable<Response> {
        let urlString = <string>(url instanceof Request ? url.url : url);

        return this.makeRequest(urlString, super.request, [url, options], options);
    }

    public get(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.get, [url, options], options);
    }

    public post(url: string, body: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.post, [url, body, options], options);
    }

    public put(url: string, body: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.put, [url, body, options], options);
    }

    public delete(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.delete, [url, options], options);
    }

    public patch(url: string, body: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.patch, [url, body, options], options);
    }

    public head(url: string, options: RequestOptionsArgs = {}): Observable<Response> {
        return this.makeRequest(url, super.head, [url, options], options);
    }

    private makeRequest(
        url: string,
        superFn: Function,
        args: any[],
        requestOptions: RequestOptionsArgs
    ): Observable<Response> {
        let request = superFn.apply(this, args);

        return request.catch((res: Response) => {
            if (res.status === 0) {
                this.noServerResponseEvent.next();
            }
            if (res.status == 401) {
                this.notAuthenticatedEvent.next();
            }

            return Observable.throw(res);
        });
    }
}
