import config from '../config';
const { prefix } = config;
const defaultId = {
    current: 0,
};
export const useId = () => `${prefix}-id-${defaultId.current++}`;
