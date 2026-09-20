import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchOrder from './components/SearchOrder';
import OrderCard from './components/OrderCard';

export default function App() {
  const [orders, setOrders] = useState([]);
  const [activeNav] = useState("Order's Panel");
  const [searchBy, setSearchBy] = useState('name');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Synchronize orders with backend search API on filter/input change
  useEffect(() => {
    let isCancelled = false;

    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const normalizedType = (searchBy || 'name').trim().toLowerCase();
        const res = await fetch(
          `/api/orders/search?type=${encodeURIComponent(normalizedType)}&value=${encodeURIComponent(query ?? '')}`
        );
        const result = await res.json();

        if (!isCancelled) {
          if (result.success) {
            setOrders(result.data || []);
          } else {
            setError(result.message || 'Failed to fetch orders');
            setOrders([]);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setOrders([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      isCancelled = true;
    };
  }, [searchBy, query]);

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
      {/* Main Header */}
      <Navbar
        activeItem={activeNav}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-5 flex flex-col items-center">
        {/* Page Title */}
        <h1 className="text-base font-black tracking-wide text-black mb-4 uppercase">
          Search Order
        </h1>

        {/* Search Form Section */}
        <SearchOrder
          searchBy={searchBy}
          query={query}
          onSearchByChange={setSearchBy}
          onQueryChange={setQuery}
          onSearch={handleSearch}
        />

        {/* Order Results List */}
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
      </main>
    </div>
  );
}
