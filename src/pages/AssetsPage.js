import React, {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext'
import {getAllAssets} from '../api/assets.js'

const AssetPage = ({assetType}) =>{
    const user = useContext(UserContext)
    console.log(assetType)
    const [setAssets, assets] = useState()
    useEffect(() => {
        // if (user.token)
          getAllAssets(user.token,assetType,setAssets)
      }, []);

    return(
        <div>
            {assets != null &&
                <div>Assets Page</div>
            }
        </div>
    )
}

export default AssetPage