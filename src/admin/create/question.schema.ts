import * as Yup from 'yup';

export const QuestionsSchema = Yup.object().shape({
    text: Yup.string().required('Question  is Required'),
    d: Yup.string().required('d value  is Required'),
    i: Yup.string().required('i value  is Required'),
    s: Yup.string().required('s value  is Required'),
    c: Yup.string().required('c value  is Required')
});
