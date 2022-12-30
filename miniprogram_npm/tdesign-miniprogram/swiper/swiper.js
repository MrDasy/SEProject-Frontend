var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import props from './props';
const { prefix } = config;
const name = `${prefix}-swiper`;
const defaultNavigation = {
    type: 'dots',
    minShowNum: 2,
    showControls: false,
};
let Swiper = class Swiper extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-nav`,
            `${prefix}-class-image`,
            `${prefix}-class-prev-image`,
            `${prefix}-class-next-image`,
        ];
        this.options = {
            multipleSlots: true,
        };
        this.properties = props;
        this.observers = {
            current(v) {
                this.updateNav(v);
            },
            navigation(val) {
                this.setData({
                    _navigation: Object.assign(Object.assign({}, defaultNavigation), val),
                });
            },
        };
        this.$nav = null;
        this.relations = {
            './swiper-nav': {
                type: 'child',
            },
        };
        this.data = {
            _navigation: null,
            prefix,
            classPrefix: name,
        };
        this.lifetimes = {
            ready() {
                this.initNav();
                this.updateNav(this.data.current);
            },
        };
        this.methods = {
            initNav() {
                var _a;
                const { _navigation } = this.data;
                if (_navigation) {
                    this.$nav = this.selectComponent('#swiperNav');
                }
                else {
                    this.$nav = (_a = this.getRelationNodes('./swiper-nav')) === null || _a === void 0 ? void 0 : _a[0];
                }
            },
            updateNav(index) {
                var _a;
                if (!this.$nav)
                    return;
                const { direction, paginationPosition, list } = this.properties;
                (_a = this.$nav) === null || _a === void 0 ? void 0 : _a.onChange({
                    index,
                    total: list.length,
                    direction,
                    paginationPosition,
                });
            },
            onChange(e) {
                const { current, source } = e.detail;
                this.setData({ current });
                this.triggerEvent('change', { current, source });
            },
            onNavBtnChange(e) {
                const { dir, source } = e.detail;
                this.doNavBtnChange(dir, source);
            },
            doNavBtnChange(dir, source) {
                const { current, list, loop } = this.data;
                const count = list.length;
                let nextPos = dir === 'next' ? current + 1 : current - 1;
                if (loop) {
                    nextPos = dir === 'next' ? (current + 1) % count : (current - 1 + count) % count;
                }
                else {
                    nextPos = nextPos < 0 || nextPos >= count ? current : nextPos;
                }
                if (nextPos === current)
                    return;
                this.setData({
                    current: nextPos,
                });
                this.triggerEvent('change', { current: nextPos, source });
            },
        };
    }
};
Swiper = __decorate([
    wxComponent()
], Swiper);
export default Swiper;
