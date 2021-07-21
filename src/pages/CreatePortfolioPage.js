import React, {useState, useContext, useEffect} from 'react'
import { getAllAssets1 } from '../api/assets'
import { UserContext } from '../context/UserContext'
import ActionCreateForm from '../components/forms/ActionCreateForm'
import { TextField } from '@material-ui/core'

const CreatePortfolioPage = () =>{
    const user = useContext(UserContext)
    const [assets, setAssets] = useState(null)
    const [name, setName] = useState('')
    const [actions, setActions] = useState(null)
    useEffect(() => {
        getAllAssets1(user.token, '', setAssets)
    }, [])

    return(
        <div className="portfolio-create-wrapper">
            <h1>Create your new portfolio</h1>
            <TextField value={name} label="Portfolio Name" onChange={(e) =>setName(e.target.value)}/>
            {assets && assets.length &&
                <ActionCreateForm assets={assets}/>
            }
        </div>
    )
}
export default CreatePortfolioPage