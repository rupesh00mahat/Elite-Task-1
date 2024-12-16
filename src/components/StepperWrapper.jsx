import { Box, Step, StepConnector, stepConnectorClasses, StepLabel, Stepper, styled, Typography } from '@mui/material';
import React from 'react'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import { GroupAddOutlined } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIONTYPE } from '../utils/actiontype';
const steps = [
  'Discover',
  'Personal Info'
];

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( -10deg, rgba(47, 212, 9, 0.78) 0%, rgb(14, 233, 25) 50%, rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgba(37, 232, 20, 0.78)6) 0%, rgb(18, 219, 28) 50%, rgb(12, 232, 126) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( -10deg, rgba(47, 212, 9, 0.78) 0%, rgb(14, 233, 25) 50%, rgb(138,35,135) 100%)',
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;
  const icons = {
    1: <ContentPasteSearchIcon />,
    2: <GroupAddOutlined />
  }
  return <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
    {icons[String(props.icon)]}
  </ColorlibStepIconRoot>
}

function StepperWrapper() {

  const stepperValue = useSelector((state)=> state.stepperValue);
  const response = useSelector((state)=> state.response);
  const dispatch = useDispatch();
  return (
    <>

      <Box sx={{ width: '50%', marginTop: '20px' }}>
        <Stepper activeStep={stepperValue} alternativeLabel connector={<ColorlibConnector />}>
          {steps.map((label, index) => {
            return <Step  key={label} onClick={() => {
              if (stepperValue > index+1) {
               dispatch({type: ACTIONTYPE.CHANGE_STEPPER, payload: index+1});
              }
            }}>
              <StepLabel sx={{cursor: stepperValue > index+1 ? 'pointer': "default"}} StepIconComponent={ColorlibStepIcon}>
                <Typography variant='span' sx={{ fontSize: '20px', fontWeight: 400 }}>{label}</Typography>
              </StepLabel>
            </Step>
          })}
        </Stepper>
      </Box>
    </>
  )
}

export default StepperWrapper