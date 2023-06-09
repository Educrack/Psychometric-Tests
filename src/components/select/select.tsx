import React from 'react';
import ReactSelect from 'react-select';
import { Label } from '../label/label';
import { SelectProps } from './select.types';
import { useField } from 'formik';
import { ErrorMessage } from '../error/error';

export const Select = ({
  id,
  name,
  label,
  className,
  style,
  takeSpace,
  required,
  placeholder,
  options,
  isMulti,
  onChange,
  isDisable = false,
}: SelectProps) => {
  const [selectOptions, setSelectOptions] = React.useState<any>([]);

  React.useEffect(() => {
    const dumpArray: any = [];
    if (options) {
      options.forEach(({ _id, name, label, value }: any) => {
        dumpArray.push({ label: label || name, value: value || _id });
      });
      setSelectOptions([...dumpArray]);
    }
  }, [options]);

  const colourStyles = {
    multiValue: (styles: any, {}: any) => {
      return {
        ...styles,
        backgroundColor: '#47B3BB',
      };
    },
    multiValueLabel: (styles: any, {}: any) => ({
      ...styles,
      color: 'white',
    }),
    multiValueRemove: (styles: any, {}: any) => ({
      ...styles,
      color: 'white',
      ':hover': {
        backgroundColor: '#47b3bb',
        color: 'white',
      },
    }),
    menu: (base: any) => ({
      ...base,
      zIndex: 99,
    }),
    control: (base: any, state: any) => ({
      ...base,
      border: '1px solid #e6e6e6',
      boxShadow: 'none',
      // #239f87
      borderColor: state.isFocused ? '#239f87' : '#239f87',
      '&:focus': {
        borderColor: state.isFocused ? '#239f87' : '#e6e6e6',
      },
      '&:hover': {
        borderColor: state.isFocused ? '#239f87' : '#e6e6e6',
        boxShadow: 'none',
      },
    }),
    option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? null
          : isFocused
          ? '#239f87'
          : null,
        color: isDisabled
          ? null
          : isSelected
          ? null
          : isFocused
          ? '#fff'
          : null,
        ':active': {
          ...styles[':active'],
          backgroundColor: '#239f87',
        },
      };
    },
    placeholder: (defaultStyles: any) => {
      return {
        ...defaultStyles,
        color: '#919191',
      };
    },
  };
  const [field, meta, helpers] = useField({ name });

  const _onChange = (v: any) => {
    if (isMulti) {
      helpers.setValue(v?.map((item: any) => item.value));
    } else {
      helpers.setValue(v.value);
    }
    onChange && onChange(v);
  };

  const getValue = () => {
    return Array.isArray(selectOptions)
      ? selectOptions.filter(({ value }: any) => {
          if (isMulti) {
            return (field.value || []).includes(value);
          } else {
            return field.value === value;
          }
        })
      : null;
  };

  return (
    <div className={className || 'form-group'} style={style}>
      <Label label={label} id={id} takeSpace={takeSpace} required={required} />
      <div className={`custom-ReactSelect ${isDisable && 'disabled'}`}>
        <ReactSelect
          value={getValue()}
          onChange={_onChange}
          placeholder={placeholder}
          isMulti={isMulti}
          options={selectOptions}
          styles={colourStyles}
          isDisabled={isDisable}
        />
      </div>
      <ErrorMessage meta={meta} />
    </div>
  );
};
