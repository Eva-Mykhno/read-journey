import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./RegisterForm.module.css";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const sprite = "../../../public/sprite.svg";

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short name")
    .max(30, "Too long name")
    .required(),
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must have a one "@" and a "."'
    )
    .required(),
  password: Yup.string()
    .min(7, "Too short password")
    .max(20, "Too long password")
    .required(),
});

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const initialRegisterValues = {
    name: "Ilona Ratushniak",
    email: "Your@email.com",
    password: "Yourpasswordhere",
  };

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={s.wrapRegister}>
      <svg className={s.logo}>
        <use href={`${sprite}#icon-logo`} />
      </svg>
      <h2 className={s.title}>
        Expand your mind, reading <span className={s.span}>a book</span>{" "}
      </h2>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialRegisterValues}
        onSubmit={handleSubmit}>
        <Form className={s.wrapForm}>
          <div className={s.wrap}>
            <label className={s.inlineLabel}>Name</label>
            <Field type="text" name="name" className={s.input} />
            <ErrorMessage name="name" component="span" className={s.error} />
          </div>

          <div className={s.wrap}>
            <label className={s.inlineLabel}>Mail</label>
            <Field type="email" name="email" className={s.input} />
            <ErrorMessage name="email" component="span" className={s.error} />
          </div>

          <div className={s.wrap}>
            <label className={s.inlineLabel}>Password</label>
            <Field type="password" name="password" className={s.input} />
            <ErrorMessage
              name="password"
              component="span"
              className={s.error}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={s.iconBtn}>
              <svg className={s.icon}>
                <use href={`${sprite}#icon-eye`} />
              </svg>
            </button>
          </div>
          <div className={s.links}>
            <button type="submit" className={s.button}>
              Registration
            </button>
            <NavLink to="/login" className={s.link}>
              Already have an account?
            </NavLink>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default RegisterForm;
