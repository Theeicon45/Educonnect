import { Table } from 'antd';

const AdmissionManagement = () => {
  const columns=[
  {
    title:'Name',
    dataIndex:'name'
  },
  {
    title:'Age',
    dataIndex:'age'
  },
  {
    title:'Adress',
    dataIndex:'adress'
  }

];
const dataSource =[]
for (let index=1; index<17; index++){
  dataSource.push({
    key:index,
    name:"Name"+index,
    age:index,
    adress:"Adress"+index,
    description:"Description"+index
  })
}
  return (
    <div className="">
        <Table 
        columns={columns}
        dataSource={dataSource}
        expandable={{rowExpandable:(record)=>true,
          expandedRowRender:(record)=> {
            return <p>{record.description}</p>
          }

        }}
        >

        </Table>
    </div>
  )
}

export default AdmissionManagement
