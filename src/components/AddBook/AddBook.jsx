import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import SuccessAdd from "../SuccessAdd/SuccessAdd";
import Modal from "../Modal/Modal";
import { addUserBook } from "../../redux/books/operations";
import { selectUserLibraryBooks } from "../../redux/books/selectors";
import "react-toastify/dist/ReactToastify.css";
import s from "./AddBook.module.css";

const validationAddBookSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short title")
    .max(300, "Too Long title")
    .required("Book title is required"),
  author: Yup.string()
    .min(3, "Too short")
    .max(300, "Too Long")
    .required("The author is required"),
  totalPages: Yup.number()
    .positive("Number of pages must be positive")
    .integer("Number of pages must be an integer")
    .required("Number of pages is required"),
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

const AddBook = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userLibraryBooks = useSelector(selectUserLibraryBooks);

  const initialAddBookSchema = {
    title: "",
    author: "",
    totalPages: 0,
  };

  const handleSubmit = async (values, actions) => {
    const bookExists = userLibraryBooks.some((b) => b.title === values.title);

    if (bookExists) {
      toast.error("This book is already in your library", toastConfig);
      actions.resetForm();
      return;
    }

    try {
      const resultAction = await dispatch(addUserBook(values)).unwrap();

      if (resultAction) {
        setIsModalOpen(true);
        actions.resetForm();
        toast.success(
          "Your book has been successfully added to your library",
          toastConfig
        );
      }
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Something went wrong, try again...", toastConfig);
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
                onFocus={(e) => e.target.value === "0" && (e.target.value = "")}
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
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <SuccessAdd />
        </Modal>
      )}
    </>
  );
};

export default AddBook;
