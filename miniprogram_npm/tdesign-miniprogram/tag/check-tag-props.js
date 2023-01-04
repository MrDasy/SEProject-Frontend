const props = {
    checked: {
        type: Boolean,
        value: undefined,
    },
    defaultChecked: {
        type: Boolean,
        value: undefined,
    },
    closable: {
        type: Boolean,
        value: false,
    },
    content: {
        type: null,
    },
    customStyle: {
        type: String,
        value: '',
    },
    disabled: {
        type: Boolean,
        value: false,
    },
    externalClasses: {
        type: Array,
    },
    icon: {
        type: String,
    },
    shape: {
        type: String,
        value: 'square',
    },
    size: {
        type: String,
        value: 'medium',
    },
    variant: {
        type: String,
        value: 'dark',
    },
};
export default props;
