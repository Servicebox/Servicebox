
import React, { useEffect, useState } from 'react';
import './AdminPromotions.css';

export default function AdminPromotions() {
    const [promotions, setPromotions] = useState([]);
    const [active, setActive] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', endDate: '', image: null });
    const [imagePreview, setImagePreview] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const toggleForm = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen ? 'auto' : 'hidden';
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) {
                setIsOpen(false);
                document.body.style.overflow = 'auto';
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, []);

    function fetchPromos() {
        fetch('https://servicebox35.pp.ru/api/promotions')
            .then(r => r.json())
            .then(setPromotions);
    }

    useEffect(fetchPromos, []);

    const handleChange = e => {
        if (e.target.name === "image") {
            setForm(f => ({ ...f, image: e.target.files[0] }));
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        } else {
            setForm(f => ({ ...f, [e.target.name]: e.target.value }));
        }
    };

    const handleEdit = promo => {
        setActive(promo._id);
        setForm({
            title: promo.title,
            description: promo.description,
            endDate: promo.endDate ? promo.endDate.substring(0, 10) : '',
            image: null
        });
        setImagePreview(promo.image);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("endDate", form.endDate);
        if (form.image) fd.append("image", form.image);

        const options = {
            method: active ? "PUT" : "POST",
            body: fd
        };

        const url = active
            ? `https://servicebox35.pp.ru/api/promotions/${active}`
            : `https://servicebox35.pp.ru/api/promotions`;

        let req = await fetch(url, options);
        if (req.ok) {
            fetchPromos();
            setActive(null);
            setForm({ title: "", description: "", endDate: "", image: null });
            setImagePreview('');
            alert("Акция успешно " + (active ? "обновлена" : "создана"));
        } else {
            alert("Ошибка: " + (await req.text()))
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Удалить акцию?')) {
            let req = await fetch("https://servicebox35.pp.ru/api/promotions/" + id, {
                method: "DELETE"
            });
            if (req.ok) fetchPromos();
        }
    };

    return (
        <div className="adminpromos-container">
            <div style={{ maxWidth: 700, margin: "0 auto" }}>
                <h2>{active ? "Редактировать" : "Создать"} акцию</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <input required name="title" value={form.title} onChange={handleChange} placeholder="Заголовок" />
                    <textarea required name="description" value={form.description} onChange={handleChange} placeholder="Описание" />
                    <input required name="endDate" type="date" value={form.endDate} onChange={handleChange} />
                    <input name="image" type="file" accept="image/*" onChange={handleChange} />
                    {imagePreview && (
                        <img
                            src={imagePreview.startsWith('blob:') ? imagePreview : `https://servicebox35.pp.ru${imagePreview}`}
                            alt="preview"
                            style={{ width: 160, paddingBottom: 15 }}
                        />
                    )}
                    <br />
                    <button type="submit">{active ? "Сохранить" : "Создать"}</button>
                    {active && <button type="button" onClick={() => { setActive(null); setForm({ title: "", description: "", endDate: "", image: null }); setImagePreview(""); }}>Отмена</button>}
                </form>
                <hr />
                <h3>Текущие акции</h3>
                <ol>
                    {promotions.map(pr =>
                        <li key={pr._id} style={{ marginBottom: 14 }}>
                            <b>{pr.title}</b> ({pr.description.slice(0, 40) + "..."}) до <i>{pr.endDate.slice(0, 10)}</i>
                            {' '}
                            <button onClick={() => handleEdit(pr)}>Ред.</button>
                            {' '}
                            <button style={{ color: 'red' }} onClick={() => handleDelete(pr._id)}>Удалить</button>
                        </li>
                    )}
                </ol>
            </div>
        </div>
    );
}