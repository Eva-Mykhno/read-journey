import s from "./SuccessAdd.module.css";

const SuccessAdd = () => {
  return (
    <div className={s.wrap}>
      <picture className={s.img}>
        <source srcSet="/img/big-finger-1x.webp 1x, /img/big-finger-2x.webp 2x, /img/big-finger-1x.png 1x, /img/big-finger-2x.png 2x" />
        <img
          src="/img/big-finger-1x.png"
          alt="The thumb is raised up"
          className={s.img}
        />
      </picture>
      <h3 className={s.title}>Good job</h3>
      <p className={s.text}>
        Your book is now in <span className={s.span}>the library!</span> The joy
        knows no bounds and now you can start your training
      </p>
    </div>
  );
};

export default SuccessAdd;
