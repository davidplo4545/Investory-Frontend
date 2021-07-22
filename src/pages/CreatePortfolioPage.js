import React, {useState, useContext, useEffect} from 'react'
import { getAllAssets1 } from '../api/assets'
import { UserContext } from '../context/UserContext'
import ActionCreateForm from '../components/forms/ActionCreateForm'
import { TextField, Paper, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ActionsDataGrid from './ActionsDataGrid'

const actions = [
    { id: 1,type:"BUY", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2017,5,17) },
    { id: 2,type:"SELL", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2016,5,17) },
    { id: 3,type:"BUY", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2019,5,17) },
    { id: 4,type:"SELL", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2021,5,17) },
    { id: 5,type:"BUY", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2006,5,17) },
    { id: 6,type:"SELL", name:"Facebook, Inc.", quantity: 20, share_price: 42, completed_at: new Date(2030,5,17) },
  ];

const CreatePortfolioPage = () =>{
    const user = useContext(UserContext)
    const [assets, setAssets] = useState(null)
    const [name, setName] = useState('')
    const [rows, setRows] = useState([])
    const [errors, setErros] = useState([])
    useEffect(() => {
        getAllAssets1(user.token, '', setAssets)
    }, [])

    const validateActions = () =>{
        const errorData = []
        rows.forEach((row) =>{
            if(parseInt(row.quantity) <= 0 || row.quantity === "")
                errorData.push(`${row.type} action ${row.name} quantity is zero or negative`)
            if(parseInt(row.share_price) <= 0 || row.share_price === "")
                errorData.push(`${row.type} action ${row.name} share price is zero or negative`)
            if(row.completed_at === null)
                errorData.push(`${row.type} action ${row.name} date is empty.`)
        })
        setErros(errorData)
        if (errorData.length)
            return false
        return true
    }
    const handlePortfolioCreate = () =>{
        if (name !== '' && rows && rows.length){
            validateActions()
            console.log('created')
        }
    }
    return(
        <Grid container spacing={3}>
            <Grid item xl={3} md={12}>
                <Paper elevation={10} >
                    <h1>Create your new portfolio</h1>
                    <TextField value={name} label="Portfolio Name" onChange={(e) =>setName(e.target.value)}/>
                    {/* {assets && assets.length &&
                        <ActionCreateForm assets={assets}/>
                    } */}
                    {errors.map((error, index) => 
                        <p key={index}>{error}</p>
                    )}
                </Paper>
            </Grid>
            <Grid item xl={9} md={12}>
                {assets && assets.length &&
                   <ActionsDataGrid assets={assets} rows={rows} setRows={setRows}/>
                }
                <Button onClick={handlePortfolioCreate}><h1>Create!</h1></Button>
            </Grid>
        </Grid>
    )
}
export default CreatePortfolioPage