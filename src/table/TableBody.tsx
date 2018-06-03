import * as React from 'react';
import { ITableBodyProps } from './interface';

export default class TableHeader<T> extends React.Component<ITableBodyProps<T>, any> {
    constructor(props: ITableBodyProps<T>) {
        super(props);
    }

    public render() {
        const { datasets, columns, rowKey, fixedHeader, colgroup } = this.props;
        const body = (
            <tbody>
                {
                    datasets!.map((rowData, rowIndex) => {
                        return (
                            <tr key={rowData[rowKey]}>
                                {columns!.map(({name, dataIndex, bodyRender}, colIndex) => {
                                    let children = rowData[name||dataIndex];
                                    if (bodyRender) {
                                        children = bodyRender(rowData, rowIndex, colIndex)
                                    }
                                    return <td key={colIndex}>{children}</td>;
                                })}
                            </tr>
                        )
                    })
                }
            </tbody>
        )
        if(fixedHeader) {
            return (
                <table>
                    {colgroup}
                    {body}
                </table>
            )
        }
        return body;
    }
}