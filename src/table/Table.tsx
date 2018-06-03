import * as React from 'react';
import createStore, { IStore } from './createStore';
import cx from 'classnames';
import { Radio, Checkbox } from 'zent';
import update from 'immutability-helper';
import { ITableProps, IColumnProps } from './interface';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

import '../style/index.less'
import '../../node_modules/zent/css/index.css'

export default class Table<T> extends React.Component<ITableProps<T>, any> {
    public static defaultProps = {
        prefix: 'powerful'
    }
    private store: IStore;
    private unsubscribe: any;

    constructor(props: ITableProps<T>) {
        super(props);
        this.store = createStore({
            selectedRowKeys: []
        });
        this.state = {
            columns: this.processColumns(props)
        };
        this.unsubscribe = this.store.subscribe(() => {
            /* selectedRowKeys变化需要更新this.state.columns */
            this.setState({
                columns: this.processColumns(this.props)
            })
        });
    }

    public render() {
        const { prefix, className, bordered } = this.props;
        const tableCls = cx(`${prefix}-table`, className, {
            [`${prefix}-table-bordered`]: bordered
        });

        const content = [
            this.renderHeader(),
            this.renderBody()
        ];
        return (
            this.isFixedHeader() ?
            <div className={tableCls}>
                {content}
            </div> :
            <div className={tableCls}>
                <table>
                    {content}
                </table>
            </div>
        )
    }

    public componentWillReceiveProps(nextProps) {
        this.setState({
            columns: this.processColumns(nextProps)
        })
    }

    public componentWillUnmount() {
        this.unsubscribe();
    }

    private processColumns = (props: ITableProps<T>) => {
        const { columns, selection, rowKey, datasets } = props;
        let newColumns;
        if(selection) {
            const { type } = selection;
            const isSingleSelect = type === 'radio';
            let selectCol: IColumnProps<T>;
            let Comp: React.ComponentClass<{checked, onChange, indeterminate, disabled}> = Checkbox;
            const { handleCheck, handleCheckAll } = this;
            const { selectedRowKeys } = this.store.getState();
            const checkAll = this.isCheckAll(selectedRowKeys, datasets);
            const indeterminate = selectedRowKeys.length > 0 && !checkAll;
            const disableCheckAll = datasets!.length === 0;
            if(isSingleSelect) {
                Comp = Radio;
            }
            selectCol = {
                bodyRender: (rowData, row, col) => {
                    const { customizeComponent, getCheckedProps } = selection;
                    const value = datasets![row][rowKey];
                    const checked = selectedRowKeys.indexOf(value) > -1;
                    const { disabled, indeterminate } = getCheckedProps && getCheckedProps()
                    const selectComponent = (
                        <Comp 
                            onChange={() => handleCheck(value, isSingleSelect)} 
                            checked={checked} 
                            indeterminate={indeterminate} 
                            disabled={disabled}
                        />
                    )
                    return customizeComponent ? customizeComponent(selectComponent, checked) : selectComponent;
                },
                name: 'powerful-table-select-col',
                title: (
                    isSingleSelect ? 
                    '' : 
                    <Checkbox 
                        checked={checkAll} 
                        indeterminate={indeterminate} 
                        disabled={disableCheckAll} 
                        onChange={handleCheckAll}
                    />
                ),
                width: 100,
            }
            newColumns = update(columns, {$unshift: [selectCol]})
        }
        return newColumns;
    }

    private renderHeader = () => {
        const { columns } = this.state;
        return (
            <TableHeader 
                columns={columns} 
                store={this.store} 
                fixedHeader={this.isFixedHeader()} 
                colgroup={this.renderColgroup()}
            />
        );
    }

    private renderBody = () => {
        const { datasets, rowKey, selection } = this.props;
        const { columns } = this.state;
        return (
            <TableBody 
                store={this.store} 
                fixedHeader={this.isFixedHeader()} 
                columns={columns} 
                datasets={datasets} 
                rowKey={rowKey} 
                selection={selection}
                colgroup={this.renderColgroup()}
            />
        );
    }

    private renderColgroup = () => {
        if(this.isFixedHeader()) {
            const { columns } = this.state;
            return (
                <colgroup>
                    {columns!.map((column, index) => (
                        <col
                            key={index}
                            style={{
                                minWidth: `${column.width}px`,
                                width: `${column.width}px`, 
                            }}
                        />
                    ))}
                </colgroup>
            )
        }
        return undefined;
    }

    private isFixedHeader = () => {
        const { scroll } = this.props;
        return !!(scroll && scroll.y);
    }

    private handleCheck = (value, isSingleSelect) => {
        const { selectedRowKeys } = this.store.getState();
        const valueIndex = selectedRowKeys.indexOf(value);
        if(valueIndex > -1) {
            selectedRowKeys.splice(valueIndex, 1);
        } else {
            selectedRowKeys.push(value);
        }
        
        this.store.setState({
            selectedRowKeys: isSingleSelect ? [value] : selectedRowKeys
        });
    }

    private isCheckAll = (selectedRowKeys, datasets) => {
        return selectedRowKeys.length > 0 && selectedRowKeys.length === datasets!.length;
    }

    private handleCheckAll = () => {
        const { rowKey, datasets } = this.props;
        let { selectedRowKeys } = this.store.getState();
        if(this.isCheckAll(selectedRowKeys, datasets)) {
            selectedRowKeys = [];
        } else {
            selectedRowKeys = datasets!.map(item => item[rowKey]);
        }
        this.store.setState({
            selectedRowKeys
        });
    }
}