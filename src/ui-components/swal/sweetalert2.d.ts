/* tslint:disable */

// Waiting for @types/sweetalert2, this should be ok
// Mix of
//  - https://github.com/StefanKoenen/typed-sweetalert2/blob/master/index.d.ts
//  - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/types-2.0/sweetalert/index.d.ts
//  - my corrections from https://github.com/limonte/sweetalert2 and https://limonte.github.io/sweetalert2/

declare module 'sweetalert2' {
    function swal(title: string): Promise<boolean>;
    function swal(title: string, text: string): Promise<boolean>;
    function swal(title: string, text: string, type: swal.AlertType): Promise<boolean>;
    function swal(settings: swal.Settings): Promise<boolean>;

    namespace swal {
        export function isVisible(): boolean;

        export function setDefaults(settings: Settings): void;
        export function resetDefaults(): void;

        export function close(): void;
        export function closeModal(): void;

        export function enableButtons(): void;
        export function disableButtons(): void;

        export function enableConfirmButton(): void;
        export function disableConfirmButton(): void;

        export function enableLoading(): void;
        export function showLoading(): void;
        export function disableLoading(): void;
        export function hideLoading(): void;

        export function clickConfirm(): void;
        export function clickCancel(): void;

        export function showValidationError(error: string): void;
        export function resetValidationError(): void;

        export function enableInput(): void;
        export function disableInput(): void;

        export function queue(steps: QueueStep[]): Promise<boolean>;

        export function getQueueStep(): number;

        export function insertQueueStep(step: QueueStep, index?: number): void;

        export function deleteQueueStep(index: number): void;

        export function getProgressSteps(): string[];
        export function setProgressSteps(steps: string[]): void;

        export function showProgressSteps(): void;
        export function hideProgressSteps(): void;

        // Types
        export interface Settings {
            title?: string;
            text?: string;
            html?: string;
            type?: AlertType;
            input?: InputType;
            width?: number | string;
            padding?: number | string;
            background?: string;
            customClass?: string;
            timer?: number;
            animation?: boolean;
            allowOutsideClick?: boolean;
            allowEscapeKey?: boolean;
            showConfirmButton?: boolean;
            showCancelButton?: boolean;
            confirmButtonText?: string;
            cancelButtonText?: string;
            confirmButtonColor?: string;
            cancelButtonColor?: string;
            confirmButtonClass?: string;
            cancelButtonClass?: string;
            buttonsStyling?: boolean;
            reverseButtons?: boolean;
            focusCancel?: boolean;
            showCloseButton?: boolean;
            showLoaderOnConfirm?: boolean;
            preConfirm?: (value: InputValueType) => Promise<void>;
            imageUrl?: string;
            imageWidth?: number;
            imageHeight?: number;
            imageClass?: string;
            inputPlaceholder?: InputValueType;
            inputValue?: InputValueType;
            inputOptionsrepresent?: {} | Promise<void>;
            inputAutoTrim?: boolean;
            inputValidator?: (value: InputValueType) => Promise<void>;
            inputClass?: string;
            progressSteps?: string[];
            currentProgressStep?: string;
            progressStepsDistance?: string;
            onOpen?: Function;
            onClose?: Function;
        }

        export type AlertType = 'warning' | 'error' | 'success' | 'info' | 'question';
        export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file';
        export type InputValueType = string | number | boolean;
        export type QueueStep = Settings | string;
    }

    export = swal;
}
