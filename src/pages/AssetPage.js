import React, { useEffect, useState, useContext } from 'react'
import {getAsset} from '../api/assets'
import {UserContext} from '../context/UserContext'
import Plot from 'react-plotly.js';

const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState([])
    const [prices, setPrices] = useState([])
    const [dates, setDates] = useState([])
    const [isValid, setIsValid] = useState(true)
    const assetId = match.params.assetId

    const layout = {
        title: `${asset.name} Stock Chart`,
        paper_bgcolor:"#3d9970",
        plot_bgcolor:"#3d9970",
        xaxis: {
            tickcolor: '#000'
          },
    }
    useEffect(() => {
        getAsset(user.token,assetId,setAsset, setPrices, setDates, setIsValid)      
      },[]);

    return(
        <div>
            {isValid ?
            <div>
                <h1>{asset.name}</h1>
                <h1>{asset.symbol}</h1>
                <h2>{asset.sector}</h2>
                <h2>{asset.industry}</h2>
                <h2>{asset.last_price}</h2>
                <Plot
                    data={[
                    {
                        x: dates,
                        y: prices,
                        type: 'scatter',
                        mode: 'lines',
                        marker: {color: 'white'},
                        name: 'Scatter + Lines',
                    }
                    ]}
                    layout={layout}
                />
            </div>
            :
            <div>not valid</div>
            }
        </div>
    )
}

export default AssetPage