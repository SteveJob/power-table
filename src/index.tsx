import * as React from 'react';
import * as ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Table from './Table';

ReactDOM.render(
  <Table
    columns={[]}
    dataSource={[]}
  />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
