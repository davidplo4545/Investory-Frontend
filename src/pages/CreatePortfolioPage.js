import React, {useState, useContext, useEffect} from 'react'
import { patchPortfolio, postPortfolio } from '../api/portfolios'
import { UserContext } from '../context/UserContext'
import { TextField, Paper,  Grid, Button, Typography } from '@material-ui/core'
import ActionsDataGrid from '../components/tables/ActionsDataGrid'
import { useHistory, useLocation } from 'react-router-dom'
import AutoCompleteAsync from '../components/forms/AutoCompleteAsync'

const CreatePortfolioPage = () =>{
    const user = useContext(UserContext)
    const [queriedAssets, setQueriedAssets] = useState([])
    const [name, setName] = useState('')
    const [rows, setRows] = useState([])
    const [portfolio, setPortfolio] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [errors, setErrors] = useState([])
    const location = useLocation()
    const history = useHistory()
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [isActionsChanged, setIsActionsChanged] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        let receivedPortfolio 
        if(location.state)
        {
            receivedPortfolio = location.state.portfolio
            if (receivedPortfolio)
            {
                let actions = receivedPortfolio.actions
                actions.forEach((action, i) => {
                    action.id = i + 1
                    action.name = action.asset.name
                    action.currency = action.asset.currency
                })
                setIsEdit(true)
                setName(receivedPortfolio.name)
                setPortfolio(receivedPortfolio)
                setRows(actions)
            }
            else
                setIsEdit(false)
        }
        else
            setIsEdit(true)

    }, [location.state, user.token])

    const validateActions = () =>{
        // Validate the request data and output errors
        const errorData = []
        if (name === '')
            errorData.push(`Portfolio name is empty.`)
        if(rows.length === 0) 
            errorData.push(`Please set new portfolio actions.`)
        if(rows && rows.length){
            rows.forEach((row) =>{
                row.isError = false
                if(parseInt(row.quantity) <= 0 || row.quantity === "")
                {
                    row.isError = true
                    errorData.push(`${row.type} action ${row.name} quantity is zero or negative`)
                }
                if(parseInt(row.share_price) <= 0 || row.share_price === "")
                {
                    row.isError = true
                    errorData.push(`${row.type} action ${row.name} share price is zero or negative`)
                }
                if(row.completed_at === null)
                {
                    row.isError = true
                    errorData.push(`${row.type} action ${row.name} date is empty.`)
                }
            })
        }
        setErrors(errorData)
        if (errorData.length)
        {
            setRows(rows)
            return false
        }
        return true
    }

    const handlePortfolioCreateOrUpdate = () =>{
        const isValid = validateActions()
        if (isValid)
        {
            let requestData = {}
            if (isEdit)
            {
                if(portfolio.name !== name)
                    requestData.name = name
                if(isActionsChanged){
                    requestData.actions = []
                    // format the request actions to match the
                    // rest endpoint format
                    rows.forEach((row) =>{
                        let completed_at = row.completed_at
                        let asset_id = row.asset.id
                        if (typeof(asset_id) === 'undefined')
                            asset_id = row.asset
                        let action = {
                            type: row.type,
                            asset_id: parseInt(asset_id),
                            quantity: parseFloat(row.quantity),
                            share_price: parseFloat(row.share_price),
                            completed_at: completed_at,
                        }
                        requestData.actions.push(action)

                    })
                }
            }
            else
            {
                requestData.name = name
                requestData.actions = []
                // format the request actions to match the
                // rest endpoint format
                rows.forEach((row) =>{
                    let completed_at = row.completed_at
                    let asset_id = row.asset.id
                    if (typeof(asset_id) === 'undefined')
                        asset_id = row.asset
                    let action = {
                        type: row.type,
                        asset_id: parseInt(asset_id),
                        quantity: parseInt(row.quantity),
                        share_price: parseInt(row.share_price),
                        completed_at: completed_at,
                    }
                    requestData.actions.push(action)
                })
            }
            
            
            // check if there is any data for a request to be made
            if(Object.keys(requestData).length > 0)
            {

                requestData.actions.sort(function(a,b){
                    // Turn your strings into dates, and then subtract them
                    // to get a value that is either negative, positive, or zero.
                    return new Date(a.completed_at) - new Date(b.completed_at);
                  });
                if(isEdit)
                {
                    patchPortfolio(user.token, portfolio.id, requestData, setPortfolio, history, setIsLoading, setErrors)
                }
                else
                    postPortfolio(user.token, requestData, history, setIsLoading, setErrors)
            }
        }
    }

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        
        if (selectedAsset)
        {
            // Adjust completed_at field to same format
            // as given from api to the new action added
            let completed_at = new Date()
            const date = new Date();
            let day = date.getDate()
            day = day < 10 ? `0${day}` : day
            let month = date.getMonth() + 1
            month = month < 10 ? `0${month}` : month
            let year = date.getFullYear()
            completed_at = [year,month ,day].join('-')

            const newAction = { 
                id: generateKey(selectedAsset.name),
                asset: selectedAsset.id,
                type:"BUY", 
                currency: selectedAsset.currency,
                name:selectedAsset.name, 
                quantity: 0, 
                share_price: 0, 
                completed_at: completed_at }
                setRows([
                    newAction,
                    ...rows
                    ])
        }
    }

    return(
        <Grid container spacing={1}>
            <Grid item xl={3} md={12} xs={12}>
                <Paper elevation={10} style={{padding:10}} >
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                        <Typography gutterBottom variant="h5" color="primary">
                            {isEdit ? `Edit Portfolio` : 'Create a new Portfolio'}
                        </Typography>
                        </Grid>
                        <Grid item>
                        <TextField style={{marginBottom: '1rem'}} value={name} label="Portfolio Name" onChange={(e) =>setName(e.target.value)}/>
                        </Grid>
                        <Grid item>
                        <form onSubmit={handleFormSubmit}>
                            <AutoCompleteAsync
                            selectedAsset={selectedAsset}
                            setSelectedAsset={setSelectedAsset}
                            queriedAssets={queriedAssets}
                            setQueriedAssets={setQueriedAssets}
                            width={"100%"}/>
                            <Grid container justifyContent="space-between"
                             style={{marginTop:'1rem', marginBottom:'1rem'}}>

                                <Button  variant="contained" color="primary" type="submit">Add symbol</Button>
                                <Button variant="contained"
                                  onClick={handlePortfolioCreateOrUpdate}>
                                      {isEdit ? `Update` : `Create`}
                                </Button>
                            </Grid>
                            {errors.map((error, index) => 
                            <p key={index}>{error}</p>
                            )}
                        </form>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item xl={9} md={12} xs={12}>
                <ActionsDataGrid rows={rows}
                setRows={setRows} 
                isLoading={isLoading}
                setIsActionsChanged={setIsActionsChanged}/>
            </Grid>
        </Grid>
    )
}
export default CreatePortfolioPage