import * as React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { some } from 'lodash';
import { AccidentTags, humanReadableAccidentTags } from '@/app/constants/accidenttags';
import YearPicker from './yearpicker';

export default function AccidentFilters({
  setSelectedAccidentTypes,
  setSelectedAccidentYears,
  selectedAccidentTypes
}: {
  setSelectedAccidentTypes: React.Dispatch<React.SetStateAction<Set<AccidentTags>>>
  setSelectedAccidentYears: React.Dispatch<React.SetStateAction<number[]>>
  selectedAccidentTypes: Set<AccidentTags>
}) {
  const autocompleteOptions = Object.values(AccidentTags).map(tag => ({
    id: tag,
    label: humanReadableAccidentTags[tag]
  }));

  return (
    <div>
      <h1 className='text-xl pb-4'>Accident Filters</h1>
      <div className='flex space-y-4 flex-col h-1/3'>
        <Autocomplete
          multiple
          defaultValue={[]}
          disableCloseOnSelect
          onChange={(_, value) => {
            const tags = value.map(v => v.id);
            setSelectedAccidentTypes(new Set(tags));
          }}
          options={autocompleteOptions}
          getOptionDisabled={option => (
            some(Array.from(selectedAccidentTypes), (accidentType) => accidentType === option.id)
          )}
          renderInput={params => (
            <TextField
              {...params}
              label="Accident Tags"
            />
          )}
          /**
           * Annoyingly, we have to define renderOption and renderTags in
           * order to suppress a warning about not passing the "key" prop
           * via spread. Otherwise we could skip both props and get the same for free.
           * https://stackoverflow.com/questions/75818761/material-ui-autocomplete-warning-a-props-object-containing-a-key-prop-is-be
           */
          renderOption={(props, option) => (
            <li
              {...props}
              key={option.label}
            >{option.label}
            </li>
          )}
          // Note that 'tag' here is not an accident tag but MUI's terminology for a selected value
          renderTags={(tagValue, getTagProps) => (
            tagValue.map((option, index) => (
              <Chip
                  {...getTagProps({ index })}
                  key={option.label}
                  label={option.label}
                />
            ))
          )}
        />
        <YearPicker
          setSelectedAccidentYears={setSelectedAccidentYears}
        />
      </div>
    </div>
  );
}
