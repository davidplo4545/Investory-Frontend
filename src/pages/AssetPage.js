import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetChart from '../components/assets-comps/AssetChart'
import axios from 'axios'
import { Link } from "react-router-dom";


const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState([])
    const [recentlyViewedAssets, setRecentlyViewedAssets] = useState([])
    const [records, setRecords] = useState([])
    const [isValid, setIsValid] = useState(true)
    const assetId = match.params.assetId

    const getRecentlyViewedAssets = (currAsset) =>{
        // const recentlyViewedItems = []
        const recAssets = JSON.parse(localStorage.getItem('recentlyViewedAssets'))
        const link = `/asset/${assetId}`
        
        if (recAssets == null)
        {
            const recAssets = []
            recAssets.push({'name':currAsset.name,'symbol':currAsset.symbol,'link':link})
            localStorage.setItem('recentlyViewedAssets', JSON.stringify(recAssets))
            setRecentlyViewedAssets(recAssets)
        }
        else{
            if (recAssets.length > 9)
                recAssets.pop()
            const recAssets1 = recAssets.filter((asset) => asset.link !== link)
            
            recAssets1.unshift({'name':currAsset.name,'symbol':currAsset.symbol,'link':link})
            localStorage.setItem('recentlyViewedAssets', JSON.stringify(recAssets1))
            setRecentlyViewedAssets(recAssets1)
        }
    }

    useEffect(() => {
        const getAsset = async () =>{ 
            const domain = "http://127.0.0.1:8000/api"
            await axios.get( domain + `/assets/${assetId}`,{
                headers:{
                    'Authorization': `Token ${user.token}`
                }
            })
            .then((res) =>{
                setAsset(res.data)
                setRecords(res.data.records)
                getRecentlyViewedAssets(res.data)
            })
            .catch((error) =>{
                setIsValid(false)
            })
        }
        getAsset()
    },[asset]);
    

    return(
        <React.Fragment>
            {isValid ?
            <React.Fragment>
                <div className="asset-data">
                    <div className="asset-info">
                        <div className="first-info">
                            <h2>{asset.symbol} - {asset.name}</h2>
                            {asset.last_price !== undefined && asset.last_price > 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(2)}</h3>
                            }

                            {asset.last_price !== undefined && asset.last_price < 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(4)}</h3>
                            }
                        </div>
                        <div className="second-info">
                            <p>Sector: {asset.sector}</p>
                            <p>Industry: {asset.industry}</p>
                        </div>
                        
                    </div>
                    <AssetChart asset={asset} records={records}/>
                </div>
                <div className="right-column-main">
                    <div className="portfolios-in">
                        <h4>Portfolios in:</h4>
                        <p>Growth Portfolio</p>
                        <p>Value Portfolio</p>
                        <p>Cryptos</p>
                    </div>
                    <div className="recent-assets">
                        <h4>Recently viewed tickers:</h4>
                        {recentlyViewedAssets.map((asset) => {
                            return <Link key={asset.symbol} to={asset.link}><p>{asset.symbol}</p></Link>
                        })

                        }
                    </div>
                </div>

            </React.Fragment>
            :
            <React.Fragment>not valid</React.Fragment>
            }
        </React.Fragment>
    )


}



export default AssetPage