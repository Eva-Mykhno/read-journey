import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./FiltersRecommended.module.css";
import { useDispatch } from "react-redux";
import { setFilters } from "../../redux/books/slice";

const filtersSchema = Yup.object().shape({
  title: Yup.string().min(3, "Too short").max(150, "Too long"),
  author: Yup.string().min(3, "Too short").max(150, "Too long"),
});

const FiltersRecommended = () => {
  const dispatch = useDispatch();

  const initialFiltersValues = {
    title: "",
    author: "",
  };

  const handleSubmit = (values) => {
    dispatch(setFilters(values));
  };

  return (
    <Formik
      initialValues={initialFiltersValues}
      validationSchema={filtersSchema}
      onSubmit={handleSubmit}>
      <Form className={s.form}>
        <p className={s.text}>Filters</p>
        <div className={s.wrap}>
          <label className={s.inlineLabel}>Book title:</label>
          <Field
            type="text"
            name="title"
            placeholder="Enter text"
            className={s.inputTitle}
          />
          <ErrorMessage name="title" component="span" className={s.error} />
        </div>

        <div className={s.wrap}>
          <label className={s.inlineLabel}>The author:</label>
          <Field
            type="text"
            name="author"
            placeholder="Enter text"
            className={s.inputAuthor}
          />
          <ErrorMessage name="author" component="span" className={s.error} />
        </div>

        <button type="submit" className={s.button}>
          To apply
        </button>
      </Form>
    </Formik>
  );
};

export default FiltersRecommended;
