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

  // Inline styling for table, rows, and cells
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyles = {
    backgroundColor: '#f4f4f4',
    padding: '10px 15px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #ddd',
  };

  const tdStyles = {
    padding: '10px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
  };

  const rowStyles = {
    transition: 'background-color 0.3s ease',
  };

  const hoverRowStyles = {
    backgroundColor: '#f1f1f1',
  };

  const priceChangeStyles = (change) => ({
    color: change > 0 ? 'red' : 'green',
    fontWeight: 'bold',
  });

  return (
    <div>
      <h2>Price History</h2>
      <table style={tableStyles}>
        <thead>
          <tr style={rowStyles}>
            <th style={thStyles}>Updated At</th>
            <th style={thStyles}>Name</th>
            <th style={thStyles}>Price</th>
            <th style={thStyles}>Price Change</th>
          </tr>
        </thead>
        <tbody>
          {priceHistory.map((product) => {
            const priceData = getPriceData(product);
            const change = getPriceChange(product);

            return (
              <tr
                key={product.url}
                style={rowStyles}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f1f1f1')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
              >
                <td style={tdStyles}>{priceData.date}</td>
                <td style={tdStyles}>
                  <a onClick={() => openModal(product)} style={{ color: '#007BFF', cursor: 'pointer' }}>
                    {product.name}
                  </a>
                </td>
                <td style={tdStyles}>${priceData.price}</td>
                <td style={{ ...tdStyles, ...priceChangeStyles(change) }}>
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
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
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
