import React, { useEffect, useState } from 'react';
import axios from "axios";

const API = "https://servicebox35.pp.ru/api/depository";

const colors = {
    accent: "#2C88F8", accentHover: "#106FE2",
    delete: "#fa2e2e", bg: "#fff", tableHeader: "#f3f8fc", border: "#e6eaf0"
};

const tableStyle = { width: "100%", borderCollapse: "collapse", background: colors.bg, border: `1px solid ${colors.border}`, margin: "16px 0" };
const thStyle = { background: colors.tableHeader, color: "#222", padding: "10px 7px", borderBottom: `1px solid ${colors.border}`, fontWeight: 600 };
const tdStyle = { padding: "9px 7px", borderBottom: `1px solid ${colors.border}`, fontSize: 15 };
const buttonStyle = base => ({
    background: base === "delete" ? colors.delete : colors.accent,
    color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", padding: "6px 17px",
    transition: '.15s', fontWeight: "bold",
    ...(base === "delete" && { boxShadow: "0 0 0 0 rgba(250,46,46,0)" })
});
const buttonHoverStyle = base => ({
    background: base === "delete" ? "#b91717" : colors.accentHover
});
function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);
    return width;
}

// --- Категории селект каскадный ---
function CategorySelect({ categories, value, onChange }) {
    function renderOptions(list, level = 0) {
        return (Array.isArray(list) ? list : []).flatMap(c => [
            <option key={c._id} value={c._id}>
                {Array(level).fill('\u00A0\u00A0\u00A0').join('')}{level > 0 ? "↳ " : ""}{c.name}
            </option>,
            ...renderOptions(Array.isArray(c.subcategories) ? c.subcategories : [], level + 1)
        ]);
    }
    return (
        <select value={value} onChange={e => onChange(e.target.value)}>
            <option value="">--- выберите ---</option>
            {renderOptions(categories)}
        </select>
    );
}

// --- Добавление категории ---
function AddCategory({ categories, onAdd }) {
    const [name, setName] = useState('');
    const [parent, setParent] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            alert('Введите название категории!');
            return;
        }
        axios.post(`${API}/categories`, { name: name.trim(), parent: parent || null })
            .then(res => {
                setName(''); setParent('');
                onAdd();
            })
            .catch(err => alert(err.response?.data?.message || 'Ошибка'));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Название" />
            <CategorySelect categories={categories} value={parent} onChange={setParent} />
            <button type='submit'>Добавить</button>
        </form>
    );
}

