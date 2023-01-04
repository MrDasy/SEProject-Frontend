export interface TdSwiperProps {
    autoplay?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    current?: {
        type: NumberConstructor;
        value?: number;
    };
    defaultCurrent?: {
        type: NumberConstructor;
        value?: number;
    };
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    direction?: {
        type: StringConstructor;
        value?: 'horizontal' | 'vertical';
    };
    displayMultipleItems?: {
        type: NumberConstructor;
        value?: number;
    };
    duration?: {
        type: NumberConstructor;
        value?: number;
    };
    easingFunction?: {
        type: StringConstructor;
        value?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic';
    };
    height?: {
        type: null;
        value?: string | number;
    };
    interval?: {
        type: NumberConstructor;
        value?: number;
    };
    list?: {
        type: ArrayConstructor;
        value?: string[];
    };
    loop?: {
        type: BooleanConstructor;
        value?: boolean;
    };
    navigation?: {
        type: ObjectConstructor;
        value?: SwiperNavigation;
    };
    nextMargin?: {
        type: null;
        value?: string | number;
    };
    paginationPosition?: {
        type: StringConstructor;
        value?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right';
    };
    previousMargin?: {
        type: null;
        value?: string | number;
    };
    snapToEdge?: {
        type: BooleanConstructor;
        value?: boolean;
    };
}
export interface SwiperNavigation {
    customStyle?: string;
    minShowNum?: number;
    showSlideBtn?: boolean;
    type?: SwiperNavigationType;
}
export declare type SwiperNavigationType = 'dots' | 'dots-bar' | 'fraction';
