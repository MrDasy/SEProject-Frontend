var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
import { setIcon } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-link`;
let Link = class Link extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [];
        this.properties = props;
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            'theme, status, size, underline, navigatorProps'() {
                this.setClass();
            },
            prefixIcon(prefixIcon) {
                const obj = setIcon('prefixIcon', prefixIcon, '');
                this.setData(Object.assign({}, obj));
            },
            suffixIcon(suffixIcon) {
                const obj = setIcon('suffixIcon', suffixIcon, '');
                this.setData(Object.assign({}, obj));
            },
        };
        this.lifetimes = {
            attached() {
                this.setClass();
            },
        };
        this.methods = {
            setClass() {
                const { theme, status, size, underline, navigatorProps } = this.properties;
                const classList = [name, `${name}--${status}-${theme}`, `${name}--${size}`];
                if (underline) {
                    classList.push(`${name}--underline`);
                }
                if ((navigatorProps && !navigatorProps.url) || status === 'disabled') {
                    classList.push(`${name}--disabled`);
                }
                this.setData({
                    className: classList.join(' '),
                });
            },
            onSuccess(e) {
                this.triggerEvent('success', e);
            },
            onFail(e) {
                this.triggerEvent('fail', e);
            },
            onComplete(e) {
                this.triggerEvent('complete', e);
            },
        };
    }
};
Link = __decorate([
    wxComponent()
], Link);
export default Link;
