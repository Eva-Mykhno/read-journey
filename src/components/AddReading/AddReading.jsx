import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  startReadingBook,
  finishReadingBook,
} from "../../redux/books/operations";
import s from "./AddReading.module.css";
import { useEffect, useState } from "react";
import { selectActiveProgressByBookId } from "../../redux/books/selectors";

const validationSchema = Yup.object().shape({
  page: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .positive("Must be greater than zero")
    .required("This field is required"),
});

const AddReading = ({ bookId }) => {
  const dispatch = useDispatch();

  const activeProgress = useSelector((state) =>
    selectActiveProgressByBookId(state, bookId)
  );

  const active = Boolean(activeProgress);

  const [page, setPage] = useState(active ? activeProgress.finishPage : 0);

  const buttonText = active ? "To stop" : "To start";
  const titleText = active ? "Stop page" : "Start page";

  const handleSubmit = async (values, { setSubmitting }) => {
    if (active) {
      await dispatch(finishReadingBook({ bookId, page: values.page }));
    } else {
      await dispatch(startReadingBook({ bookId, page: values.page }));
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (!active && page !== 0) {
      setPage(0);
    }
  }, [active, page]);

  return (
    <Formik
      initialValues={{ page: page || 0 }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className={s.form}>
          <h3 className={s.title}>{titleText}</h3>

          <div className={s.wrap}>
            <label className={s.inlineLabel}>Page number:</label>
            <Field
              type="number"
              name="page"
              placeholder="0"
              className={s.input}
              disabled={isSubmitting}
            />
            <ErrorMessage name="page" component="span" className={s.error} />
          </div>

          <button type="submit" disabled={isSubmitting} className={s.button}>
            {buttonText}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddReading;
