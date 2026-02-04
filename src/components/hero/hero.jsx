import css from "./hero.module.css";
import { Link } from "react-router-dom";


export const Hero = () => {
  return (
    <>
      <div className={css.hero}>
        <div>
          <h1 className={css.title}>GÖKÇE COTTON</h1>
        </div>
      </div>
      <section className={css.featured}>
        <div className={css.featuredContent}>
          <h2>Hissedebileceğiniz Kalite</h2>
          <p>Her parça, üstün konfor için %100 organik pamukla işlenmiştir.</p>
          <Link to="/products" className={css.shopBtn}>Koleksiyonu İncele</Link>
        </div>
      </section>
      <div>

      </div>
    </>
  );
};

