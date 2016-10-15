import { Directive, ElementRef, HostListener, EventEmitter, Output, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

@Directive({
    selector: '[fileSelect]'
})
export class FileSelectDirective implements OnInit, OnChanges, OnDestroy {
    @Output() public onFileSelect = new EventEmitter<File | FileList>();

    @Input('multiple') public multiple = false;

    private fileInputLabelElem: JQuery;
    private fileInputElem: JQuery;

    public constructor(
        private element: ElementRef
    ) {}

    public ngOnInit(): void {
        if (!this.isInputTypeFile()) {
            this.createFileInput();
        }
    }

    public ngOnChanges(): void {
        if (!this.isInputTypeFile()) {
            this.updateFileInputAttrs();
        }
    }

    public ngOnDestroy(): void {
        if (this.fileInputLabelElem && this.fileInputLabelElem[0]) {
            document.body.removeChild(this.fileInputLabelElem[0]);
        }
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        this.fileInputElem.click();

        this.preventAndStop(event);
    }

    private preventAndStop(event: any): void {
        event.preventDefault();
        event.stopPropagation();
    }

    private isInputTypeFile(): boolean {
        const elem = this.element.nativeElement;
        return elem.tagName.toLowerCase() === 'input' && elem.attrs.type && elem.attrs.type.toLowerCase() === 'file';
    }

    private createFileInput(): void {
        if (this.isInputTypeFile()) {
            return this.element.nativeElement;
        }

        this.fileInputElem = $('<input type="file">');
        this.fileInputLabelElem = $('<label>upload</label>');
        this.fileInputLabelElem
            .css('visibility', 'hidden').css('position', 'absolute').css('overflow', 'hidden')
            .css('width', '0px').css('height', '0px').css('border', 'none')
            .css('margin', '0px').css('padding', '0px').attr('tabindex', '-1');

        this.fileInputElem.on('change', this.onInputFileChange.bind(this));

        this.updateFileInputAttrs();

        this.fileInputLabelElem.append(this.fileInputElem);
        document.body.appendChild(this.fileInputLabelElem[0]);
    }

    private updateFileInputAttrs(): void {
        if (this.multiple) {
            this.fileInputElem.attr('multiple', 'multiple');
        } else {
            this.fileInputElem.removeAttr('multiple');
        }
    }

    private onInputFileChange(event: any): void {
        let files = event.__files__ || (event.target && event.target.files);

        if (files.length >= 1) {
            if (this.multiple) {
                this.onFileSelect.emit(files);
            } else {
                this.onFileSelect.emit(files[0]);
            }
        }
    }
}
