import s from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  return <section className={s.dashboard}>{children}</section>;
};

export default Dashboard;
