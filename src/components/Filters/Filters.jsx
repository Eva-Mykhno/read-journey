import { Formik, Form, Field } from "formik";
import s from "./Filters.module.css";

const Filters = () => {
  return (
    <Formik>
      <Form className={s.form}>
        <Field />
      </Form>
    </Formik>
  );
};

export default Filters;
