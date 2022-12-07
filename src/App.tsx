import React from 'react';
import { AutoComplete, OptionType, useAutoComplete } from '@/ui/auto-complete';
import { getMovies } from '@/features/movies/api';

const App = () => {
  const getData = (query: string): Promise<OptionType[]> => {
    return getMovies(query).then((movies) => {
      return movies.map((movie) => ({
        label: movie.title,
        value: movie.id,
      }));
    });
  };

  const { value, onChange, options, helperText } = useAutoComplete(getData);

  return (
    <AutoComplete
      onChange={onChange}
      onOptionClick={(option) => onChange(option.label)}
      placeholder={'Type a movie name...'}
      value={value}
      helperText={helperText}
      options={options}
    />
  );
};

export { App };
