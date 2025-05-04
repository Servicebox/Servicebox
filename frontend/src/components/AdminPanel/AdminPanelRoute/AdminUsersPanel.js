// === FRONTEND: AdminUsersPanel.jsx ===
import React, { useEffect, useState } from "react";
import "./AdminUsersPanel.css";

const API_URL = "https://servicebox35.pp.ru/api";

const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('auth-token');
    const headers = options.headers || {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
    }
    const newOptions = { ...options, headers };
    return fetch(url, newOptions);
};

const AdminUsersPanel = () => {
    const [users, setUsers] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            const res = await fetchWithAuth(`${API_URL}/user/all`);
            if (res.ok) setUsers(await res.json());
        };
        fetchAll();
    }, []);

    const selectUser = async (id) => {
        setSelectedId(id);
        setLoadingOrders(true);
        const res = await fetchWithAuth(`${API_URL}/api/order/admin/${id}`);
        setLoadingOrders(false);
        if (res.ok) setOrders(await res.json());
        else setOrders([]);
    };

    return (
        <div className="adminuserspanel-container">
            <h2>Пользователи сайта</h2>
            <div className="adminusers-listwrap">
                <table className="adminusers-table">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Email</th>
                            <th>Телефон</th>
                            <th>Роль</th>
                            <th>Email подтв.</th>
                            <th>Корзина</th>
                            <th>Заказы</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u._id} style={selectedId === u._id ? { background: "#e3f2fd" } : {}}>
                                <td>{u.username}</td>
                                <td>{u.email}</td>
                                <td>{u.phone}</td>
                                <td>{u.role}</td>
                                <td>{u.isVerified ? "✔" : "✗"}</td>
                                <td>
                                    {u.cartData ? Object.entries(u.cartData).map(([k, v]) => v > 0 && <span key={k}>{k}: {v}, </span>) : "-"}
                                </td>
                                <td>
                                    <button onClick={() => selectUser(u._id)}>Смотреть</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedId &&
                    <div className="adminusers-orders">
                        <h4>Заказы пользователя</h4>
                        {loadingOrders ? "Загрузка..." : (
                            <ul>
                                {orders.length === 0 && <li>Нет заказов</li>}
                                {orders.map((order, idx) =>
                                    <li key={order._id ?? idx}>#{order._id} — {order.status} — {order.products.map(p => `${p.name}×${p.count}`).join(", ")}</li>)}
                            </ul>
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default AdminUsersPanel;