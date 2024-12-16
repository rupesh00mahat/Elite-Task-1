import { InputAdornment, TextField } from '@mui/material'
import PropTypes from 'prop-types';
import React from 'react'
import { Controller } from 'react-hook-form';
function TextFieldWrapper({ label, startingIcon, type = "text", value, control, rules, disable=false,  }) {
  return (
    <Controller
      control={control}
      rules={rules}
      disabled={disable}
      name={value}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          id='input-with-icon'
          label={label}
          disabled={disable}
          type={type}
          fullWidth
          value={field.value || ""}
          error={!!error}
          helperText={error ? error.message : null}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {startingIcon}
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}

TextFieldWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  startingIcon: PropTypes.node.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  disable: PropTypes.bool
};


export default TextFieldWrapper

