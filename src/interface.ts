export interface IColumnProps<T> {
    title: JSX.Element
    name: string
    dataIndex: string
    render: (rowData: T) => JSX.Element
}

export interface ITableProps<T> {
    columns: Array<IColumnProps<T>>
    dataSource: T[]
}