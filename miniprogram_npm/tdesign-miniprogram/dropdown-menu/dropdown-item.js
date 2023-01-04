var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './dropdown-item-props';
import menuProps from './props';
import { equal, clone } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-dropdown-item`;
let DropdownMenuItem = class DropdownMenuItem extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-content`,
            `${prefix}-class-column`,
            `${prefix}-class-column-item`,
            `${prefix}-class-column-item-label`,
            `${prefix}-class-footer`,
        ];
        this.properties = Object.assign({}, props);
        this.data = {
            prefix,
            classPrefix: name,
            show: false,
            top: 0,
            maskHeight: 0,
            initValue: null,
            hasChanged: false,
            duration: menuProps.duration.value,
            zIndex: menuProps.zIndex.value,
            overlay: menuProps.showOverlay.value,
            labelAlias: 'label',
            valueAlias: 'value',
        };
        this.parent = null;
        this.relations = {
            './dropdown-menu': {
                type: 'parent',
                linked(target) {
                    const { zIndex, duration, showOverlay } = target.properties;
                    this.parent = target;
                    this.setData({
                        zIndex,
                        duration,
                        showOverlay,
                    });
                },
            },
        };
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            keys(obj) {
                this.setData({
                    labelAlias: obj.label || 'label',
                    valueAlias: obj.value || 'value',
                });
            },
            value(v) {
                const { options, labelAlias, valueAlias } = this.data;
                if (this.data.multiple) {
                    if (!Array.isArray(v))
                        throw TypeError('应传入数组类型的 value');
                }
                const target = options.find((item) => item[valueAlias] === v);
                if (target) {
                    this.setData({
                        label: target[labelAlias],
                    });
                }
            },
            'initValue, value'(v1, v2) {
                this.setData({
                    hasChanged: !equal(v1, v2),
                });
            },
            label() {
                var _a;
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getAllItems();
            },
            show(visible) {
                if (visible) {
                    this.getParentBottom(this.parent, () => {
                        this.setData({ wrapperVisible: true });
                    });
                }
            },
        };
        this.lifetimes = {
            attached() {
                const { value, defaultValue } = this.data;
                this.setData({
                    initValue: clone(value || defaultValue),
                });
            },
        };
        this.methods = {
            closeDropdown() {
                var _a;
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.setData({
                    activeIdx: -1,
                });
                this.setData({
                    show: false,
                });
            },
            getParentBottom(parent, cb) {
                const query = wx.createSelectorQuery().in(parent);
                query
                    .select(`#${prefix}-bar`)
                    .boundingClientRect((res) => {
                    this.setData({
                        top: res.bottom,
                        maskHeight: res.top,
                    }, cb);
                })
                    .exec();
            },
            handleTreeClick(e) {
                const { level, value: itemValue } = e.currentTarget.dataset;
                const { value } = this.data;
                value[level] = itemValue;
                this._trigger('change', { value });
            },
            handleRadioChange(e) {
                const { value } = e.detail;
                this._trigger('change', { value });
                if (!this.data.multiple) {
                    this.closeDropdown();
                }
            },
            handleMaskClick() {
                var _a;
                if ((_a = this.parent) === null || _a === void 0 ? void 0 : _a.properties.closeOnClickOverlay) {
                    this.closeDropdown();
                }
            },
            handleReset() {
                this._trigger('change', { value: clone(this.data.initValue) });
            },
            handleConfirm() {
                this._trigger('confirm', { value: this.data.value });
                this.closeDropdown();
            },
            onLeaved() {
                this.setData({ wrapperVisible: false });
            },
        };
    }
};
DropdownMenuItem = __decorate([
    wxComponent()
], DropdownMenuItem);
export default DropdownMenuItem;
