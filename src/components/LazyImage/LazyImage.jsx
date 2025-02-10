import { useState } from "react";
import clsx from "clsx";
import Loader from "../Loader/Loader";
import s from "./LazyImage.module.css";

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={s.wrapper}>
      {!loaded && <Loader />}
      <img
        src={src}
        alt={alt}
        className={clsx(className, { [s.hidden]: !loaded })}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          e.target.src = "/img/big-book.png";
          setLoaded(true);
        }}
      />
    </div>
  );
};

export default LazyImage;
