/// <reference types="miniprogram-api-typings" />
import { SuperComponent, ComponentsOptionsType } from '../common/src/index';
import { MessageProps } from './message.interface';
export default class Message extends SuperComponent {
    externalClasses: string[];
    options: ComponentsOptionsType;
    properties: MessageProps;
    data: {
        prefix: string;
        classPrefix: string;
        visible: boolean;
        loop: number;
        animation: any[];
        showAnimation: any[];
        wrapTop: number;
    };
    observers: {
        marquee(val: any): void;
        icon(icon: any): void;
        closeBtn(closeBtn: any): void;
    };
    closeTimeoutContext: number;
    nextAnimationContext: number;
    resetAnimation: WechatMiniprogram.Animation;
    ready(): void;
    memoInitalData(): void;
    resetData(cb: () => void): void;
    detached(): void;
    checkAnimation(): void;
    clearMessageAnimation(): void;
    show(): void;
    hide(): void;
    reset(): void;
    handleClose(): void;
    handleBtnClick(): void;
}
