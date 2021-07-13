import React,{useState} from 'react'
import MaterialTable  from 'material-table';
import {useHistory} from 'react-router-dom'

const AssetTable = ({assetType, assets}) =>{
    let history = useHistory();
    const equityColumns = [
        { title: 'Id', field: 'id' },
        { title: 'Type', field: 'type' },
        { title: 'Name', field: 'name' },
        { title: 'Ticker', field: 'symbol' },
        { title: 'Last Price (USD)', field: 'last_price', searchable:false }
      ];
    const cryptoColumns = [
        { title: 'Id', field: 'id' },
        { title: 'Name', field: 'name' },
        { title: 'Ticker', field: 'symbol' },
        { title: 'Last Price (USD)', field: 'last_price', searchable:false }
      ];
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClicked = (rowData) =>{
        const id = rowData.id
        history.push({
            pathname:`/asset/${id}`,
           });
    }

    return(

        <div className="assets-table" 
                style={{ maxWidth: '100%' }}>
            {assetType === "crypto" ?
                <MaterialTable columns={cryptoColumns} 
                               data={assets} 
                               title='Assets Directory'
                               onRowClick={(evt, selectedRow) =>
                                handleRowClicked(selectedRow)
                                }
                                options={{
                                search: false,
                                pageSize:10,
                                pageSizeOptions:[10],
                                rowStyle: rowData => ({
                                  backgroundColor:
                                    selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                                })
                              }} />
            :
                <MaterialTable columns={equityColumns} 
                data={assets} 
                title='Assets Directory'
                onRowClick={(evt, selectedRow) =>
                handleRowClicked(selectedRow)
                }
                options={{
                pageSize:10,
                pageSizeOptions:[10],
                minBodyHeight: "700px",
                maxBodyHeight: "700px",
                rowStyle: rowData => ({
                backgroundColor:
                    selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                })
            }} />
            }
        </div>
    )
}

export default AssetTable