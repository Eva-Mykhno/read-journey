import RegisterForm from "../../components/RegisterForm/RegisterForm";
import s from "./RegisterPage.module.css";

const RegisterPage = () => {
  return (
    <main className={(s.register, "container")}>
      <RegisterForm />
      <div className={s.back}></div>
    </main>
  );
};

export default RegisterPage;
