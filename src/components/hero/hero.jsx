import css from "./hero.module.css";

export const Hero = () => {
  return (
    <>
      <div className={css.hero}>
        <div>
          <h1 className={css.title}>GÖKÇE COTTON</h1>
        </div>
      </div>
      <div className={css.heroContent}>
        <h2 className={css.subtitle}>ORGANİK %100 PAMUK ÜRÜNLER</h2>
        <button className={css.shopButton}>ALIŞVERİŞE BAŞLA</button>
      </div>
      <div>

      </div>
    </>
  );
};


<div className={css.heroTitle}>
  <h1 className={css.title}>ORGANİK %100 PAMUK ÜRÜNLER</h1>
  <p className={css.subtitle}>
    Bebeğiniz ve sizin için premium kalite organik pamuk ürünler sunuyoruz.
  </p>
</div>;