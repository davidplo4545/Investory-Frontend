import React,{useState} from 'react'
import MaterialTable  from 'material-table';
import {makeStyles} from '@material-ui/core'
const HoldingsTable = ({portfolio, holdings}) =>{
    const columns = [
        { title: 'Type', field: 'asset.type' },
        { title: 'Symbol', field: 'asset.symbol' },
        { title: 'Name', field: 'asset.name' },
        { title: 'Cost Basis', field: 'cost_basis', render: rowData => `${rowData.cost_basis}$`  },
        { title: 'Last Price', field: 'asset.last_price', render: rowData => `${rowData.asset.last_price}$`  },
        { title: 'Cost', field: 'total_cost', render: rowData => `${rowData.total_cost}$`  },
        { title: 'Value', field: 'total_value', render: rowData => `${rowData.total_value}$` },
        { title: '% Gain', field: 'gainPercentage', render: rowData => `${rowData.gainPercentage}%` },
        { title: '% of Portfolio', field: 'percentage', render: rowData => `${(rowData.percentage * 100).toFixed(0)}%` }
      ];

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRowClicked = (event, rowData) =>{
        setSelectedRow(rowData.tableData.id)
    }
    const useStyles = makeStyles((theme) =>{
    return{
        root: {
          backgroundColor: "blue",
          color: "green",
          '& .MuiDataGrid-main': {
            color: theme.palette.common.black
          }
        },
        toolbar: {
          backgroundColor: "white"
        },
        caption: {
          color: "red",
          fontSize: "20px"
        },
        selectIcon: {
          color: "green"
        },
        select: {
          color: "green",
          fontSize: "20px"
        },
        actions: {
          color: "blue"
        }
      }});

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
                classes={{
                    root: useStyles.root,
                    toolbar: useStyles.toolbar,
                    caption: useStyles.caption,
                    selectIcon: useStyles.selectIcon,
                    select: useStyles.select,
                    actions: useStyles.actions
                  }}
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