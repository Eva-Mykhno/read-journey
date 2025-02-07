import s from "./Dashboard.module.css";

const Dashboard = ({ children }) => {
  return <div className={s.dashboard}>{children}</div>;
};

export default Dashboard;
