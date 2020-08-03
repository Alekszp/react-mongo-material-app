import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';

export default class CarInfo extends Component {
    
    render(){
        const {car} = this.props
        return(
            <Grid container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center">
                    <Box margin={3}>
                        <TextField id='input1'
                            value={car.input1} 
                            label={`Input 1 for ${car.name}`} 
                            style={{ width: 300 }} 
                            onChange={this.props.editInput} 
                            variant="outlined"
                            error={car.input1.trim() === ''} 
                            helperText="Can't be an empty" />
                    </Box>
                    <Box>
                        <TextField id='input2'  
                            value={car.input2} 
                            label={`Input 2 for ${car.name}`} 
                            style={{ width: 300 }} 
                            onChange={this.props.editInput} 
                            variant="outlined"
                            error={car.input2.trim() === ''}
                            helperText="Can't be an empty" />
                    </Box>
            </Grid>
            
        )
    }
}