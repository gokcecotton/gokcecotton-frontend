import { useState } from "react";
import css from "./DeliveryPage.module.css";

export const DeliveryPage = () => {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => setActiveModal(null);

    const kvkkText = (
        <>
            <h3>KVKK Aydınlatma Metni</h3>
            <p>Gökçe Cotton olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu kapsamda, ürün ve hizmetlerimizden faydalanan kişiler dahil, Gökçe Cotton ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)’na uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.</p>
            <p>Veri sorumlusu sıfatıyla Gökçe Cotton, kişisel verilerinizi Kanun’da belirtilen sınırlar çerçevesinde; siparişlerinizin alınması, ürünlerimizin ulaştırılması, ödeme işlemlerinin gerçekleştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlemektedir.</p>
            <p>Kişisel verileriniz, yukarıda belirtilen amaçlarla sınırlı olarak iş ortaklarımıza, tedarikçilerimize (kargo firmaları vb.) ve yetkili kamu kurumlarına aktarılabilir.</p>
            <p>Kanun’un 11. maddesi uyarınca veri sahipleri; kendisiyle ilgili kişisel veri işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahiptir.</p>
        </>
    );

    const distanceSalesText = (
        <>
            <h3>Mesafeli Satış Sözleşmesi</h3>
            <p>İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait Gökçe Cotton internet sitesinden elektronik ortamda siparişini yaptığı aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
            <p><strong>Taraflar:</strong> Sözleşme, Gökçe Cotton (Satıcı) ile web sitesi üzerinden alışveriş yapan kullanıcı (Alıcı) arasındadır.</p>
            <p><strong>Ödeme ve Teslimat:</strong> Ürünün satış fiyatı, ödeme şekli ve teslimat adresi sipariş sonlandığında belirlenmektedir. Satıcı, sözleşme konusu ürünün sağlam, eksiksiz, siparişte belirtilen niteliklere uygun teslim edilmesinden sorumludur.</p>
            <p><strong>Cayma Hakkı:</strong> Alıcı, 14 gün içerisinde hiçbir gerekçe göstermeksizin cayma hakkını kullanabilir. İade süreçleri web sitesinde belirtilen kurallar çerçevesinde yürütülür.</p>
            <p><strong>Uyuşmazlıklar:</strong> İşbu sözleşmeden doğabilecek uyuşmazlıklarda, Sanayi ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri, bu değeri aşan durumlarda ise Tüketici Mahkemeleri yetkilidir.</p>
        </>
    );

    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Teslimat ve İadeler</h1>

                <p className={css.intro}>
                    Bu sayfa, 6502 sayılı Tüketicinin Korunması Hakkında Kanun, Mesafeli Sözleşmeler Yönetmeliği ve 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında bilgilendirme amacıyla hazırlanmıştır.
                </p>

                <section className={css.section}>
                    <h2>Teslimat Koşulları</h2>
                    <p>Siparişleriniz, ödeme onayının alınmasının ardından 1–3 iş günü içerisinde kargoya teslim edilir. Teslimat süresi, alıcının bulunduğu lokasyona ve kargo firmasına bağlı olarak değişiklik gösterebilir.</p>
                    <p>Gönderimler, satıcı tarafından belirlenen anlaşmalı kargo firmaları aracılığıyla yapılır. Teslimatlar yalnızca Türkiye Cumhuriyeti sınırları içerisinde gerçekleştirilmektedir.</p>
                    <p>Kargo ücreti, sipariş aşamasında kullanıcıya açıkça bildirilir. Kampanya dönemlerinde ücretsiz kargo uygulaması yapılabilir.</p>
                </section>

                <section className={css.section}>
                    <h2>Cayma Hakkı (Mesafeli Satışlara İlişkin)</h2>
                    <p>Tüketici, hiçbir gerekçe göstermeksizin ve cezai şart ödemeksizin, ürünü teslim aldığı tarihten itibaren 14 (ondört) gün içerisinde cayma hakkını kullanabilir.</p>
                    <p>Cayma hakkının kullanılması için bu süre içinde satıcıya yazılı bildirim yapılması gerekmektedir.</p>
                </section>

                <section className={css.section}>
                    <h2>Cayma Hakkının Kullanılamayacağı Ürünler</h2>
                    <p>Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi uyarınca aşağıdaki ürünlerde cayma hakkı kullanılamaz:</p>
                    <ul className={css.list}>
                        <li>Tüketicinin istekleri doğrultusunda kişiye özel hazırlanan ürünler</li>
                        <li>Hijyenik nedenlerle iadesi uygun olmayan ürünler</li>
                        <li>Ambalajı açılmış, kullanılmış veya tekrar satılabilirliğini kaybetmiş ürünler</li>
                        <li>Dijital içerikler (indirme sonrası)</li>
                    </ul>
                </section>

                <section className={css.section}>
                    <h2>İade Şartları</h2>
                    <p>İade edilecek ürünün;</p>
                    <ul className={css.list}>
                        <li>Kullanılmamış olması</li>
                        <li>Orijinal ambalajı, aksesuarları ve faturası ile birlikte gönderilmesi</li>
                        <li>Yeniden satılabilirliğini kaybetmemiş olması</li>
                    </ul>
                    <p>gerekmektedir.</p>
                    <p>İade edilen ürün tarafımıza ulaştıktan sonra kontrol edilir ve şartlara uygun olması halinde iade süreci başlatılır.</p>
                </section>

                <section className={css.section}>
                    <h2>Ücret İadesi</h2>
                    <p>İade onayının ardından ürün bedeli, 14 gün içerisinde ödeme yapılan yöntemle tüketiciye iade edilir. Banka kaynaklı gecikmelerden satıcı sorumlu değildir.</p>
                </section>

                <section className={css.section}>
                    <h2>İade Kargo Ücreti</h2>
                    <p>Hatalı, ayıplı veya yanlış gönderilen ürünlerde iade kargo ücreti satıcıya aittir.</p>
                    <p>Cayma hakkı kapsamında yapılan iadelerde kargo ücreti tüketiciye ait olabilir (mesafeli satış sözleşmesinde belirtilmişse).</p>
                </section>

                <section className={css.section}>
                    <h2>Hasarlı veya Eksik Ürünler</h2>
                    <p>Teslimat sırasında kargo paketi kontrol edilmelidir. Hasarlı ürünlerde kargo görevlisine hasar tespit tutanağı tutturulması zorunludur.</p>
                    <p>Eksik veya yanlış ürünlerde, teslimat tarihinden itibaren 48 saat içinde satıcıyla iletişime geçilmelidir.</p>
                </section>

                <section className={css.section}>
                    <h2>Kişisel Verilerin Korunması (KVKK)</h2>
                    <p>İade ve teslimat süreçlerinde paylaşılan kişisel veriler (ad, soyad, adres, telefon vb.), yalnızca siparişin tamamlanması, iade işlemlerinin yürütülmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla işlenmektedir.</p>
                    <p>Kişisel verileriniz, KVKK ve ilgili mevzuata uygun olarak korunmakta olup üçüncü kişilerle yalnızca hizmetin gerektirdiği ölçüde paylaşılmaktadır. Detaylı bilgi için KVKK Aydınlatma Metni sayfasını inceleyebilirsiniz.</p>
                </section>

                <div className={css.policyLinks}>
                    <button className={css.policyLink} onClick={() => setActiveModal('kvkk')}>KVKK Aydınlatma Metni</button>
                    <button className={css.policyLink} onClick={() => setActiveModal('distance')}>Mesafeli Satış Sözleşmesi</button>
                </div>

                {activeModal && (
                    <div className={css.modalOverlay} onClick={closeModal}>
                        <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={css.closeButton} onClick={closeModal}>&times;</button>
                            <div className={css.modalBody}>
                                {activeModal === 'kvkk' ? kvkkText : distanceSalesText}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryPage;
