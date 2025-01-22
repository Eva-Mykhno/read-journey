import clsx from "clsx";
import LoginForm from "../../components/LoginForm/LoginForm";
import s from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <main className={clsx(s.login, "container")}>
      <LoginForm />
      <div className={s.back}>
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet="/img/mobile-1x.webp 1x, /img/mobile-2x.webp 2x, /img/mobile-1x.jpg 1x, /img/mobile-2x.jpg 2x"
          />
          <source
            media="(min-width: 1280px)"
            srcSet="/img/wallpaper-1x.webp 1x, /img/wallpaper-2x.webp 2x, /img/wallpaper-1x.jpg 1x, /img/wallpaper-2x.jpg 2x"
          />
          <img
            src="/img/mobile-1x.jpg"
            alt="image iphone 15"
            className={s.img}
          />
        </picture>
      </div>
    </main>
  );
};

export default LoginPage;
