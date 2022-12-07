import { OptionType } from '@/ui/auto-complete/index';
import { useEffect, useState } from 'react';
import { useDebounceValue } from '@/hooks/useDebouncedValue';

export function useAutoComplete(getData: (value: string) => Promise<OptionType[]>) {
  const [value, setValue] = useState('');
  const onChange = (value: string) => {
    setValue(value);
  };
  const debouncedValue = useDebounceValue(value.trim(), 500);

  const [options, setOptions] = useState<OptionType[]>([]);
  const [helperText, setHelperText] = useState('');

  useEffect(() => {
    if (debouncedValue) {
      setHelperText('Loading...');

      getData(debouncedValue).then((data) => {
        if (data.length === 0) {
          setHelperText('No results found');
        } else {
          setOptions(data);
          setHelperText('');
        }
      });
    } else {
      setOptions([]);
      setHelperText('');
    }
  }, [debouncedValue]);

  return { value, onChange, options, helperText };
}