const DepositoryPage = ({ user }) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [fileToUpload, setFileToUpload] = useState(null);
    const [uploadCategory, setUploadCategory] = useState("");
    const [newSubcategory, setNewSubcategory] = useState('');
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(null);
    const width = useWindowWidth();

    useEffect(() => {
        axios.get(API + '/categories').then(r => setCategories(r.data));
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        const resp = await axios.get(`${API}/files${category ? `?category=${category}` : ''}`);
        setFiles(resp.data);
        setLoading(false);
    };

    useEffect(() => { fetchFiles(); }, [category]);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!fileToUpload || !uploadCategory) return;
        const form = new FormData();
        form.append('file', fileToUpload);
        form.append('category', uploadCategory);
        if (newSubcategory && newSubcategory.trim()) form.append('newSubcategory', newSubcategory.trim());
        await axios.post(`${API}/files`, form, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        setFileToUpload(null);
        setNewSubcategory('');
        fetchFiles();
    };

    const handleDownload = id => {
        window.location = `${API}/files/${id}/download`;
    };

    const handleDelete = async id => {
        if (!window.confirm('Удалить файл?')) return;
        await axios.delete(`${API}/files/${id}`, {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        });
        fetchFiles();
    };

    return (
        <div style={{
            maxWidth: 1100, margin: 'auto', padding: "18px 10px",
            fontFamily: "Segoe UI, Arial, sans-serif", color: "#24292f"
        }}>
            <h2 className='animated-title'> Депозиторий файлов для сервисного центра</h2>



            {/* Фильтр по категориям */}
            <div style={{
                margin: '18px 0 10px 0', display: 'flex', flexWrap: 'wrap', gap: 8
            }}>
                <button
                    style={{
                        ...buttonStyle(),
                        padding: "7px 20px",
                        background: !category ? colors.accentHover : "#ecf3fb",
                        color: !category ? "#fff" : colors.accent
                    }}
                    onClick={() => setCategory("")}
                >Все</button>
                <CategorySelect categories={categories} value={category} onChange={setCategory} />
            </div>

            {/* Загрузка файла */}
            <form
                onSubmit={handleUpload}
                style={{
                    margin: "18px 0 20px 0",
                    background: "#eaf6ff",
                    borderRadius: 10,
                    boxShadow: "0 1px 6px 0 #e6eaf0",
                    padding: 18, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14
                }}>
                <b style={{ fontSize: 17, letterSpacing: 0.5 }}>Загрузить файл</b>
                <label>
                    Категория:
                    <CategorySelect
                        categories={categories}
                        value={uploadCategory}
                        onChange={id => { setUploadCategory(id); setNewSubcategory(""); }}
                    />
                </label>
                {uploadCategory &&
                    <input
                        placeholder="Новая подкатегория (не обязательно)"
                        value={newSubcategory}
                        onChange={e => setNewSubcategory(e.target.value)}
                    />
                }
                <input type="file"
                    onChange={e => setFileToUpload(e.target.files[0])} />
                <button
                    type="submit"
                    disabled={!fileToUpload || !uploadCategory}
                >
                    Загрузить
                </button>
            </form>

            {/* Пример админской формы */}
            <AddCategory categories={categories} onAdd={() => axios.get(API + '/categories').then(r => setCategories(r.data))} />

            {loading && <div>Загрузка...</div>}

            {!loading && (
                width >= 800
                    ? (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>Категория</th>
                                    <th style={thStyle}>Название файла</th>
                                    <th style={thStyle}>Тип</th>
                                    <th style={thStyle}>Размер</th>
                                    <th style={thStyle}>Загрузил</th>
                                    <th style={thStyle}>Дата</th>
                                    <th style={thStyle}>Скачать</th>
                                    <th style={thStyle}>Удалить</th>
                                </tr>
                            </thead>
                            <tbody>
                                {files.map(f => (
                                    <tr key={f._id}>
                                        <td style={tdStyle}>{f.category?.name || "-"}</td>
                                        <td style={tdStyle}>{f.originalName}</td>
                                        <td style={tdStyle}>{f.mimetype}</td>
                                        <td style={tdStyle}>{(f.size / 1024).toFixed(1)} Kb</td>
                                        <td style={tdStyle}>{f.uploader}</td>
                                        <td style={tdStyle}>{(new Date(f.createdAt)).toLocaleString()}</td>
                                        <td style={tdStyle}>
                                            <button
                                                style={{
                                                    ...buttonStyle(),
                                                    ...(hovered === "download" ? buttonHoverStyle() : {})
                                                }}
                                                onMouseEnter={() => setHovered("download")}
                                                onMouseLeave={() => setHovered(null)}
                                                onClick={() => handleDownload(f._id)}>Скачать</button>
                                        </td>
                                        <td style={tdStyle}>
                                            <button
                                                style={{
                                                    ...buttonStyle("delete"),
                                                    ...(hovered === f._id ? buttonHoverStyle("delete") : {})
                                                }}
                                                onMouseEnter={() => setHovered(f._id)}
                                                onMouseLeave={() => setHovered(null)}
                                                onClick={() => handleDelete(f._id)}>&times;</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 4 }}>
                            {files.map(f => (
                                <div key={f._id} style={{
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 10,
                                    background: "#f8fbfc",
                                    padding: 13,
                                    boxShadow: "0 1px 6px 0 #e6eaf0",
                                    fontSize: 15
                                }}>
                                    <div><b>Категория:</b> {f.category?.name || "-"}</div>
                                    <div><b>Имя файла:</b> {f.originalName}</div>
                                    <div><b>Тип:</b> {f.mimetype}</div>
                                    <div><b>Размер:</b> {(f.size / 1024).toFixed(1)} Kb</div>
                                    <div><b>Загрузил:</b> {f.uploader}</div>
                                    <div><b>Дата:</b> {(new Date(f.createdAt)).toLocaleString()}</div>
                                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                                        <button
                                            style={{ ...buttonStyle(), flex: 1 }}
                                            onClick={() => handleDownload(f._id)}>
                                            Скачать
                                        </button>
                                        <button
                                            style={{ ...buttonStyle("delete"), flex: 0.7 }}
                                            onClick={() => handleDelete(f._id)}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
            )}
        </div>
    );
};

export default DepositoryPage;