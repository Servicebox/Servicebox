import React, { useEffect, useState, useContext, useRef } from "react";
import { ShopContext } from "../Contexst/ShopContext";
import { useLocation } from "react-router-dom";
import "./UserProfile.css";

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

const UserOrderList = React.forwardRef(({ orders }, ref) => (
  <div className="user-orders-section" id="orders" ref={ref}>
    <h3>Ваши заказы</h3>
    {(!orders || orders.length === 0) && (
      <div className="user-noorders">Заказы отсутствуют.</div>
    )}
    {orders && orders.length > 0 && (
      <ul className="user-orders-list">
        {orders.map((order, idx) => (
          <li key={order._id ?? idx} className="user-order">
            <div>
              <b>Заказ #:</b> {order._id} <br />
              <b>Дата:</b> {order.createdAt ? new Date(order.createdAt).toLocaleString('ru') : '-'} <br />
              <b>Статус:</b> {order.status} <br />
              <b>Состав заказа:</b>
              <ul>
                {order.products.map((p, i) => (
                  <li key={i}>
                    {p.name} × {p.count} (₽{p.price})
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
));

UserOrderList.displayName = 'UserOrderList';

const UserProfile = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");
    const { setIsAuthenticated } = useContext(ShopContext);
    const location = useLocation();

    const ordersRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await fetchWithAuth(`${API_URL}/profile`);
                if (!res.ok) {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('auth-token');
                        setIsAuthenticated(false);
                        return;
                    }
                    throw new Error('Не удалось получить профиль');
                }
                const data = await res.json();
                setUser(data);
            } catch (e) {
                setError(e.message || "Ошибка профиля");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [setIsAuthenticated]);

    useEffect(() => {
        const fetchOrders = async () => {
            const res = await fetchWithAuth(`${API_URL}/order`);
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        };
        fetchOrders();
    }, []);
    useEffect(() => {
        if (location.hash === "#orders" && ordersRef.current) {
            setTimeout(() => {
                ordersRef.current.scrollIntoView({ behavior: "smooth" });
            }, 150);
        }
    }, [location, orders]);

    if (loading) return <div className="userprof-loader">Загрузка...</div>;
    if (error) return <div className="userprof-error">{error}</div>;

    if (!user) return <div className="userprof-ntfound">Профиль не найден.</div>;

    return (
        <div className="userprof-container">
            <h2>Личный кабинет</h2>
            <div className="userprof-details">
                <p><b>Имя:</b> {user.username}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Телефон:</b> {user.phone}</p>
                <p><b>Роль:</b> {user.role === "admin" ? "Администратор" : "Пользователь"}</p>
                {user.isVerified && <span className="userprof-verified">✔ Email подтвержден</span>}
                {!user.isVerified && <span className="userprof-notverif">Email не подтвержден!</span>}
            </div>
            <UserOrderList orders={orders} ref={ordersRef} />
        </div>
    );
};

export default UserProfile;