import React, { useState } from 'react'
import TextFieldWrapper from './Input/TextFieldWrapper'
import { ArrowForward, Home } from '@mui/icons-material'
import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material'
import AutoCompleteDropdown from './Input/AutoCompleteDropdown'
import Options from "../datas/dropdown-option.json";
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { connect, useDispatch } from 'react-redux'
import { submitData } from '../api/submitdata'
import { updateClientId } from '../actions/data-submit-request'

function PersonalInfo({ next, response ={}, sendToUpdate }) {


  const [open, setOpen] = useState(false);
  const [manualCodeCountryState, setManualCodeCountryState] = useState('');

  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitted } } = useFormContext();
  const onSubmit = (data) => {
    console.log(data);
    sendToUpdate({addressLine1: data.addressLine1, addressLine2: data.addressLine2, cityCountryState: data.cityCountryState, zipCode: data.zipCode, programType: data.programType, serviceAgreementsLength: data.serviceAgreementsLength, lossProtectionPlan: data.lossProtectionPlan});
  }

  const handleClose = () => {
    console.log(manualCodeCountryState)
    document.activeElement.blur();
    setValue('cityCountryState', manualCodeCountryState)
    setOpen(false);
  }

  const changeManualCodeCountryState = (e) => {
    setManualCodeCountryState(e.target.value)
  }



  const manualUpdate = watch('manualUpdate');

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dialog
          open={open}
          maxWidth={'sm'}
          fullWidth={true}
          sx={{ height: '500px' }}
          onClose={handleClose}
          aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextField
              label="Enter your code, country, state"
              value={manualCodeCountryState}
              onChange={changeManualCodeCountryState}

            />
            <Button size='md' onClick={handleClose} variant='outlined'>Done</Button>
          </DialogContent>
        </Dialog>
        <Grid sx={{ mt: 4 }} container spacing={6}>
          <Grid item xs={12} sm={12} md={6}>
            <Box width={"100%"}>
              <Grid container spacing={2} sx={{ width: '100%' }}>
                <Grid item xs={12}>
                  <TextFieldWrapper
                    rules={{ required: 'addressline 1 is required' }}

                    value={'addressLine1'}
                    error={errors.addressLine1 && isSubmitted}
                    errorMessage={errors.addressLine1?.message && isSubmitted}
                    control={control}
                    label={"Address Line 1"} startingIcon={<Home />} />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWrapper
                    rules={{ required: 'addressline 2 is required' }}

                    value={"addressLine2"}
                    error={errors.addressLine2 && isSubmitted}
                    errorMessage={errors.addressLine2?.message && isSubmitted}
                    control={control}
                    label={"Address Line 2"} startingIcon={<Home />} />
                </Grid>
                <Grid item xs={12}>
                  <TextFieldWrapper
                    rules={{ required: 'city, country and state  is required' }}

                    value={"cityCountryState"}
                    error={errors.cityCountryState && isSubmitted}
                    errorMessage={errors.cityCountryState?.message && isSubmitted}
                    control={control}
                    label={"City, Country, State"} startingIcon={<Home />} />
                </Grid>
                <Grid item xs={6}>
                  <TextFieldWrapper
                    rules={{ required: 'zip code is required' }}

                    value={'zipCode'}
                    error={errors.zipCode && isSubmitted}
                    errorMessage={errors.zipCode?.message && isSubmitted}
                    control={control}
                    label={"Zip code"} startingIcon={<Home />} />
                </Grid>

                <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '8px' }} xs={6}>

                  <Controller
                    name="manualUpdate"
                    control={control}
                    defaultValue={false}
                    render={({ field }) => (
                      <FormControlLabel
                        label="Manual Update"
                        control={
                          <Checkbox
                            {...field}
                            onChange={(e) => {

                              const checked = e.target.checked;
                              if (checked) {
                                setOpen(true);
                              }
                              field.onChange(checked);
                            }} color='success' />
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6} sm={12} md={6}>
            <Box
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <AutoCompleteDropdown rules={{ required: 'program type is required' }}

                    value={'programType'}
                    control={control}
                    options={Options} label={"Program Type"} />
                </Grid>
                <Grid item xs={6}>
                  <AutoCompleteDropdown
                    rules={{ required: 'service agreement length is required' }}

                    value={'serviceAgreementsLength'}
                    control={control}
                    options={Options} label={"Service Agreements Length"} />

                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ fontSize: '18px', color: 'blue', fontWeight: 700 }}>Loss Protection Plan</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600, foSntSize: '16px' }} variant='span'>No</Typography>
                    <Controller
                      name="lossProtectionPlan"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <Switch
                          onChange={(e, value) => field.onChange(value)}
                          checked={field.value}
                        />
                      )}
                    />
                    <Typography sx={{ fontWeight: 600, fontSize: '16px' }} variant='span'>Yes</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>

          <Button type="submit"


            variant='contained' sx={{ marginTop: '20px', mx: 'auto' }} endIcon={<ArrowForward />} size='large'>Next</Button>
        </Box>      </form>

    </>
  )
}

PersonalInfo.prototype = {
  next: PropTypes.func, 
  response: PropTypes.object,
  sendToUpdate: PropTypes.func,
}

const mapStateToProps = (state) => ({
  response: state.response
})

const mapDispatchToProps = (dispatch) => ({
  sendToUpdate: (data) => dispatch(updateClientId(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);