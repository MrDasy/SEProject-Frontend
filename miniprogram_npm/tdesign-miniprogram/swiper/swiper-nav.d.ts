import { SuperComponent, RelationsOptions } from '../common/src/index';
declare type NavOptions = {
    index: number;
    total: number;
    direction: boolean;
    paginationPosition: string;
};
export default class SwiperNav extends SuperComponent {
    externalClasses: string[];
    properties: {
        type: {
            type: StringConstructor;
            value: string;
        };
        minShowNum: {
            type: NumberConstructor;
            value: number;
        };
        showControls: {
            type: BooleanConstructor;
            value: boolean;
        };
    };
    relations: RelationsOptions;
    data: {
        index: number;
        total: number;
        direction: string;
        prefix: string;
        classPrefix: string;
    };
    methods: {
        onChange(opt: NavOptions): void;
        nav(e: any): void;
    };
}
export {};
