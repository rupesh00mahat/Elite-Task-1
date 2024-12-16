  import { Box, Button, Checkbox, FormControlLabel, Grid, Tooltip, Typography } from '@mui/material'
  import React, { useEffect } from 'react'
  import AutoCompleteDropdown from './Input/AutoCompleteDropdown'
  import Options from '../datas/dropdown-option.json'
  import TextFieldWrapper from './Input/TextFieldWrapper';
  import { AccountCircle, ArrowForward, InfoRounded, PhoneAndroid } from '@mui/icons-material';
  import PropTypes from 'prop-types';
  import { Controller, useFormContext } from 'react-hook-form';
  import convictionData from "../datas/convictionDropdown.json";
import { useDispatch } from 'react-redux';
import { ACTIONTYPE, submitDataOne } from '../store/store';

  function Discovery({ formData, setFormData, next }) {

    const { control, handleSubmit, watch,setValue, formState: { errors, isSubmitted } } = useFormContext();
    const dispatch = useDispatch();


    const watchBrand = watch('brand');
    const watchConvictionState = watch('convictionState');
    const watchEnrollmentCode = watch('enrollmentCode');
    const hearAboutUs = watch('hearAboutUs');
    const watchConvictionCountry = watch("convictionCountry");
    const watchConvictionCourt = watch ("convictionCourt")

  useEffect(()=>{
    if(watchConvictionCourt == '' || watchConvictionCourt == null || watchConvictionCourt == undefined){
      setValue('enrollmentCode', '')
    }
  
  },[watchConvictionCountry])

  useEffect(()=>{
      if(watchConvictionCourt && !convictionData.enrollmentCode[watchConvictionCourt].some(item => item.value == watchEnrollmentCode)){
        setValue('enrollmentCode', '')
      }
  },[watchConvictionCourt])

  useEffect(()=>{
    if(watchConvictionState && !convictionData.convictionCourt[watchConvictionState].some(item => item.value == watchConvictionCourt)){
      setValue('convictionCourt', '');
    }
    if(watchConvictionState && !convictionData.convictionCountry[watchConvictionState].some(item => item.value == watchConvictionCountry)){
      setValue('convictionCountry', '');
    }
  }, [watchConvictionState])


    const onSubmit = (data) => {
      next(data);
      console.log(data);
      dispatch(submitDataOne(data));
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ mt: 6 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={6}>
              <Box >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      rules={{ required: 'Brand is required' }}
                      control={control} value={'brand'} options={Options} label={"Brand"} />

                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      rules={{ required: 'conviction state is required' }}

                      control={control}
                      value={'convictionState'}
                      options={convictionData.convictionState} label={"Conviction State"} />

                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown

                      control={control}
                      value={'convictionCountry'}
                      disable={!watchConvictionState}
                      options={watchConvictionState && convictionData.convictionCountry[watchConvictionState]} label={"Conviction Country"} />

                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      disable={!watchConvictionState}
                      control={control}
                      value={'convictionCourt'}
                      options={watchConvictionState && convictionData.convictionCourt[watchConvictionState]} label={"Conviction Court"} />

                  </Grid>
                  <Grid item xs={12}>
                    <AutoCompleteDropdown
                      rules={{ required: 'enrollment code is required' }}
                      disable={!watchConvictionState}

                      control={control}
                      value={'enrollmentCode'}
                      options={watchConvictionState && (
                        watchConvictionCourt ? convictionData.enrollmentCode[watchConvictionCourt]: (
                          watchConvictionCountry ? convictionData.enrollmentCode[watchConvictionCountry] : convictionData.enrollmentCode[watchConvictionState]
                        )
                      )} label={"Enrollment Code"} />

                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      rules={{ required: 'device type is required' }}

                      control={control}
                      value={'deviceType'}
                      options={Options} label={"Device Type"} />

                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      rules={{ required: 'language is required' }}

                      control={control}
                      value={'language'}
                      options={Options} label={"Language"} />

                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box >
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      rules={{ required: 'firstname is required' }}
                      disable={!watchBrand}
                      control={control}
                      value={'firstName'}
                      error={watchBrand && errors.firstName && isSubmitted}
                      errorMessage={watchBrand && errors.firstName?.message && isSubmitted}
                      label={"First Name"} startingIcon={<AccountCircle />} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      rules={{ required: 'lastname is required' }}
                      disable={!watchBrand}

                      control={control}

                      value={"lastName"}
                      label={"Last Name"} startingIcon={<AccountCircle />} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      control={control}
                      disable={!watchBrand}

                      rules={{
                        required: 'cellphone is required', pattern: {
                          value: /^[0-9]{10,}$/,
                          message: 'Cell phone must be at least 10 digits',
                        },
                      }}

                      type="number"
                      value={"cellPhone"}
                      label={"Cell Phone"} startingIcon={<PhoneAndroid />} />
                  </Grid>
                  <Grid sx={{ display: 'flex', alignItems: 'center', gap: '5px' }} item xs={6}>
                    <Controller
                      name='textMessageOptIn'
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <FormControlLabel
                          label=""
                          control={<Checkbox
                            {...field}
                            disabled={!watchBrand}
                            color='success' />}
                        />
                      )}
                    />
                    <Typography sx={{ fontSize: '18px', fontWeight: 600 }} variant='span'>Text Message Opt In</Typography>
                    <Tooltip title="Hello" placement='right-start'>
                      <InfoRounded />
                    </Tooltip>
                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      disable={!watchBrand}
                      control={control}
                      rules={{ required: 'Hear about us is required' }}
                      name="hearAboutUs"
                      value="hearAboutUs"
                      changeValue={(value) => {

                        setFormData([{ ...formData[0], hearAboutUs: value }])
                      }}
                      label={'Hear About Us'} options={Options} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextFieldWrapper
                      disable={!watchBrand || !hearAboutUs}

                      value={'hearAboutUsDetails'}
                      control={control}
                      rules={{ required: 'hear about us details is required' }}

                      label={"Hear About Us Details"} startingIcon={<InfoRounded />} />
                  </Grid>
                  <Grid item xs={6}>
                    <AutoCompleteDropdown
                      disable={!watchBrand}

                      rules={{ required: 'select a motivation is required' }}

                      control={control}
                      value={"selectAMotivation"}
                      label={"Select A Motivation"} options={Options} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>

            <Button type="submit"
              disabled={!watchEnrollmentCode}

              variant='contained' sx={{ marginTop: '20px', mx: 'auto' }} endIcon={<ArrowForward />} size='large'>Next</Button>
          </Box>
        </Box>
      </form>
    )
  }
  Discovery.propTypes = {
    formData: PropTypes.array,
    setFormData: PropTypes.func,
    nextStep: PropTypes.func,
  }
  export default Discovery

