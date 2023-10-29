import * as React from 'react';
import { Autocomplete, Chip, TextField } from '@mui/material';
import { AccidentTags, humanReadableAccidentTags } from '@/app/constants/accidenttags';

export default function AccidentFilters({
  setSelectedAccidentTypes
}: {
  setSelectedAccidentTypes: React.Dispatch<React.SetStateAction<AccidentTags[]>>
}) {
  const autocompleteOptions = Object.values(AccidentTags).map(tag => ({
    id: tag,
    label: humanReadableAccidentTags[tag]
  }));

  return (
        <div>
            <Autocomplete
              multiple
              defaultValue={[]}
              disableCloseOnSelect
              onChange={(_, value) => {
                const tags = value.map(v => v.id);
                setSelectedAccidentTypes(tags);
              }}
              options={autocompleteOptions}
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
        </div>
  );
}
