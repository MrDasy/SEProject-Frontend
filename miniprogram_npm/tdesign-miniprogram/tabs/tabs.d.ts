/// <reference types="miniprogram-api-typings" />
import { SuperComponent, RelationsOptions } from '../common/src/index';
export default class Tabs extends SuperComponent {
    behaviors: string[];
    externalClasses: string[];
    relations: RelationsOptions;
    properties: import("./type").TdTabsProps;
    controlledProps: {
        key: string;
        event: string;
    }[];
    observers: {
        value(name: any): void;
        placement(): void;
    };
    data: {
        prefix: string;
        classPrefix: string;
        tabs: any[];
        currentIndex: number;
        trackStyle: string;
        isScrollX: boolean;
        isScrollY: boolean;
        direction: string;
        offset: number;
        tabPanelId: string;
    };
    created(): void;
    initChildId(): void;
    attached(): void;
    methods: {
        adjustPlacement(): void;
    };
    updateTabs(cb: any): void;
    setCurrentIndexByName(name: any): void;
    setCurrentIndex(index: number): void;
    getCurrentName(): any;
    calcScrollOffset(containerWidth: number, targetLeft: number, targetWidth: number, offset: number): number;
    getTrackSize(): Promise<number>;
    setTrack(): Promise<void>;
    onTabTap(event: any): void;
    onTouchStart(event: any): void;
    onTouchMove(event: any): void;
    onTouchEnd(): void;
    onTouchScroll(event: WechatMiniprogram.CustomEvent): void;
    changeIndex(index: any): void;
    getAvailableTabIndex(deltaX: number): number;
}
