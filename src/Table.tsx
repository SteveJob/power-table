import * as React from 'react';
import { ITableProps } from './interface';
import './style/index.css'

export default class Table<T> extends React.Component<ITableProps<T>, any> {
    constructor(props: ITableProps<T>) {
        super(props);
    }

    public render() {
        return (
            <div className="table">hello table</div>
        )
    }
}