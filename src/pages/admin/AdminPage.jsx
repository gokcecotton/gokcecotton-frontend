import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addProduct, updateProduct, deleteProduct } from "../../redux/products/operations";
import { fetchCategories } from "../../redux/categories/operations";
import { selectProducts, selectIsLoading } from "../../redux/products/selectors";
import { selectCategories, selectIsLoading as selectIsCatLoading } from "../../redux/categories/selectors";
import { addCategory } from "../../redux/categories/operations";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import css from "./AdminPage.module.css";
import noImage from "../../assets/logo-yazili.png";

const ProductSchema = Yup.object().shape({
    title: Yup.string().required("Başlık gerekli"),
    brand: Yup.string().required("Marka gerekli"),
    price: Yup.number().positive("Fiyat pozitif olmalı").required("Fiyat gerekli"),
    stock: Yup.number().min(0, "Stok 0'dan az olamaz").required("Stok gerekli"),
    description: Yup.string().required("Açıklama gerekli"),
    categoryId: Yup.string().required("Kategori gerekli"),
});

export const AdminPage = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectIsLoading);
    const isCatLoading = useSelector(selectIsCatLoading);
    const fileInputRef = useRef(null);
    const catFileInputRef = useRef(null);

    const [editingProduct, setEditingProduct] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isCatFormOpen, setIsCatFormOpen] = useState(false);

    // Görsel yönetimi için state
    const [currentImages, setCurrentImages] = useState([]); // Mevcut URL'ler
    const [newImageFiles, setNewImageFiles] = useState([]); // Yeni seçilen dosyalar
    const [previewUrls, setPreviewUrls] = useState([]); // Yeni dosyaların önizlemeleri
    const [catImageFile, setCatImageFile] = useState(null);
    const [catPreviewUrl, setCatPreviewUrl] = useState(null);

    useEffect(() => {
        dispatch(fetchProducts({ perPage: 100 }));
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setNewImageFiles(prev => [...prev, ...files]);

        const urls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...urls]);
    };

    const moveImage = (index, direction, isNew) => {
        if (isNew) {
            const updatedFiles = [...newImageFiles];
            const updatedPreviews = [...previewUrls];
            const newPos = index + direction;

            if (newPos >= 0 && newPos < updatedFiles.length) {
                [updatedFiles[index], updatedFiles[newPos]] = [updatedFiles[index], updatedFiles[newPos]]; // Placeholder for swap
                const tempFile = updatedFiles[index];
                updatedFiles[index] = updatedFiles[newPos];
                updatedFiles[newPos] = tempFile;

                const tempPreview = updatedPreviews[index];
                updatedPreviews[index] = updatedPreviews[newPos];
                updatedPreviews[newPos] = tempPreview;

                setNewImageFiles(updatedFiles);
                setPreviewUrls(updatedPreviews);
            }
        } else {
            const updated = [...currentImages];
            const newPos = index + direction;
            if (newPos >= 0 && newPos < updated.length) {
                const temp = updated[index];
                updated[index] = updated[newPos];
                updated[newPos] = temp;
                setCurrentImages(updated);
            }
        }
    };

    const removeImage = (index, isNew) => {
        if (isNew) {
            setNewImageFiles(prev => prev.filter((_, i) => i !== index));
            setPreviewUrls(prev => prev.filter((_, i) => i !== index));
        } else {
            setCurrentImages(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
            dispatch(deleteProduct(id))
                .unwrap()
                .then(() => toast.success("Ürün silindi"))
                .catch((err) => toast.error(err));
        }
    };

    const handleSubmit = (values, { resetForm }) => {
        const formData = new FormData();

        // Temel alanları ekle
        Object.keys(values).forEach(key => {
            formData.append(key, values[key]);
        });

        // Mevcut görselleri (sıralanmış haliyle) ekle
        currentImages.forEach(img => formData.append('images', img));

        // Yeni dosyaları ekle
        newImageFiles.forEach(file => formData.append('images', file));

        const action = editingProduct
            ? updateProduct({ productId: editingProduct._id, productData: formData })
            : addProduct(formData);

        dispatch(action)
            .unwrap()
            .then(() => {
                toast.success(editingProduct ? "Ürün güncellendi" : "Ürün eklendi");
                resetForm();
                resetImageState();
                setIsFormOpen(false);
                setEditingProduct(null);
            })
            .catch((err) => toast.error(err));
    };

    const resetImageState = () => {
        setCurrentImages([]);
        setNewImageFiles([]);
        setPreviewUrls([]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setCurrentImages(product.images || []);
        setNewImageFiles([]);
        setPreviewUrls([]);
        setIsFormOpen(true);
        setIsCatFormOpen(false);
    };

    const slugify = (text) => {
        const trMap = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
            'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
        };
        return text.toLowerCase()
            .replace(/[çğışüö]/g, (c) => trMap[c])
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleCategorySubmit = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("slug", slugify(values.name));
        formData.append("description", values.description || "");
        if (catImageFile) {
            formData.append("image", catImageFile);
        }

        dispatch(addCategory(formData))
            .unwrap()
            .then(() => {
                toast.success("Kategori başarıyla eklendi");
                resetForm();
                setCatImageFile(null);
                setCatPreviewUrl(null);
                if (catFileInputRef.current) catFileInputRef.current.value = "";
                setIsCatFormOpen(false);
            })
            .catch((err) => toast.error(err));
    };

    return (
        <div className={css.container}>
            <header className={css.header}>
                <h1>Admin Paneli - Ürün Yönetimi</h1>
                <div className={css.headerActions}>
                    <button
                        className={css.catBtn}
                        onClick={() => {
                            setIsCatFormOpen(!isCatFormOpen);
                            setIsFormOpen(false);
                        }}
                    >
                        {isCatFormOpen ? "Kapat" : "Yeni Kategori Ekle"}
                    </button>
                    <button
                        className={css.addBtn}
                        onClick={() => {
                            setEditingProduct(null);
                            resetImageState();
                            setIsFormOpen(!isFormOpen);
                            setIsCatFormOpen(false);
                        }}
                    >
                        {isFormOpen ? "Kapat" : "Yeni Ürün Ekle"}
                    </button>
                </div>
            </header>

            {isCatFormOpen && (
                <div className={css.formSection}>
                    <h2>Yeni Kategori Ekle</h2>
                    <Formik
                        initialValues={{ name: "", description: "" }}
                        validationSchema={Yup.object({
                            name: Yup.string().required("Kategori adı gerekli"),
                            description: Yup.string(),
                        })}
                        onSubmit={handleCategorySubmit}
                    >
                        {() => (
                            <Form className={css.form}>
                                <div className={css.fieldGroup}>
                                    <label>Kategori Adı</label>
                                    <Field name="name" className={css.input} />
                                    <ErrorMessage name="name" component="div" className={css.error} />
                                </div>
                                <div className={css.fieldGroup}>
                                    <label>Açıklama (Opsiyonel)</label>
                                    <Field as="textarea" name="description" className={css.textarea} />
                                </div>
                                <div className={css.fieldGroup}>
                                    <label>Kategori Görseli</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={catFileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setCatImageFile(file);
                                                setCatPreviewUrl(URL.createObjectURL(file));
                                            }
                                        }}
                                        className={css.fileInput}
                                    />
                                    {catPreviewUrl && (
                                        <div className={css.gallery}>
                                            <div className={css.imageItem}>
                                                <img src={catPreviewUrl} alt="cat-preview" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button type="submit" className={css.submitBtn} disabled={isCatLoading}>
                                    Kategori Kaydet
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            {isFormOpen && (
                <div className={css.formSection}>
                    <h2>{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h2>
                    <Formik
                        initialValues={{
                            title: editingProduct?.title || "",
                            brand: editingProduct?.brand || "",
                            price: editingProduct?.price || 0,
                            stock: editingProduct?.stock || 0,
                            description: editingProduct?.description || "",
                            categoryId: editingProduct?.categoryId?._id || editingProduct?.categoryId || "",
                        }}
                        validationSchema={ProductSchema}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {() => (
                            <Form className={css.form}>
                                <div className={css.fieldGroup}>
                                    <label>Ürün Adı</label>
                                    <Field name="title" className={css.input} />
                                    <ErrorMessage name="title" component="div" className={css.error} />
                                </div>

                                <div className={css.fieldGroup}>
                                    <label>Marka</label>
                                    <Field name="brand" className={css.input} />
                                    <ErrorMessage name="brand" component="div" className={css.error} />
                                </div>

                                <div className={css.row}>
                                    <div className={css.fieldGroup}>
                                        <label>Fiyat (TL)</label>
                                        <Field name="price" type="number" className={css.input} />
                                        <ErrorMessage name="price" component="div" className={css.error} />
                                    </div>
                                    <div className={css.fieldGroup}>
                                        <label>Stok</label>
                                        <Field name="stock" type="number" className={css.input} />
                                        <ErrorMessage name="stock" component="div" className={css.error} />
                                    </div>
                                </div>

                                <div className={css.fieldGroup}>
                                    <label>Kategori</label>
                                    <Field as="select" name="categoryId" className={css.input}>
                                        <option value="">Kategori Seçin</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="categoryId" component="div" className={css.error} />
                                </div>

                                <div className={css.fieldGroup}>
                                    <label>Açıklama</label>
                                    <Field as="textarea" name="description" className={css.textarea} />
                                    <ErrorMessage name="description" component="div" className={css.error} />
                                </div>

                                <div className={css.imageManagement}>
                                    <label>Ürün Görselleri</label>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className={css.fileInput}
                                    />

                                    <div className={css.gallery}>
                                        {/* Mevcut Görseller */}
                                        {currentImages.map((src, idx) => (
                                            <div key={`cur-${idx}`} className={css.imageItem}>
                                                <img src={src} alt="existing" />
                                                <div className={css.imageActions}>
                                                    <button type="button" onClick={() => moveImage(idx, -1, false)}>‹</button>
                                                    <button type="button" onClick={() => removeImage(idx, false)} className={css.delBtn}>×</button>
                                                    <button type="button" onClick={() => moveImage(idx, 1, false)}>›</button>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Yeni Seçilen Görseller */}
                                        {previewUrls.map((src, idx) => (
                                            <div key={`new-${idx}`} className={`${css.imageItem} ${css.newImage}`}>
                                                <img src={src} alt="new" />
                                                <div className={css.imageActions}>
                                                    <button type="button" onClick={() => moveImage(idx, -1, true)}>‹</button>
                                                    <button type="button" onClick={() => removeImage(idx, true)} className={css.delBtn}>×</button>
                                                    <button type="button" onClick={() => moveImage(idx, 1, true)}>›</button>
                                                </div>
                                                <span className={css.newBadge}>Yeni</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button type="submit" className={css.submitBtn} disabled={isLoading}>
                                    {editingProduct ? "Güncelle" : "Kaydet"}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}

            <div className={css.listSection}>
                <table className={css.table}>
                    <thead>
                        <tr>
                            <th>Görsel</th>
                            <th>Ürün</th>
                            <th>Marka</th>
                            <th>Kategori</th>
                            <th>Fiyat</th>
                            <th>Stok</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>
                                    <img
                                        src={product.images?.[0] || noImage}
                                        alt={product.title}
                                        className={css.thumb}
                                    />
                                </td>
                                <td>{product.title}</td>
                                <td>{product.brand}</td>
                                <td>{categories.find(c => c._id === (product.categoryId?._id || product.categoryId))?.name || "—"}</td>
                                <td>{product.price} TL</td>
                                <td>{product.stock}</td>
                                <td className={css.actions}>
                                    <button onClick={() => handleEdit(product)} className={css.editBtn}>Düzenle</button>
                                    <button onClick={() => handleDelete(product._id)} className={css.deleteBtn}>Sil</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
