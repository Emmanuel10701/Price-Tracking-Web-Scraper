import React from 'react';

function SearchTextList({ searchTexts, onSearchTextClick }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#4B5563', // Slate color (slate-500)
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const listItemStyle = {
    marginBottom: '8px',
  };

  const buttonStyle = {
    backgroundColor: '#3b82f6', // blue-500
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#2563eb', // blue-600
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>All Products</h2>
      <ul style={listStyle}>
        {searchTexts.map((searchText, index) => (
          <li key={index} style={listItemStyle} onClick={() => onSearchTextClick(searchText)}>
            <button
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            >
              {searchText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchTextList;
