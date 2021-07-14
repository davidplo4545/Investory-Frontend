import React, { useEffect, useState, useContext } from 'react'
import {getAsset} from '../api/assets'
import {UserContext} from '../context/UserContext'
import { Line } from 'react-chartjs-2';


// xAxes: [
//     {
//         type: "time",
//         time: {
//             parser: "YYYY.MM.DD",
//             unit: "month",
//             displayFormats: {
//                 month: "MMM YYYY"
//             }
//         }
//     }
// ],

const AssetPage = ({match}) =>{
    const user = useContext(UserContext)
    const [asset, setAsset] = useState([])
    const [records, setRecords] = useState([])
    const [isValid, setIsValid] = useState(true)
    const assetId = match.params.assetId

    // const options = {
    //     parsing: {
    //         xAxisKey: 'date',
    //         yAxisKey: 'price'
    //     },
    //     elements: {
    //         point:{
    //             radius: 5,            
    //         },
    //         line: {
    //             tension: 0 // disables bezier curves
    //         }
    //     },
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //               beginAtZero: true
    //             },
    //           }]
    //     },
    // };

    const options = {
        scales: {
            y: {                
                  beginAtZero: true,
              }
            },
            xAxes :{
                type: 'time',
                unit:'month',
                time: {
                    displayFormats: {
                        month: 'MMM DD',
                    }
                }
            }
        };
    
    

    const data = {
        // dates here
        labels:[],
        // labels: ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: ['Stock Price'],
            data: [{"x":"2019/05/18", "y":"10"},{"x":"2019/06/19", "y":"20"},{"x":"2019/07/25", "y":"30"}],
            fill: true,
            borderWidth: 1.5,
            // backgroundColor: 'black',
            borderColor:'black',
            // borderColor: 'rgb(255, 99, 132)',
            backgroundColor: '#3d9970',
          },
        ],
      };

    useEffect(() => {
        getAsset(user.token,assetId,setAsset, setRecords, setIsValid)        
      },[]);

    return(
        <div>
            {isValid ?
            <div>
                <h1>{asset.name}</h1>
                <h1>{asset.symbol}</h1>
                <h2>{asset.sector}</h2>
                <h2>{asset.industry}</h2>
                <Line data={data} options={options} />
            </div>
            :
            <div>not valid</div>
            }
        </div>
    )
}

export default AssetPage