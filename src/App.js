import { Box, Button, Container, Grid } from '@mui/material';
import './App.css';
import StepperWrapper from './components/StepperWrapper';
import PersonalInfo from './components/PersonalInfo';
import { useEffect, useState } from 'react';
import Discovery from "./components/Discovery";
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONTYPE } from './store/store';

function App() {
const methods = useForm();

const stepperValue = useSelector((store)=> store.stepperValue)
const dispatch = useDispatch();


  const [formData, setFormData] = useState([{
    showError: false,
    brand: '',
    convictionState: '',
    convictionCountry: '',
    enrollmentCode: '',
    deviceType: '',
    language: '',
    firstName: '',
    lastName: '',
    cellPhone: '',
    textMessageOptIn: false,
    hearAboutUs: '',
    hearAboutUsDetail: '',
    selectAMotivation: '',
    addressLineOne: '',
    addressLineTwo: '',
    cityCountryState: '',
    zipCode: '',
    manualUpdate: '',
    programType: '',
    serviceAgreementsLength: '',
    lossProtectionPlan: false,
  }]);

  useEffect(() => {
    setFormData([{ ...formData[0], showError: false }])
  }, [stepperValue])

  const nextStep = (data) => {
    methods.setValue('formData', {...methods.getValues(), ...data});

    dispatch({type: ACTIONTYPE.CHANGE_STEPPER, payload: stepperValue+1})
  }

  
  return (
    <div className="App">
      <Container>
        <StepperWrapper/>
          <FormProvider {...methods}>
          {stepperValue == 1 && <Discovery formData={formData} setFormData={setFormData} methods={methods} next={nextStep}/>}
          {stepperValue == 2 && <PersonalInfo formData={formData} setFormData={setFormData} next={nextStep}/>}
          </FormProvider>
        
      </Container>
    </div>
  );
}

export default App;
