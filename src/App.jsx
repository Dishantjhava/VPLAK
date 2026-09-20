import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchOrder from './components/SearchOrder';
import OrderCard from './components/OrderCard';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [activeNav] = useState("Order's Panel");
  const [searchBy, setSearchBy] = useState('name');
  const [query, setQuery] = useState('dummy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async (type, value) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(
        `/api/orders/search?type=${encodeURIComponent(type)}&value=${encodeURIComponent(value ?? '')}`
      );
      const result = await res.json();
      if (result.success) {
        setOrders(result.data || []);
      } else {
        setError(result.message || 'Failed to fetch orders');
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch whenever radio selection or search input changes
  useEffect(() => {
    fetchOrders(searchBy, query);
  }, [searchBy, query, fetchOrders]);

  const handleSearch = ({ searchBy: newSearchBy, query: newQuery }) => {
    setSearchBy(newSearchBy);
    setQuery(newQuery);
  };

  const handleTrack = (order) => {
    alert(`Tracking Order #${order.orderId} - Status: ${order.trackStatus || order.product?.status}`);
  };

  const handleGenerateInvoice = (order) => {
    alert(`Generating invoice for Order #${order.orderId}`);
  };

  const handleLogout = () => {
    alert('Logged out successfully.');
  };

  return (
    <div className="min-h-screen flex flex-col font-[Arial,Helvetica,sans-serif] bg-[#005c53]">
      {/* BEGIN: MainHeader */}
      <Navbar
        activeItem={activeNav}
        onLogout={handleLogout}
      />
      {/* END: MainHeader */}

      {/* BEGIN: MainContent */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-5 flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-base font-black tracking-wide text-black mb-4 uppercase">
          Search Order
        </h1>

        {/* BEGIN: SearchFormSection */}
        <SearchOrder
          searchBy={searchBy}
          query={query}
          onSearchByChange={setSearchBy}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />
        {/* END: SearchFormSection */}

        {/* BEGIN: OrderResultsList */}
        <section
          className="w-full max-w-3xl flex flex-col space-y-4"
          data-purpose="order-card-list"
        >
          {orders.length > 0 ? (
            orders.map((order) => (
              <OrderCard
                key={order._id || order.id || order.orderId}
                order={order}
                onTrack={handleTrack}
                onGenerateInvoice={handleGenerateInvoice}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500 text-xs font-semibold">
              {loading ? 'Searching orders...' : error ? error : 'No orders found matching the search criteria.'}
            </div>
          )}
        </section>
        {/* END: OrderResultsList */}
      </main>
      {/* END: MainContent */}
    </div>
  );
}
