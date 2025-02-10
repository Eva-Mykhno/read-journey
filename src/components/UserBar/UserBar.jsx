import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserName } from "../../redux/auth/selectors";
import { fetchUser } from "../../redux/auth/operations";
import s from "./UserBar.module.css";

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
