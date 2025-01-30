import { useDispatch, useSelector } from "react-redux";
import s from "./UserBar.module.css";
import { selectUserName } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { fetchUser } from "../../redux/auth/operations";

const UserBar = () => {
  const name = useSelector(selectUserName);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const firstLetter = name ? name.charAt(0).toUpperCase() : "";

  return (
    <section className={s.wrapper}>
      <p className={s.letter}>{firstLetter}</p>
      <p className={s.name}>{name}</p>
    </section>
  );
};

export default UserBar;
