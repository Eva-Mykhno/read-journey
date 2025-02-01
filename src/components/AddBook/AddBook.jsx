import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SuccessAdd from "../SuccessAdd/SuccessAdd";
import Modal from "../Modal/Modal";
import s from "./AddBook.module.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addUserBook } from "../../redux/books/operations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationAddBookSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short")
    .max(300, "Too Long")
    .required("Book title is required"),
  author: Yup.string()
    .min(3, "Too short")
    .max(300, "Too Long")
    .required("The author is required"),
  totalPages: Yup.number()
    .positive("Number of pages must be positive")
    .integer("Number of pages must be an integer")
    .moreThan(0, "Number of pages must be greater than 0")
    .required("Number of pages is required"),
});

const AddBook = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialAddBookSchema = {
    title: "",
    author: "",
    totalPages: 0,
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await dispatch(addUserBook(values)).unwrap();
      setIsModalOpen(true);
      resetForm();
    } catch {
      toast.error("Something went wrong, try again...", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Formik
        validationSchema={validationAddBookSchema}
        initialValues={initialAddBookSchema}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form className={s.form}>
            <h2 className={s.title}>Add your own book</h2>

            <div className={s.wrap}>
              <label className={s.inlineLabel}>Book title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter text"
                className={s.inputTitle}
              />
              <ErrorMessage
                name="title"
                component="span"
                className={s.errorMessage}
              />
            </div>

            <div className={s.wrap}>
              <label className={s.inlineLabel}>The author</label>
              <Field
                type="text"
                name="author"
                placeholder="Enter text"
                className={s.inputAuthor}
              />
              <ErrorMessage
                name="author"
                component="span"
                className={s.errorMessage}
              />
            </div>

            <div className={s.wrap}>
              <label className={s.inlineLabel}>Number of pages:</label>
              <Field
                type="number"
                name="totalPages"
                placeholder="0"
                className={s.inputPages}
              />
              <ErrorMessage
                name="totalPages"
                component="span"
                className={s.errorMessage}
              />
            </div>

            <button type="submit" className={s.button} disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <Modal>
          <SuccessAdd />
        </Modal>
      )}
    </>
  );
};

export default AddBook;
