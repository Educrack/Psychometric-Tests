import React from 'react';
import Styled from 'styled-components';

const CustomLabel = Styled.label`
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: #7f8381;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
`;

export const Label = ({ label, id, takeSpace, className, required }: any) => {
  return label ? (
    <CustomLabel htmlFor={id} className={className}>
      {label} {required && <span className="text-danger">*</span>}
    </CustomLabel>
  ) : takeSpace ? (
    <CustomLabel htmlFor={id}>
      <span>&nbsp;</span>
    </CustomLabel>
  ) : null;
};
