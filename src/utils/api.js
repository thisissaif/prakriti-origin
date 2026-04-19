const API_BASE_URL = 'https://prakriti-origin.onrender.com/api';

export const fetchProducts = async () => {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
};

export const updateProduct = async (id, data) => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
};

export const fetchOrders = async () => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};

export const updateOrderStatus = async (id, status) => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ status })
  });
  return response.json();
};

export const deleteOrder = async (id) => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};

export const adminLogin = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) throw new Error('Login failed');
  return response.json(); // { token }
};

export const createRazorpayOrder = async (amount) => {
  const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount })
  });
  return response.json(); // order object with order.id
};

export const verifyPayment = async (data) => {
  const response = await fetch(`${API_BASE_URL}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return response.json();
};

export const submitContactForm = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return response.json();
};

export const fetchMessages = async () => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/contact`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};

export const deleteMessage = async (id) => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};

export const markMessageRead = async (id) => {
  const token = sessionStorage.getItem('prakriti-token');
  const response = await fetch(`${API_BASE_URL}/contact/${id}/read`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.json();
};
