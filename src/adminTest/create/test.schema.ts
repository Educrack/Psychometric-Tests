import * as Yup from 'yup';

export const TestSchema = Yup.object().shape({
    name: Yup.string().required('Name  is Required'),
    totalDurationInMinute: Yup.string().required('TotalDurationInMinute  is Required'),
    instruction: Yup.string().required('Instruction is Required')
});
