import React, {useState, useContext, useEffect} from 'react'
import { UserContext } from '../../context/UserContext'
import { Autocomplete } from '@material-ui/lab'
import { TextField, CircularProgress } from '@material-ui/core'
import axios from 'axios';


const AutoCompleteAsync = ({queriedAssets, setQueriedAssets, selectedAsset, setSelectedAsset, width}) =>{
    const [text, setText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const user = useContext(UserContext)
    const timer = null;

    useEffect(() => {
        const getQueriedAssets = async (query) =>{

            await axios.get(`http://127.0.0.1:8000/api/assets/?search=${query}`,{
                headers:{
                    'Authorization': `Token ${user.token}`
                }
            }).then((res) =>{
                setQueriedAssets(res.data)
                setIsLoading(false)
            }).catch((error)=>{
                setQueriedAssets([])
                setIsLoading(true)
            })
    
        }
        
        if(text.length >= 2){
            setIsLoading(true)

            const timer = setTimeout(() => {
                getQueriedAssets(text)
              }, 1000);

              return () => clearTimeout(timer);
        }
    }, [text, user.token, setQueriedAssets])
    
    const handleClose = () =>{
        setIsLoading(false)
        setQueriedAssets([])
    }

    const handleOpen = () =>{
        setQueriedAssets([])
    }

    const handleAssetSelectionChanged = (e, values) =>{
        clearTimeout(timer)
        if(values !== selectedAsset)
        {
            setSelectedAsset(values)
        }
    }

    return(
        <Autocomplete
                size={"small"} 
                onOpen={handleOpen}
                onClose={handleClose}
                options={queriedAssets}
                getOptionLabel={(option) => option.name}
                getOptionSelected={(option, value) => option.id === value.id}
                onChange={handleAssetSelectionChanged}
                style={{ width: width }}
                inputValue={text}
                onInputChange={(e, newValue) => setText(newValue)}
                renderInput={(params) => 
                    <TextField
                    {...params}
                    label="Choose Asset"
                    variant="outlined"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />}
                />
    )
}

export default AutoCompleteAsync