import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  startReadingBook,
  finishReadingBook,
} from "../../redux/books/operations";
import {
  selectActiveProgressByBookId,
  selectReadingBook,
} from "../../redux/books/selectors";
import s from "./AddReading.module.css";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object().shape({
  page: Yup.number()
    .typeError("Must be a number")
    .integer("Must be an integer")
    .positive("Must be greater than zero")
    .required("This field is required"),
});

const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

const AddReading = ({ bookId }) => {
  const dispatch = useDispatch();

  const activeProgress = useSelector((state) =>
    selectActiveProgressByBookId(state, bookId)
  );
  const book = useSelector((state) => selectReadingBook(state, bookId));

  const totalPages = book?.totalPages || 0;
  const active = Boolean(activeProgress);
  const [page, setPage] = useState(active ? activeProgress.finishPage : 0);

  const buttonText = active ? "To stop" : "To start";
  const titleText = active ? "Stop page" : "Start page";

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.page > totalPages) {
      const pagesLeft = totalPages - (activeProgress?.finishPage || 0);
      toast.error(
        `Invalid page number. You have ${pagesLeft} pages left to read.`,
        toastConfig
      );
      setSubmitting(false);
      return;
    }

    if (active && values.page < activeProgress.startPage) {
      toast.error(
        `You started reading from page ${activeProgress.startPage}. Please enter a valid finishing page.`,
        toastConfig
      );
      setSubmitting(false);
      return;
    }

    try {
      if (active) {
        await dispatch(
          finishReadingBook({ bookId, page: values.page })
        ).unwrap();
        toast.success(
          "Book reading has been successfully stopped",
          toastConfig
        );
      } else {
        await dispatch(
          startReadingBook({ bookId, page: values.page })
        ).unwrap();
        toast.success(
          "Book reading has been successfully started",
          toastConfig
        );
      }
      resetForm();
    } catch (error) {
      toast.error(error || "Something went wrong", toastConfig);
    } finally {
      setSubmitting(false);
    }
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
              onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
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
