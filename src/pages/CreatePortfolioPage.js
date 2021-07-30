import React, {useState, useContext, useEffect} from 'react'
import { getAllAssets1 } from '../api/assets'
import { patchPortfolio, postPortfolio } from '../api/portfolios'
import { UserContext } from '../context/UserContext'
import ActionCreateForm from '../components/forms/ActionCreateForm'
import { TextField, Paper, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import ActionsDataGrid from '../components/tables/ActionsDataGrid'
import { useHistory, useLocation } from 'react-router-dom'

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
    const [portfolio, setPortfolio] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [errors, setErros] = useState([])
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        if (location.state)
        {
            const {portfolio} = location.state
            if (portfolio)
            {
                let actions = location.state.portfolio.actions
                actions.forEach((action, i) => {
                    action.id = i + 1
                    action.name = action.asset.name
                })
                setIsEdit(true)
                setName(portfolio.name)
                setPortfolio(portfolio)
                setRows(actions)
            }
            else
                setIsEdit(false)
        }
        else if(portfolio !== null)
        {
            setIsEdit(true)
        }
        getAllAssets1(user.token, '', setAssets)

    }, [])

    const validateActions = () =>{
        const errorData = []
        if (name === '')
            errorData.push(`Portfolio name is empty.`)
        if(rows.length === 0) 
            errorData.push(`Please set new portfolio actions.`)
        if(rows && rows.length){
            rows.forEach((row) =>{
                if(parseInt(row.quantity) <= 0 || row.quantity === "")
                    errorData.push(`${row.type} action ${row.name} quantity is zero or negative`)
                if(parseInt(row.share_price) <= 0 || row.share_price === "")
                    errorData.push(`${row.type} action ${row.name} share price is zero or negative`)
                if(row.completed_at === null)
                    errorData.push(`${row.type} action ${row.name} date is empty.`)
            })
        }
        setErros(errorData)
        if (errorData.length)
            return false
        return true
    }
    const handlePortfolioCreate = () =>{
        const isValid = validateActions()
        if (isValid)
        {
            let requestData = {name:"", actions: []}
            requestData.name = name
            rows.forEach((row) =>{
                let completed_at = row.completed_at
                let asset_id = row.asset.id
                if(typeof(completed_at) == 'object')
                    completed_at = completed_at.toISOString().slice(0, 10)
                if (typeof(asset_id) === 'undefined')
                    asset_id = row.asset
                let record = {
                    type: row.type,
                    asset_id: parseInt(asset_id),
                    quantity: parseInt(row.quantity),
                    share_price: parseInt(row.share_price),
                    completed_at: completed_at,
                }
                requestData.actions.push(record)
            })
            
            if(isEdit)
            {
                patchPortfolio(user.token, portfolio.id, requestData, setPortfolio, history)
            }
            else
                postPortfolio(user.token, requestData, history)
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
                   <ActionsDataGrid isEdit={isEdit} assets={assets} rows={rows} setRows={setRows}/>
                }
                <Button onClick={handlePortfolioCreate}><h1>{isEdit ? `Update` : `Create`}</h1></Button>
            </Grid>
        </Grid>
    )
}
export default CreatePortfolioPage