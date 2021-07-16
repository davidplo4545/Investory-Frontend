import React, { useEffect, useState, useContext } from 'react'
import {getAsset} from '../api/assets'
import {UserContext} from '../context/UserContext'
import AssetChart from '../components/assets-comps/AssetChart'



const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState([])
    const [records, setRecords] = useState([])
    const [isValid, setIsValid] = useState(true)
    const assetId = match.params.assetId

    useEffect(() => {
        getAsset(user.token,assetId,setAsset, setRecords, setIsValid)      
      },[]);
    

    return(
        <React.Fragment>
            {isValid ?
            <React.Fragment>
                <div className="asset-data">
                    <div className="asset-info">
                        <h4>{asset.symbol} - {asset.name}</h4>
                        <h2>{asset.sector}</h2>
                        <h2>{asset.industry}</h2>
                        {asset.last_price !== undefined && asset.last_price > 10 &&
                            <h2>Last Price: ${asset.last_price.toFixed(2)}</h2>
                        }

                        {asset.last_price !== undefined && asset.last_price < 10 &&
                            <h2>Last Price: ${asset.last_price.toFixed(4)}</h2>
                        }
                    </div>
                    <AssetChart asset={asset} records={records}/>
                </div>
                <div className="recent-assets">
                    <h1>Recently viewed tickers:</h1>
                    <p>Apple</p>
                    <p>Google</p>
                    <p>Apple</p>
                </div>

            </React.Fragment>
            :
            <React.Fragment>not valid</React.Fragment>
            }
        </React.Fragment>
    )


}



export default AssetPage