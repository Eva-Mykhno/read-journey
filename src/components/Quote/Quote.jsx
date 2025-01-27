import s from "./Quote.module.css";

const Quote = () => {
  return (
    <div className={s.quote}>
      <div className={s.books}>
        <picture>
          <source srcSet="/img/books-1x.webp 1x, /img/books-2x.webp 2x, /img/books-1x.png 1x, /img/books-2x.png 2x" />
          <img src="/img/books-1x.png" alt="stack of books" className={s.img} />
        </picture>
      </div>
      <p className={s.text}>
        &ldquo;Books are <span className={s.span}>windows</span> to the world,
        and reading is a journey into the unknown.&rdquo;
      </p>
    </div>
  );
};

export default Quote;
