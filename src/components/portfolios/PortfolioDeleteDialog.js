import React from 'react'
import {makeStyles, Button, useTheme, 
    Dialog, DialogActions, DialogContent, DialogContentText,DialogTitle } from '@material-ui/core'

const useStyles = makeStyles((theme) =>{
    return({
        deleteBtn:{
            color:'#fff',
            background: theme.palette.error.main,
            '&:hover':{
                background: theme.palette.error.dark,
            }
        }
    })
})
    
const PortfolioDeleteDialog = ({open, handleDialogShow, handlePortfolioDelete}) =>{
    const theme = useTheme()
    const classes = useStyles()

    return(
        <Dialog
            open={open}
            onClose={() => handleDialogShow(null)}
            aria-labelledby="responsive-dialog-title">
            <DialogTitle id="responsive-dialog-title">
                {"Are you sure you want to delete?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Once you delete this portfolio, you wouldn't be able to restore it.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handlePortfolioDelete} 
                className={classes.deleteBtn}>
                    Delete
                </Button>
                <Button onClick={() => handleDialogShow(null)} 
                variant="contained" 
                color="primary" 
                autoFocus style={{background:theme.palette.primary.text}}>
                    Go Back
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default PortfolioDeleteDialog