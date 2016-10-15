import { Injectable } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { Subject } from 'rxjs/Rx';

@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
    public xhrStartEvent = new Subject<XMLHttpRequest>();
    public xhrProgressEvent = new Subject<IXhrProgress>();
    public xhrEndEvent = new Subject<XMLHttpRequest>();

    public build(): any {
        let xhr = <XMLHttpRequest>super.build();

        xhr.onloadstart = (event) => {
            this.xhrStartEvent.next(xhr);
        };
        xhr.onprogress = (event) => {
            let percent = event.loaded / event.total;
            this.xhrProgressEvent.next({xhr, progress: percent});
        };
        xhr.onloadend = (event) => {
            this.xhrEndEvent.next(xhr);
        };

        return <any>(xhr);
    }
}

export interface IXhrProgress {
    xhr: XMLHttpRequest;
    progress: number;
};
