import { IStore } from './createStore';

export interface IColumnProps<T> {
    title?: JSX.Element | string
    name?: string
    dataIndex?: string
    needSort?: boolean
    width?: number
    bodyRender?: (rowData: T, row: number, col: number) => JSX.Element
}

export interface IRowSelection<T> {
    customizeComponent?: (selectComponent: JSX.Element, checked: boolean) => JSX.Element
    onSelect?: (selectedRowkeys: string[], selectedRows: T[], currentRow: T) => void
    selectedRowKeys?: any[]
    type?: 'radio' | 'checkbox'
    getCheckedProps?: () => any
}

export interface ITableProps<T> {
    columns?: Array<IColumnProps<T>>
    datasets?: T[]
    rowKey?: any
    selection?: IRowSelection<T>
    scroll?: { x: number, y: number }
    className?: string
    bordered?: boolean
    prefix?: string
}

/* TableHeader */
export interface ITableHeaderProps {
    columns: any[]
    store?: IStore
    fixedHeader?: boolean
    colgroup?: JSX.Element
}

/* TableBody */
export interface ITableBodyProps<T> {
    store?: IStore
    datasets?: T[]
    rowKey?: any
    columns?: any[]
    fixedHeader?: boolean
    colgroup?: JSX.Element | void
    selection?: IRowSelection<T>
}

/* TableFooter */
