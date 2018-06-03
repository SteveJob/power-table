import * as React from 'react';
import { ITableHeaderProps } from './interface';

export default class TableHeader extends React.Component<ITableHeaderProps, any> {
    constructor(props: ITableHeaderProps) {
        super(props);
    }

    public render() {
        const { columns, fixedHeader, colgroup } = this.props;
        const header = (
            <thead className="powerful-table-header">
                <tr>
                    {columns.map((col: any, index) => {
                        return <th key={col.dataIndex || col.name || index}>{col.title}</th>
                    })}
                </tr>
            </thead>
        )
        if(fixedHeader) {
            return (
                <table className="powerful-table-header">
                    {colgroup}
                    {header}
                </table>
            );
        }
        return header;
    }
}