import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import s from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/operations";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const sprite = "/sprite.svg";

const registerSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      'Email must have a one "@" and a "."'
    )
    .required("Mail is a required field"),
  password: Yup.string()
    .min(7, "Too short password")
    .max(20, "Too long password")
    .required("Password is a required field"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/recommended");
    }
  }, [isLoggedIn, navigate]);

  const initialLoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
      const result = await dispatch(login(values));
      if (result.error) {
        setIsPasswordValid(false);
      } else {
        setIsPasswordValid(true);
        actions.resetForm();
      }
    } catch {
      setIsPasswordValid(false);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={s.wrapLogin}>
      <div className={s.wrapLogo}>
        <svg className={s.logo}>
          <use href={`${sprite}#icon-logo`} />
        </svg>
        <p className={s.text}>read journey</p>
      </div>

      <h2 className={s.title}>
        Expand your mind, reading <span className={s.span}>a book</span>{" "}
      </h2>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialLoginValues}
        onSubmit={handleSubmit}>
        <Form className={s.wrapForm}>
          <div className={s.wrap}>
            <label className={s.inlineLabel}>Mail</label>
            <Field
              type="email"
              name="email"
              placeholder="Your@email.com"
              className={s.inputEmail}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={s.errorMessage}
            />
          </div>
          <div className={s.wrap}>
            <label className={s.inlineLabel}>Password</label>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Yourpasswordhere"
              className={`${s.inputPassword} ${
                isPasswordValid === false
                  ? s.error
                  : isPasswordValid === true
                  ? s.success
                  : ""
              }`}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={s.errorMessage}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={s.iconBtn}>
              <svg
                className={`${s.icon} ${
                  isPasswordValid === false
                    ? s.error
                    : isPasswordValid === true
                    ? s.success
                    : ""
                }`}>
                <use
                  href={`${sprite}#${
                    isPasswordValid === null
                      ? showPassword
                        ? "icon-eye"
                        : "icon-eye-off"
                      : isPasswordValid
                      ? "icon-check"
                      : "icon-error"
                  }`}
                />
              </svg>
            </button>

            {isPasswordValid === false && (
              <span className={s.error}>Enter a valid Password</span>
            )}
            {isPasswordValid === true && (
              <span className={s.success}>Password is secure</span>
            )}
          </div>
          <div className={s.links}>
            <button type="submit" className={s.button}>
              Log In
            </button>
            <NavLink to="/login" className={s.link}>
              Don&rsquo;t have an account?
            </NavLink>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default LoginForm;
