import css from "./LegalPage.module.css";

export const PrivacyPolicyPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Gizlilik Politikası</h1>

                <section className={css.section}>
                    <h2>Kişisel Verilerin Korunması</h2>
                    <p>Gökçe Cotton olarak kişisel verilerinizin güvenliği hususuna azami hassasiyet göstermekteyiz. Bu kapsamda, ürün ve hizmetlerimizden faydalanan kişiler dahil, Gökçe Cotton ile ilişkili tüm şahıslara ait her türlü kişisel verilerin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”)’na uygun olarak işlenerek, muhafaza edilmesine büyük önem vermekteyiz.</p>
                </section>

                <section className={css.section}>
                    <h2>Veri Sorumlusu</h2>
                    <p>Veri sorumlusu sıfatıyla Gökçe Cotton, kişisel verilerinizi Kanun’da belirtilen sınırlar çerçevesinde; siparişlerinizin alınması, ürünlerimizin ulaştırılması, ödeme işlemlerinin gerçekleştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlemektedir.</p>
                </section>

                <section className={css.section}>
                    <h2>Verilerin İşlenme Amacı</h2>
                    <p>Kişisel verileriniz, Gökçe Cotton tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, ürün ve hizmetlerin kullanım alışkanlıklarınıza ve ihtiyaçlarınıza göre özelleştirilerek sizlere önerilmesi, şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile şirketimizin insan kaynakları politikalarının yürütülmesinin temini amaçlarıyla işlenmektedir.</p>
                </section>

                <section className={css.section}>
                    <h2>Verilerin Aktarılması</h2>
                    <p>Kişisel verileriniz, yukarıda belirtilen amaçlarla sınırlı olarak iş ortaklarımıza, tedarikçilerimize (kargo firmaları vb.) ve yetkili kamu kurumlarına ilgili mevzuat çerçevesinde aktarılabilir.</p>
                </section>

                <section className={css.section}>
                    <h2>Veri Sahibinin Hakları</h2>
                    <p>Kanun’un 11. maddesi uyarınca veri sahipleri;</p>
                    <ul>
                        <li>Kendisiyle ilgili kişisel veri işlenip işlenmediğini öğrenme,</li>
                        <li>İşlenmişse bilgi talep etme,</li>
                        <li>İşlenme amacını ve uygun kullanılıp kullanılmadığını öğrenme,</li>
                        <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme haklarına sahiptir.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
