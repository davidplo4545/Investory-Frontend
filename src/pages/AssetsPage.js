import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {getAllAssets} from '../api/assets.js'
import AssetTable from '../components/assets-comps/AssetTable'

const AssetPage = ({match}) =>{
    const assetType = match.params.assetType
    const user = useContext(UserContext)
    const [assets, setAssets] = useState()
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        if (assetType !== "us" && assetType !== "isr" && assetType !== "crypto")
            setIsValid(false)
        else
            {
                setIsValid(true)
                getAllAssets(user.token,assetType,setAssets)
            }
      },[assetType]);

    return(
        <React.Fragment>
            {isValid ?
                <AssetTable assetType={assetType} assets={assets}/>
                :
                <div>Not Valid</div>
            }
        </React.Fragment>
        
    )
}

export default AssetPage