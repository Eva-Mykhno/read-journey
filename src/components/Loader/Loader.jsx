import { SpinnerDotted } from "spinners-react";
import s from "./Loader.module.css"

const Loader = () => {
  return (
    <div className={s.loader}>
      <SpinnerDotted
        size={90}
        thickness={140}
        speed={98}
        color="rgba(48, 185, 77, 1)"
      />
    </div>
  );
};

export default Loader;
