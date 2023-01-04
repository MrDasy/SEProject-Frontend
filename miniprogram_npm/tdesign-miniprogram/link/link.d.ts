import { SuperComponent } from '../common/src/index';
export default class Link extends SuperComponent {
    externalClasses: any[];
    properties: import("./type").TdLinkProps;
    data: {
        prefix: string;
        classPrefix: string;
    };
    observers: {
        'theme, status, size, underline, navigatorProps'(): void;
        prefixIcon(prefixIcon: any): void;
        suffixIcon(suffixIcon: any): void;
    };
    lifetimes: {
        attached(): void;
    };
    methods: {
        setClass(): void;
        onSuccess(e: any): void;
        onFail(e: any): void;
        onComplete(e: any): void;
    };
}
