export interface TdIndexesProps {
    customStyle?: {
        type: StringConstructor;
        value?: string;
    };
    indexList?: {
        type: ArrayConstructor;
        value?: string[] | number[];
    };
    list?: {
        type: ArrayConstructor;
        value?: ListItem[];
    };
    sticky?: {
        type: BooleanConstructor;
        value?: Boolean;
    };
}
export interface ListItem {
    title: string;
    index: string;
    children: {
        title: string;
        [key: string]: any;
    }[];
}
