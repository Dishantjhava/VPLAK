import React from 'react';

export default function OrderCard({ order, onTrack, onGenerateInvoice }) {
  if (!order) return null;

  const {
    id,
    orderDate,
    orderId,
    paymentMethod,
    buyer = {},
    total,
    product = {},
  } = order;

  return (
    <article
      className="bg-white rounded-xl shadow-md p-4 text-xs"
      data-purpose={`order-card-${id || orderId}`}
    >
      {/* Top Section: Header & Summary */}
      <div className="flex flex-wrap justify-between items-start pb-3 border-b border-gray-100">
        {/* Order Date & ID */}
        <div className="flex items-start space-x-6">
          <div>
            <div className="font-bold text-black text-xs">Order Date</div>
            <div className="text-[11px] text-gray-700 mt-0.5">{orderDate}</div>
          </div>
          <div className="flex flex-col items-center">
            <a
              href={`#order-${orderId}`}
              className="link-blue font-bold text-xs leading-none mb-1"
            >
              {orderId}
            </a>
            <span
              className={`badge-orange text-[10px] py-0.5 ${
                paymentMethod?.length > 4 ? 'px-2 min-w-[70px]' : 'px-3 w-16'
              }`}
            >
              {paymentMethod}
            </span>
          </div>
        </div>

        {/* Buyer Details */}
        <div className="text-[11px] leading-relaxed text-gray-800">
          <div>
            <span className="font-bold">Buyer Details:</span>
          </div>
          <div>
            <span className="font-bold">Name:</span>
            {buyer.name}
          </div>
          <div>
            <span className="font-bold">State:</span>
            {buyer.state}
          </div>
          <div>
            <span className="font-bold">Email:</span>
            {buyer.email}
          </div>
          <div>
            <span className="font-bold">Phone:</span>
            {buyer.phone}
          </div>
        </div>

        {/* Price, Track & Invoice */}
        <div className="flex items-center space-x-4 mt-1">
          <span className="font-bold text-xs text-black">Total:{total}</span>
          <button
            type="button"
            onClick={() => onTrack && onTrack(order)}
            className="btn-track"
          >
            TRACK
          </button>
          <a
            href={`#invoice-${orderId}`}
            onClick={(e) => {
              if (onGenerateInvoice) {
                e.preventDefault();
                onGenerateInvoice(order);
              }
            }}
            className="link-blue font-bold text-xs"
          >
            Generate Invoice
          </a>
        </div>
      </div>

      {/* Bottom Section: Product Item Details */}
      <div className="pt-3 flex items-start space-x-5 pl-4">
        {/* Thumbnail Product Image */}
        <div className="w-14 h-24 flex-shrink-0 flex items-center justify-center">
          <img
            alt={product.title}
            src={product.image}
            className="max-h-full max-w-full object-contain rounded"
          />
        </div>

        {/* Product Specifications & Fulfillment */}
        <div className="grid grid-cols-2 gap-x-10 text-[11px] leading-normal text-gray-800">
          {/* Col 1: Product Spec */}
          <div>
            <a
              href={`#product-${product.model}`}
              className="link-blue font-bold text-xs block mb-0.5"
            >
              {product.title}
            </a>
            <div>
              <span className="font-bold">Model:</span>
              {product.model}
            </div>
            <div>
              <span className="font-bold">Price:</span>
              {product.price}
            </div>
            <div>
              <span className="font-bold">Date:</span>
              {product.date}
              <br />
              <span className="pl-7">{product.time}</span>
            </div>
            <div className="mt-0.5">
              <span className="font-bold">Discount:</span>
              {product.discount}
            </div>
          </div>

          {/* Col 2: Quantity & Status */}
          <div className="pt-4">
            <div>
              <span className="font-bold">Qty:</span>
              {product.qty}
            </div>
            <div className="mt-1 leading-tight">
              <span className="font-bold">
                Delivery
                <br />
                Charges:
              </span>
              {product.deliveryCharges}
            </div>
            <div className="mt-1">
              <span className="font-bold">Status:</span>
              {product.status}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
