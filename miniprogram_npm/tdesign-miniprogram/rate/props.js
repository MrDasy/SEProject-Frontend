const props = {
    allowHalf: {
        type: Boolean,
        value: false,
    },
    color: {
        type: null,
        value: '#ED7B2F',
    },
    count: {
        type: Number,
        value: 5,
    },
    customStyle: {
        type: String,
        value: '',
    },
    disabled: {
        type: Boolean,
    },
    externalClasses: {
        type: Array,
    },
    gap: {
        type: Number,
        value: 4,
    },
    icon: {
        type: null,
    },
    showText: {
        type: Boolean,
        value: false,
    },
    size: {
        type: String,
        value: '24px',
    },
    texts: {
        type: Array,
        value: [],
    },
    value: {
        type: Number,
        value: null,
    },
    defaultValue: {
        type: Number,
        value: 0,
    },
    variant: {
        type: String,
        value: 'outline',
    },
};
export default props;
