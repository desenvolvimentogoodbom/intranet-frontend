import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { FormControl, FormItem, FormMessage } from './form';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

interface FormFieldSelectProps<T> {
  control: Control<any>;
  name: string;
  label: string;
  options: T[];
  valueKey: keyof T;
  labelKey: keyof T;
}

function FormFieldSelect<T>({
  control,
  name,
  label,
  options,
  valueKey,
  labelKey,
}: FormFieldSelectProps<T>) {
  return (
    <FormItem>
      <Label>{label}</Label>
      <FormControl>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={`Selecione a ${label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={String(option[valueKey])} value={String(option[valueKey])}>
                    {String(option[labelKey])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}

export default FormFieldSelect;
