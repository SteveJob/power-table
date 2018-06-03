import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
import { Pop } from 'zent';
import registerServiceWorker from './registerServiceWorker';
import Table from './table/Table';

const columns = [{
  bodyRender: (data: any) => {
    return (
      <a>{data.goods}</a>
    );
  },
  title: '商品',
  width: 220,
}, {
  name: 'specifications',
  title: '规格',
  width: 220,
}, {
  name: 'categoryName',
  title: '分类',
  width: 220,
}, {
  name: 'createdAt',
  needSort: true,
  title: '创建时间',
  width: 220,
}];

const datasets = [
  {
    categoryName: '分类一',
    createdAt: 1231241341,
    goods: '商品️一',
    specifications: '规格一',
    spuId: 1,
  }, 
  {
    categoryName: '分类二',
    createdAt: 1231241341,
    goods: '商品️二',
    specifications: '规格二',
    spuId: 2,
  }, 
  {
    categoryName: '分类三',
    createdAt: 1231241341,
    goods: '商品️三',
    specifications: '规格三',
    spuId: 3,
  }, 
  {
    categoryName: '分类四',
    createdAt: 1231241341,
    goods: '商品️四',
    specifications: '规格四',
    spuId: 4,
  }, 
  {
    categoryName: '分类五',
    createdAt: 1231241341,
    goods: '商品️五',
    specifications: '规格五',
    spuId: 5,
  }, 
  {
    categoryName: '分类六',
    createdAt: 1231241341,
    goods: '商品️六',
    specifications: '规格六',
    spuId: 6,
  }, 
  {
    categoryName: '分类七',
    createdAt: 1231241341,
    goods: '商品️七',
    specifications: '规格七',
    spuId: 7,
  }, 
  {
    categoryName: '分类八',
    createdAt: 1231241341,
    goods: '商品️八',
    specifications: '规格八',
    spuId: 8,
  }, 
  {
    categoryName: '分类九',
    createdAt: 1231241341,
    goods: '商品️九',
    specifications: '规格九',
    spuId: 9,
  }, 
  {
    categoryName: '分类十',
    createdAt: 1231241341,
    goods: '商品️十',
    specifications: '规格十',
    spuId: 10,
  }, 
  {
    categoryName: '分类十一',
    createdAt: 1231241341,
    goods: '商品️十一',
    specifications: '规格十一',
    spuId: 11,
  }
];

class App extends React.Component<any, any> {
  public render() {
    return (
      <Table
        columns={columns}
        datasets={datasets}
        rowKey="spuId"
        selection={{
          customizeComponent: (selectComponent: JSX.Element, checked: boolean) => {
            return (
              <Pop
                trigger="click"
                position="right-center"
                content={'hello'}
                visible={checked && this.state.visible}
                onVisibleChange={(visible) => {
                  this.setState({ visible })
                }}
              >
                {selectComponent}
              </Pop>
            );
          },
          onSelect: () => {
            console.log('onselect is invoked')
          },
          selectedRowKeys: [1, 2],
          getCheckedProps: () => {
            return {
              // disabled: true,
              // indeterminate: true
            }
          }
        }}
        scroll={{ x: 1000, y: 300 }}
      />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
