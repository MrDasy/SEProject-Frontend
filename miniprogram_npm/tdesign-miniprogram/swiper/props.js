const props = {
    autoplay: {
        type: Boolean,
        value: true,
    },
    current: {
        type: Number,
        value: null,
    },
    defaultCurrent: {
        type: Number,
        value: 0,
    },
    customStyle: {
        type: String,
        value: '',
    },
    direction: {
        type: String,
        value: 'horizontal',
    },
    displayMultipleItems: {
        type: Number,
        value: 1,
    },
    duration: {
        type: Number,
        value: 300,
    },
    easingFunction: {
        type: String,
        value: 'default',
    },
    height: {
        type: null,
        value: '192px',
    },
    interval: {
        type: Number,
        value: 5000,
    },
    list: {
        type: Array,
    },
    loop: {
        type: Boolean,
        value: true,
    },
    navigation: {
        type: Object,
    },
    nextMargin: {
        type: null,
        value: 0,
    },
    paginationPosition: {
        type: String,
        value: 'bottom',
    },
    previousMargin: {
        type: null,
        value: 0,
    },
    snapToEdge: {
        type: Boolean,
        value: false,
    },
};
export default props;
