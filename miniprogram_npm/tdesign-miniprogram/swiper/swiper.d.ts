import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class Swiper extends SuperComponent {
    externalClasses: string[];
    options: {
        multipleSlots: boolean;
    };
    properties: import("./type").TdSwiperProps;
    observers: {
        current(v: any): void;
        navigation(val: any): void;
    };
    $nav: any;
    relations: RelationsOptions;
    data: {
        _navigation: any;
        prefix: string;
        classPrefix: string;
    };
    lifetimes: {
        ready(): void;
    };
    methods: {
        initNav(): void;
        updateNav(index: any): void;
        onChange(e: any): void;
        onNavBtnChange(e: any): void;
        doNavBtnChange(dir: any, source: any): void;
    };
}
