import React, { useEffect, useState, useRef } from 'react';
import axios from "axios";
import './DepositoryPublic.css';
import AnimatedTitle from "../AdminPanel/PromotionsPage/AnimatedTitle";

const API = "https://servicebox35.pp.ru/api/depository";

function CategoryDropdown({ categories, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        if (open) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Узнать, есть ли у категории дети
    function hasChildren(catId) {
        return categories.some(cat => String(cat.parent) === String(catId));
    }

    function buildOptions(list, selectedId, parent = null, level = 0) {
        let arr = [];
        for (const cat of list) {
            if (!parent && cat.parent) continue;
            if (parent && String(cat.parent) !== String(parent)) continue;
            arr.push({ value: cat._id, label: cat.name, level });

            // Если текущая категория выбрана, раскрываем её дочерние
            if (String(cat._id) === String(selectedId)) {
                arr = arr.concat(buildOptions(list, selectedId, cat._id, level + 1));
            }
        }
        return arr;
    }
    const options = buildOptions(categories, value);
    const selected = value ? categories.find(cat => String(cat._id) === String(value)) : null;
    function handleClick(opt) {
        onChange(opt.value);
        // Если у выбранной есть дети — не закрываем, пусть пользователь выберет дальше
        if (!hasChildren(opt.value)) setOpen(false);
        // Если у неё есть подкатегории, остаёмся открытыми
    }

    return (
        <div className="repoDropdownWrap" ref={ref}>
            <div
                className="repoDropdownBtn"
                data-open={open}
                data-selected={!!value}
                tabIndex={0}
                onClick={() => setOpen(x => !x)}
                onKeyDown={e => {
                    if (e.key === "Enter" || e.key === " ") setOpen(x => !x);
                }}
            >
                <span>{selected ? selected.name : "Все категории"}</span>
            </div>
            {open && (
                <div className="repoDropdownPanel">
                    <div
                        className={`option${!value ? " selected" : ""}`}
                        onClick={() => { onChange(""); setOpen(false); }}
                    >
                        Все категории
                    </div>
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            className={[
                                "option",
                                `level-${opt.level}`,
                                value === opt.value ? "selected" : ""
                            ].join(" ")}
                            style={{ paddingLeft: 40 + opt.level * 28 }}
                            onClick={() => handleClick(opt)}
                        >
                            {opt.label}
                            {/* Отрисуем "→" для тех, у кого есть дети */}
                            {hasChildren(opt.value) && <span style={{ marginLeft: 5, color: "#acgfd", fontSize: 30 }}>▶</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default function DepositoryPublic() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [search, setSearch] = useState("");
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handler = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    useEffect(() => {
        axios.get(API + '/categories').then(r => setCategories(r.data));
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        const resp = await axios.get(`${API}/files${category ? `?category=${category}` : ''}`);
        setFiles(resp.data);
        setLoading(false);
    };
    useEffect(() => { fetchFiles(); /* eslint-disable-next-line */ }, [category]);

    const filterFiles = files.filter(f => {
        const str = [
            f?.category?.name,
            f.originalName,
            f.mimetype,
        ].filter(Boolean).join(" ").toLowerCase();
        return str.includes(search.toLowerCase());
    });

    const handleDownload = (id) => {
        window.location = `${API}/files/${id}/download`;
    };

    return (
        <div className="repoRoot">
            <AnimatedTitle className="effect3d ">Депозитарий файлов</AnimatedTitle>
            <div className="repoFilter">
                <CategoryDropdown categories={categories} value={category} onChange={setCategory} />
                <input
                    className="searchInput"
                    placeholder="Поиск по названию, категории, формату..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{
                    margin: "35px 5px", fontSize: 22, color: "#3697e5", fontWeight: 500
                }}>Загрузка...</div>
            ) : (
                width >= 900 ? (
                    <div className="tableWrap">
                        <table className="repoTable">
                            <thead>
                                <tr>
                                    <th>Категория</th>
                                    <th>Файл</th>
                                    <th>Размер</th>
                                    <th>Дата</th>
                                    <th>Скачать</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterFiles.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="nothing">
                                            По вашему запросу ничего не найдено.
                                        </td>
                                    </tr>
                                )}
                                {filterFiles.map(f => (
                                    <tr key={f._id}>
                                        <td>{f.category?.name || "-"}</td>
                                        <td>
                                            <span className="fileName">{f.originalName}</span>
                                        </td>
                                        <td>{(f.size / 1024).toFixed(1)} Kb</td>
                                        <td style={{ fontSize: 14 }}>{(new Date(f.createdAt)).toLocaleString()}</td>
                                        <td>
                                            <button
                                                className="repoDlBtn"
                                                style={
                                                    hovered === f._id
                                                        ? { filter: "brightness(0.93)", boxShadow: '0 4px 14px #c2e1fa' }
                                                        : {}
                                                }
                                                onMouseEnter={() => setHovered(f._id)}
                                                onMouseLeave={() => setHovered(null)}
                                                onClick={() => handleDownload(f._id)}
                                            >Скачать</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="cards">
                        {filterFiles.length === 0 && (
                            <div className="nothing">По вашему запросу ничего не найдено.</div>
                        )}
                        {filterFiles.map(f => (
                            <div className="cardFile" key={f._id}>
                                <div><span style={{ color: "#1e7de5" }}><b>Категория:</b></span> {f.category?.name || "-"} </div>
                                <div><b>Имя файла:</b> <span className="fileName">{f.originalName}</span></div>
                                <div><b>Размер:</b> {(f.size / 1024).toFixed(1)} Kb</div>
                                <div><b>Дата:</b> {(new Date(f.createdAt)).toLocaleString()}</div>
                                <button
                                    className="repoDlBtn"
                                    onClick={() => handleDownload(f._id)}
                                    onMouseEnter={() => setHovered(f._id)}
                                    onMouseLeave={() => setHovered(null)}
                                >
                                    Скачать
                                </button>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
}