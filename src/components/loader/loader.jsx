import css from './loader.module.css';

export const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <h2>Yükleniyor...</h2>
      <div className={css.loader}></div>
    </div>
  );
};