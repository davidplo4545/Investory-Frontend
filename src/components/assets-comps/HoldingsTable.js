import React,{useState} from 'react'
import MaterialTable  from 'material-table';
import {useHistory} from 'react-router-dom'

const HoldingsTable = ({holdings}) =>{
    let history = useHistory();
    const columns = [
        { title: 'Type', field: 'type' },
        { title: 'Name', field: 'asset' },
        { title: 'Value', field: 'total_value' },
        { title: 'Gain', field: 'total_cost' }
      ];
    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClicked = (event, rowData) =>{
        setSelectedRow(rowData.tableData.id)
        // const id = rowData.id
        // history.push({
        //     pathname:`/asset/${id}`,
        //    });
    }

    return(

        <div className="holdings-table" 
                style={{ maxWidth: '99%', width: '99%' }}>
            
            <MaterialTable columns={columns} 
                data={holdings} 
                // title='Hold Directory'
                onRowClick={(evt, selectedRow) =>
                    handleRowClicked(evt, selectedRow)
                }
                width={800}
                options={{
                // pageSize:10,
                // pageSizeOptions:[10],
                paging: false,
                search:false,
                showTitle: false,
                minBodyHeight: "auto",
                maxBodyHeight: "auto",
                rowStyle: rowData => ({
                backgroundColor:
                    selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
                })
        }} />
            
        </div>
    )
}

export default HoldingsTable