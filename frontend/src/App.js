import React, {Component} from 'react';
import {isEmpty, isNull, isEqual} from 'lodash'
import axios from 'axios'
import {CarsCollection, bodyTypes} from './helpers/carsCollection'
import Box from '@material-ui/core/Box';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import CarInfo from './components/CarInfo'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: false,
      cars: [],
      selectedCar: null,
      selectedCarBodyTypesColl: [],
      selectedCarInput1: '',
      selectedCarInput2: ''
    }
    
  }
  componentWillMount () {
    if(isEmpty(this.cars)){
      this.setState({ loading: true })
      axios.get('http://localhost:7001/getCars')
          .then((res)=>{
            this.setState({ cars: res.data })
          }).catch((e)=>{
          }).finally(()=>{
            this.setState({ loading: false })
          })
        }
  }

  getDefaultCollection = ()=> {
    this.setState({ loading: true })
    axios.post('http://localhost:7001/addFirstData', CarsCollection)
        .then((res)=>{
          this.setState({ cars: res.data })
        }).catch((e)=>{}).finally(()=>{
          this.setState({ loading: false })
        })
  }
  changeInputData = (e)=> {
    if(e.target.id === 'input1') this.setState({selectedCarInput1: e.target.value})
    if(e.target.id === 'input2') this.setState({selectedCarInput2: e.target.value})
  }

  selectedCarBodyTypes = ()=> {
    if(this.state.selectedCar === null) {
      this.setState({selectedCarBodyTypesColl: []})
    } else {
      let filtered = bodyTypes.filter((type)=>this.state.selectedCar.bodyTypes.includes(type.id))
      this.setState({selectedCarBodyTypesColl: filtered}) 
    }
    
    
  }

  selectNewCar = async (value)=>{
    await this.setState({selectedCar: value})
    await this.setState({selectedCarInput1: !isNull(value) ? value.input1 : ''})
    await this.setState({selectedCarInput2: !isNull(value) ? value.input2 : ''})
    await this.selectedCarBodyTypes()
  }

  carInfoChanged = ()=> {
    if(!isEmpty(this.state.selectedCar)){
      let selectedCarBodyTypesArray = this.state.selectedCarBodyTypesColl.map(({id})=>id) || []
      let isBodyTypesChanged = !isEqual((this.state.selectedCar.bodyTypes.sort()), selectedCarBodyTypesArray.sort())
      let isInput1Changed = this.state.selectedCar.input1 === this.state.selectedCarInput1 ? false : true
      let isInput2Changed = this.state.selectedCar.input2 === this.state.selectedCarInput2 ? false : true
      if(isBodyTypesChanged || isInput1Changed || isInput2Changed){
        return true 
      } else return false
    } else return false
    
  }

  updateItem = ()=>{
    if(isEmpty(this.state.selectedCarBodyTypesColl) || this.state.selectedCar.input1.trim() === '' || this.state.selectedCar.input2.trim() === '') return
    let selectedCarBodyTypesArray = this.state.selectedCarBodyTypesColl.map(({id})=>id)
    this.setState({ loading: true })
    axios.post('http://localhost:7001/updateCar', {
      name: this.state.selectedCar.name,
      bodyTypes: selectedCarBodyTypesArray,
      input1: this.state.selectedCarInput1,
      input2: this.state.selectedCarInput2
    }).then((res)=>{
      this.setState({ cars: res.data, selectedCar: null, selectedCarBodyTypesColl: [], selectedCarInput1: '', selectedCarInput2: ''})
    }).catch((e)=>{})
    .finally(()=>{
      this.setState({ loading: false })
    })
  }
  

  render() {
    return (
      <div>
        <Grid container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh' }}
        > 
          <Box m={3}>
            <Button variant="contained" color='primary' onClick={this.getDefaultCollection}>Get default collection</Button>
          </Box>
          <Box mb={3}>
            <Autocomplete
              id="combo-box-demo"
              options={this.state.cars}
              value={this.state.selectedCar}
              getOptionLabel={(car) => car.name}
              onChange={(option, value)=>this.selectNewCar(value)}
              style={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Choose car" variant="outlined" />}
            />
          </Box>
          <Box>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              disabled={isNull(this.state.selectedCar)}
              options={bodyTypes}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              value={this.state.selectedCarBodyTypesColl}
              onChange={(options, value)=>{this.setState({selectedCarBodyTypesColl: value})}}
              renderOption={(option, { selected }) => (
                <React.Fragment>
                  <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                  />{option.name}
                </React.Fragment>
              )}
                style={{ width: 300 }}
                renderInput={(params) => (
                <TextField {...params} 
                  variant="outlined"
                  label="Select body types"
                  error={isEmpty(this.state.selectedCarBodyTypesColl) && !isNull(this.state.selectedCar)} 
                  helperText="Can't be an empty" />
              )}
              />
          </Box>
          {
            this.state.selectedCar && <CarInfo editInput={this.changeInputData} car={{input1: this.state.selectedCarInput1, input2: this.state.selectedCarInput2}} />
          }
          {
            this.carInfoChanged() && <Box m={3}><Button variant="contained" color='secondary' onClick={this.updateItem}>Save</Button></Box>
          }
          {
            this.state.loading && <Grid style={{ minHeight: '100vh', minWidth: '100vw', zIndex: 1000, opacity: .5, position: 'absolute', backgroundColor: 'black' }}>
                                    <CircularProgress style={{position: 'absolute', top: 'calc(50% - 20px)', left: 'calc(50% - 20px)'}}/>
                                  </Grid>
          }
          
        </Grid>
        
      </div>
    );
  }
}
