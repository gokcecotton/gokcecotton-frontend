import css from "./navigation.module.css";

export const Navigation = () => {
  return (
    <>
          <nav className={css.nav}>
              <img src="../../../src/assets/logo-yazili.png" alt="logo" className={css.logoImage} />
              <h1 className={css.title}>GÖKÇE COTTON</h1>
      </nav>
    </>
  );
};
