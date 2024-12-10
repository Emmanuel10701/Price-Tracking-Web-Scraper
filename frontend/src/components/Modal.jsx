import React, { useState } from "react";
import ModalComponent from './Modal';
import ProductDetailsPage from "./ProductDetailsPage";

function PriceHistoryTable({ priceHistory, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  const openModal = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getPriceData = (product) => {
    return product.priceHistory[0];
  };

  const getPriceChange = (product) => {
    if (product.priceHistory.length < 2) return 0;
    const currentPrice = product.priceHistory[0].price;
    const lastPrice = product.priceHistory[1].price;
    const change = 100 - (currentPrice / lastPrice) * 100;
    return Math.round(change * 100) / 100;
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Price History</h2>
      <table className="w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="bg-gray-100 p-3 text-left font-semibold border-b-2 border-gray-300">Updated At</th>
            <th className="bg-gray-100 p-3 text-left font-semibold border-b-2 border-gray-300">Name</th>
            <th className="bg-gray-100 p-3 text-left font-semibold border-b-2 border-gray-300">Price</th>
            <th className="bg-gray-100 p-3 text-left font-semibold border-b-2 border-gray-300">Price Change</th>
          </tr>
        </thead>
        <tbody>
          {priceHistory.map((product) => {
            const priceData = getPriceData(product);
            const change = getPriceChange(product);

            return (
              <tr
                key={product.url}
                className="transition-all duration-300 hover:bg-gray-100"
              >
                <td className="p-3 text-left border-b border-gray-300">{priceData.date}</td>
                <td className="p-3 text-left border-b border-gray-300">
                  <a 
                    onClick={() => openModal(product)} 
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    {product.name}
                  </a>
                </td>
                <td className="p-3 text-left border-b border-gray-300">${priceData.price}</td>
                <td className={`p-3 text-left border-b border-gray-300 ${change >= 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}`}>
                  {change >= 0 && "+"}
                  {change}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        onClick={onClose}
        className="px-6 py-2 bg-blue-600 text-white rounded-md mt-6 cursor-pointer hover:bg-blue-700"
      >
        Close
      </button>
      <ModalComponent
        isOpen={isModalOpen}
        closeModal={closeModal}
        content={<ProductDetailsPage product={currentProduct} />}
      />
    </div>
  );
}

export default PriceHistoryTable;
