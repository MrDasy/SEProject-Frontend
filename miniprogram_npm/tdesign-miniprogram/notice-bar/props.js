const props = {
    content: {
        type: null,
    },
    direction: {
        type: String,
        value: 'horizontal',
    },
    customStyle: {
        type: String,
        value: '',
    },
    externalClasses: {
        type: Array,
    },
    extra: {
        type: String,
    },
    marquee: {
        type: null,
        value: false,
    },
    prefixIcon: {
        type: null,
        value: true,
    },
    suffixIcon: {
        type: null,
        value: null,
    },
    theme: {
        type: String,
        value: 'info',
    },
    visible: {
        type: Boolean,
        value: null,
    },
    defaultVisible: {
        type: Boolean,
        value: false,
    },
};
export default props;
