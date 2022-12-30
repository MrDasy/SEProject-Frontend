import { SuperComponent } from '../common/src/index';
export default class Input extends SuperComponent {
    options: {
        multipleSlots: boolean;
    };
    externalClasses: string[];
    behaviors: string[];
    properties: import("./type").TdInputProps;
    data: {
        prefix: string;
        classPrefix: string;
        classBasePrefix: string;
    };
    lifetimes: {
        ready(): void;
    };
    observers: {
        prefixIcon(prefixIcon: any): void;
        suffixIcon(suffixIcon: any): void;
        clearable(clearable: any): void;
    };
    methods: {
        updateValue(value: any): void;
        onInput(e: any): void;
        onFocus(e: any): void;
        onBlur(e: any): void;
        onConfirm(e: any): void;
        onSuffixClick(): void;
        onSuffixIconClick(): void;
        clearInput(e: any): void;
        onKeyboardHeightChange(e: any): void;
    };
}
