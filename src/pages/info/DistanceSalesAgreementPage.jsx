import css from "./LegalPage.module.css";

export const DistanceSalesAgreementPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Mesafeli Satış Sözleşmesi</h1>

                <section className={css.section}>
                    <h2>1. Taraflar</h2>
                    <p>İşbu sözleşme, Gökçe Cotton (Satıcı) ile web sitesi üzerinden alışveriş yapan kullanıcı (Alıcı) arasında, aşağıda belirtilen şartlar dahilinde akdedilmiştir.</p>
                </section>

                <section className={css.section}>
                    <h2>2. Sözleşmenin Konusu</h2>
                    <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait Gökçe Cotton internet sitesinden elektronik ortamda siparişini yaptığı ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
                </section>

                <section className={css.section}>
                    <h2>3. Ürün Bilgileri ve Teslimat</h2>
                    <p>Ürünün satış fiyatı, ödeme şekli ve teslimat adresi sipariş sonlandığında belirlenmektedir. Satıcı, sözleşme konusu ürünün sağlam, eksiksiz, siparişte belirtilen niteliklere uygun teslim edilmesinden sorumludur.</p>
                    <p>Teslimat, siparişin onaylanmasından itibaren 30 günlük yasal süreyi aşmamak kaydıyla gerçekleştirilir.</p>
                </section>

                <section className={css.section}>
                    <h2>4. Cayma Hakkı</h2>
                    <p>Alıcı, 14 gün içerisinde hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin cayma hakkını kullanabilir. Cayma hakkı süresi, mal teslimatının yapıldığı günden itibaren başlar.</p>
                    <p>Cayma hakkının kullanılması için bu süre içinde satıcıya yazılı bildirim yapılması gerekmektedir.</p>
                </section>

                <section className={css.section}>
                    <h2>5. İade ve Geri Ödeme</h2>
                    <p>Cayma hakkının kullanılması durumunda, ürünün SATICI'ya ulaştırılmasını takip eden 14 gün içerisinde ürün bedeli alıcıya iade edilir.</p>
                </section>

                <section className={css.section}>
                    <h2>6. Yetkili Mahkeme</h2>
                    <p>İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Sanayi ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değeri aşan durumlarda ise Tüketici Mahkemeleri yetkilidir.</p>
                </section>
            </div>
        </div>
    );
};

export default DistanceSalesAgreementPage;
