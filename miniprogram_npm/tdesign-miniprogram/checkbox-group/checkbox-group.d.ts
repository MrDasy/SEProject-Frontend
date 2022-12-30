import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class CheckBoxGroup extends SuperComponent {
    externalClasses: string[];
    relations: RelationsOptions;
    data: {
        prefix: string;
        classPrefix: string;
        checkboxOptions: any[];
    };
    properties: {
        borderless: {
            type: BooleanConstructor;
            value: boolean;
        };
        customStyle?: {
            type: StringConstructor;
            value?: string;
        };
        disabled?: {
            type: BooleanConstructor;
            value?: boolean;
        };
        max?: {
            type: NumberConstructor;
            value?: number;
        };
        name?: {
            type: StringConstructor;
            value?: string;
        };
        options?: {
            type: ArrayConstructor;
            value?: import("../checkbox/type").CheckboxOption[];
        };
        value?: {
            type: ArrayConstructor;
            value?: import("../checkbox/type").CheckboxGroupValue;
        };
        defaultValue?: {
            type: ArrayConstructor;
            value?: import("../checkbox/type").CheckboxGroupValue;
        };
    };
    observers: {
        value(): void;
    };
    lifetimes: {
        attached(): void;
        ready(): void;
    };
    controlledProps: {
        key: string;
        event: string;
    }[];
    $checkAll: any;
    methods: {
        getChilds(): any;
        updateChildren(): void;
        updateValue({ value, checked, checkAll, indeterminate }: {
            value: any;
            checked: any;
            checkAll: any;
            indeterminate: any;
        }): void;
        initWithOptions(): void;
        handleInnerChildChange(e: any): void;
        setCheckall(): void;
    };
}
