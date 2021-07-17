import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../context/UserContext'
import AssetChart from '../components/assets-comps/AssetChart'
import InvestmentCalculator from '../components/assets-comps/InvestmentCalculator'
import axios from 'axios'
import { Link } from "react-router-dom";
import './assetPage.css'
import {Button} from '@material-ui/core'


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
                    <div className="asset-headers">
                        <div className="header-info">
                            <h2>{asset.symbol} - {asset.name}</h2>
                            {asset.last_price !== undefined && asset.last_price > 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(2)}</h3>
                            }

                            {asset.last_price !== undefined && asset.last_price < 10 &&
                                <h3 className="last-price">${asset.last_price.toFixed(4)}</h3>
                            }
                        </div> 
                        <div className="header-buttons">
                            <Button color="default"><Link to={'/portfolios'}>Add to portfolio</Link></Button>
                        </div>                       
                    </div>
                    <AssetChart asset={asset} records={records}/>
                    <div className="asset-info">
                        <div className="first-info">
                            <p>Type: {asset.type}</p>
                            {asset.sector &&
                                <React.Fragment>
                                    <p>Sector: {asset.sector}</p>
                                    <p>Industry: {asset.industry}</p>
                                </React.Fragment>
                            }
                            <p>Market Cap: 1.3B</p>
                        </div>
                        <div className="second-info">
                            <p>Returns:</p>
                            <p>YTD: 5%</p>
                            <p>1 Month: 9%</p>
                            <p>6 Month: 9%</p>
                            <p>1 Year: 9%</p>
                            <p>3 Year: -5%</p>
                            <p>5 Year: 50%</p>
                        </div>
                        <div className="third-info">
                            <p>Sector: {asset.sector}</p>
                            <p>Industry: {asset.industry}</p>
                        </div>
                    </div>
                </div>

                <div className="right-column-main">
                    <div className="investment-calculator">
                        {records.length > 0 ?
                            <InvestmentCalculator records={records}/>
                             : 
                             <div/>
                        }
                    </div>
                    <div className="portfolios-in">
                        <h4>Portfolios in:</h4>
                        <p>Growth Portfolio</p>
                        <p>Value Portfolio</p>
                        <p>Cryptos</p>
                    </div>
                    <div className="recent-assets">
                        <h4>Recently viewed tickers:</h4>
                        {recentlyViewedAssets.map((asset) => {
                            return <Link key={asset.symbol} to={asset.link}>
                                        <p className="recent-asset-symbol">{asset.symbol}</p>
                                        <p className="recent-asset-name">{asset.name}</p>
                                    </Link>
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