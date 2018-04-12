import React, { Component } from 'react';
import ExtTable, { ExtTableColumn, ExtTableRow } from 'CommonUI/extTable';

const tableData = [];

const tableHeader = [
    {key:"Title",title: "标题",width: 200},
    {key:"Date",title: "日期",width: 100},
    {key:"Type",title: "类型",width: 200, type:"select"},
    {key:"status",title: "Status",width: 80},
    {key:"operate",title: "Operate",width: 80 },
    {key:"Existsting",title: 'Existsting',width: 60, type: "checkbox"},
    {key:"ID",title: "编号",width: 40}
];
const tableHeader1 = [
    {key:"ID",title: "编号",width: 40},
    {key:"Title",title: "标题",width: 200},
    {key:"Date",title: "日期",width: 100},
    {key:"Type",title: "类型",width: 200, type:"select"},
    {key:"status",title: "Status",width: 80},
    {key:"operate",title: "Operate",width: 80 },
    {key:"Existsting",title: 'Existsting',width: 60, type: "checkbox"}
];
for(let i = 0;i<30;i++) {
    tableData.push({
        ID:12,
        Title:"ExampleValue44"+i,
        Date:"2017-11-08",
        Type:{ value: "SELECTONE",data: [
            {value:"select1"+i,displayValue:"Select1Display"+i},
            {value:"select2"+i,displayValue:"Select2Display"+i},
            {value:"select4"+i,displayValue:"Select3Display"+i}
            ] 
        },
        status: "success",
        operate: <a href="javascript:alert('delete');">delete</a>,
        Existsting: (i % 3 == 0 ? true : false)
    })
}
export class TableExample extends Component {
    render () {
        return (<div>
            <h1 style={{display: 'block'}}>tableExample</h1>
            <div style={{display: 'block',width: '600px',margin: '50px auto'}}>
                <div style={{padding: "50px 40px"}}>
                    <ExtTable data={tableData} header={tableHeader1} />
                </div>
                <div style={{padding: "50px 40px"}}>
                    <ExtTable data={[]} header={tableHeader} >
                        <ExtTableRow data={tableData[0]} header={tableHeader} />
                    </ExtTable>
                </div>
                <div style={{display: 'block',height: '300px', background:'pink'}}>ssddff</div>
            </div>
        </div>);
    }
}
