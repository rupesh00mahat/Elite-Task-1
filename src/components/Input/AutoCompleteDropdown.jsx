import { Autocomplete, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

function AutoCompleteDropdown({ label, options, control, value, rules, disable = false }) {
  return (
    <>
      <Controller
        name={value}
        control={control}
        disabled={disable}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            value={options.find(option => option.value === field.value) || null}
            disabled={disable}
            options={options}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(_, selectedOption) => {
              field.onChange(selectedOption ? selectedOption.value : null);
            }}
            sx={{ width: '100%' }}
            renderInput={(params) => (
              <TextField
                disabled={disable}
                {...params}
                error={!!error}
                helperText={error ? error.message : null}
                label={label}
              />
            )}
          />
        )}
      />
    </>
  );
}

AutoCompleteDropdown.defaultProps = {
  options: [],
  rules: {},
  disable: false,
};

AutoCompleteDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default AutoCompleteDropdown;
