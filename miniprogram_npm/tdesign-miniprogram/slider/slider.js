var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SuperComponent, wxComponent } from '../common/src/index';
import config from '../common/config';
import { trimSingleValue, trimValue } from './tool';
import props from './props';
import { getRect } from '../common/utils';
const { prefix } = config;
const name = `${prefix}-slider`;
let Slider = class Slider extends SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-bar`,
            `${prefix}-class-bar-active`,
            `${prefix}-class-bar-disabled`,
            `${prefix}-class-cursor`,
        ];
        this.properties = props;
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.data = {
            sliderStyles: '',
            classPrefix: name,
            initialLeft: null,
            initialRight: null,
            activeLeft: 0,
            activeRight: 0,
            maxRange: 0,
            lineLeft: 0,
            lineRight: 0,
            dotTopValue: [0, 0],
            _value: 0,
            blockSize: 20,
            isScale: false,
            scaleArray: [],
            scaleTextArray: [],
            prefix,
        };
        this.observers = {
            value(newValue) {
                this.handlePropsChange(newValue);
            },
            _value(newValue) {
                const { min, max, range } = this.properties;
                const { maxRange } = this.data;
                if (range) {
                    const left = (maxRange * (newValue[0] - Number(min))) / (Number(max) - Number(min));
                    const right = (maxRange * (Number(max) - newValue[1])) / (Number(max) - Number(min));
                    this.setLineStyle(left, right);
                }
                else {
                    this.setSingleBarWidth(newValue);
                }
            },
            marks(val) {
                this.handleMask(val);
            },
        };
        this.lifetimes = {
            attached() {
                const { value } = this.properties;
                if (!value)
                    this.handlePropsChange(0);
                this.getInitialStyle();
            },
        };
    }
    triggerValue(value) {
        this._trigger('change', {
            value: trimValue(value, this.properties),
        });
    }
    handlePropsChange(newValue) {
        const value = trimValue(newValue, this.properties);
        const setValueAndTrigger = () => {
            this.setData({
                _value: value,
            });
        };
        if (this.data.maxRange === 0) {
            this.getInitialStyle().then(setValueAndTrigger);
            return;
        }
        setValueAndTrigger();
    }
    handleMask(marks) {
        if ((marks === null || marks === void 0 ? void 0 : marks.length) && Array.isArray(marks)) {
            this.setData({
                isScale: true,
                scaleArray: marks,
                scaleTextArray: [],
            });
        }
        if (Object.prototype.toString.call(marks) === '[object Object]') {
            const scaleArray = Object.keys(marks).map((item) => Number(item));
            const scaleTextArray = scaleArray.map((item) => marks[item]);
            this.setData({
                isScale: scaleArray.length > 0,
                scaleArray,
                scaleTextArray,
            });
        }
    }
    setSingleBarWidth(value) {
        const { max, min } = this.properties;
        const { maxRange, blockSize } = this.data;
        const percentage = (Number(value) - Number(min)) / (Number(max) - Number(min));
        const width = percentage * maxRange + blockSize / 2;
        this.setData({
            lineBarWidth: `${width}px`,
        });
    }
    getInitialStyle() {
        return __awaiter(this, void 0, void 0, function* () {
            const line = yield getRect(this, '#sliderLine');
            const { blockSize } = this.data;
            const { theme } = this.properties;
            const halfBlock = Number(blockSize) / 2;
            const margin = theme === 'capsule' ? 6 : 0;
            this.setData({
                maxRange: line.right - line.left - Number(blockSize) - margin,
                initialLeft: line.left + halfBlock,
                initialRight: line.right - halfBlock,
            });
        });
    }
    stepValue(value) {
        const { step, min, max } = this.properties;
        if (Number(step) < 1 || Number(step) > Number(max) - Number(min))
            return value;
        const closestStep = trimSingleValue(Math.round(value / Number(step)) * Number(step), Number(min), Number(max));
        return closestStep;
    }
    onSingleLineTap(e) {
        const { disabled } = this.properties;
        if (disabled)
            return;
        const value = this.getSingleChangeValue(e);
        this.triggerValue(value);
    }
    getSingleChangeValue(e) {
        const { min, max } = this.properties;
        const { initialLeft, maxRange } = this.data;
        const [touch] = e.changedTouches;
        const { pageX } = touch;
        const currentLeft = pageX - initialLeft;
        let value = 0;
        if (currentLeft <= 0) {
            value = Number(min);
        }
        else if (currentLeft >= maxRange) {
            value = Number(max);
        }
        else {
            value = Math.round((currentLeft / maxRange) * (Number(max) - Number(min)) + Number(min));
        }
        return this.stepValue(value);
    }
    convertPosToValue(posValue, dir) {
        const { maxRange } = this.data;
        const { max, min } = this.properties;
        return dir === 0
            ? (posValue / maxRange) * (Number(max) - Number(min)) + Number(min)
            : Number(max) - (posValue / maxRange) * (Number(max) - Number(min));
    }
    onLineTap(e) {
        const { disabled } = this.properties;
        const { initialLeft, initialRight, maxRange, blockSize } = this.data;
        if (disabled)
            return;
        const [touch] = e.changedTouches;
        const { pageX } = touch;
        const halfBlock = Number(blockSize) / 2;
        const currentLeft = pageX - initialLeft;
        if (currentLeft < 0 || currentLeft > maxRange + Number(blockSize))
            return;
        Promise.all([getRect(this, '#leftDot'), getRect(this, '#rightDot')]).then(([leftDot, rightDot]) => {
            const distanceLeft = Math.abs(pageX - leftDot.left - halfBlock);
            const distanceRight = Math.abs(rightDot.left - pageX + halfBlock);
            const isMoveLeft = distanceLeft < distanceRight;
            if (isMoveLeft) {
                const left = pageX - initialLeft;
                const leftValue = this.convertPosToValue(left, 0);
                this.triggerValue([this.stepValue(leftValue), this.data._value[1]]);
            }
            else {
                const right = -(pageX - initialRight);
                const rightValue = this.convertPosToValue(right, 1);
                this.triggerValue([this.data._value[0], this.stepValue(rightValue)]);
            }
        });
    }
    onTouchMoveLeft(e) {
        const { disabled } = this.properties;
        const { initialLeft, _value } = this.data;
        if (disabled)
            return;
        const [touch] = e.changedTouches;
        const { pageX } = touch;
        const currentLeft = pageX - initialLeft;
        const newData = [..._value];
        const leftValue = this.convertPosToValue(currentLeft, 0);
        newData[0] = this.stepValue(leftValue);
        this.triggerValue(newData);
    }
    onTouchMoveRight(e) {
        const { disabled } = this.properties;
        const { initialRight, _value } = this.data;
        if (disabled)
            return;
        const [touch] = e.changedTouches;
        const { pageX } = touch;
        const currentRight = -(pageX - initialRight);
        const newData = [..._value];
        const rightValue = this.convertPosToValue(currentRight, 1);
        newData[1] = this.stepValue(rightValue);
        this.triggerValue(newData);
    }
    setLineStyle(left, right) {
        const { blockSize, maxRange } = this.data;
        const halfBlock = Number(blockSize) / 2;
        const [a, b] = this.data._value;
        const cut = (v) => parseInt(v, 10);
        this.setData({
            dotTopValue: [a, b],
        });
        if (left + right <= maxRange) {
            this.setData({
                lineLeft: cut(left + halfBlock),
                lineRight: cut(right + halfBlock),
            });
        }
        else {
            this.setData({
                lineLeft: cut(maxRange + halfBlock - right),
                lineRight: cut(maxRange - left + halfBlock * 1.5),
            });
        }
    }
};
Slider = __decorate([
    wxComponent()
], Slider);
export default Slider;
