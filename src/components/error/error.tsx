import React from 'react';
import { FieldMetaProps, useFormikContext } from 'formik';

export const ErrorMessage = ({ meta }: { meta: FieldMetaProps<any> }) => {
  const { submitCount } = useFormikContext();
  const showError = (submitCount > 0 || meta.touched) && meta.error;
  return (
    <div className={`invalid-feedback ${showError ? 'd-block' : 'd-none'}`}>
      {showError ? meta.error : null}
    </div>
  );
};
