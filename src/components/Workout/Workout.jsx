import { NavLink } from "react-router-dom";
import s from "./Workout.module.css";

const sprite = "/sprite.svg";

const Workout = () => {
  return (
    <div className={s.workout}>
      <h2 className={s.title}>Start your workout</h2>
      <div className={s.wrap}>
        <p className={s.number}>1</p>
        <p className={s.text}>
          <span className={s.span}> Create a personal library:</span> add the
          books you intend to read to it.
        </p>
      </div>
      <div className={s.wrap}>
        <p className={s.number}>2</p>
        <p className={s.text}>
          <span className={s.span}>Create your first workout:</span> define a
          goal, choose a period, start training.
        </p>
      </div>
      <NavLink to="/library" className={s.links}>
        <p className={s.link}>My library</p>
        <svg className={s.icon}>
          <use href={`${sprite}#icon-narrow`} />
        </svg>
      </NavLink>
    </div>
  );
};

export default Workout;
