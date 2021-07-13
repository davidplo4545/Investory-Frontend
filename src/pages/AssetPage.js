import React, { useEffect, useState, useContext } from 'react'
import {useLocation} from 'react-router-dom'
import {getAsset} from '../api/assets'
import {UserContext} from '../context/UserContext'


const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    // let location = useLocation()
    const [asset, setAsset] = useState([])
    const [isValid, setIsValid] = useState(true)
    const assetId = match.params.assetId
    useEffect(() => {
        console.log('here');
        getAsset(user.token,assetId,setAsset, setIsValid)
      },[]);

    return(
        <div>
            {isValid ?
            <div>
                <h1>{asset.name}</h1>
                <h1>{asset.symbol}</h1>
                <h2>{asset.sector}</h2>
                <h2>{asset.industry}</h2>
            </div>
            :
            <div>not valid</div>
            }
        </div>
    )
}

export default AssetPage