import axios from 'axios'; // Đảm bảo Axios được import

export const createOrder = async order => {
  try {
    const { data } = await axios.post('/api/orders/create', order); // Thêm await
    return data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data || error.message);
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser');
    return data;
  } catch (error) {
    console.error('Error fetching new order:', error.response?.data || error.message);
    throw error;
  }
};

export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', { paymentId });
    return data;
  } catch (error) {
    console.error('Error processing payment:', error.response?.data || error.message);
    throw error;
  }
};
export const trackOrderById = async orderId => {
  const { data } = await axios.get('/api/orders/track/' + orderId);
  return data;
};
export const getAll = async state => {
  const { data } = await axios.get(`/api/orders/${state ?? ''}`);
  return data;
};
export const getAllStatus = async () => {
  const { data } = await axios.get(`/api/orders/allstatus`);
  return data;
};