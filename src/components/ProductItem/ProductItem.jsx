import React from "react";
import "./ProductItem.scss";

const ProductItem = ({ dataItems, loading }) => {
  if (loading) {
    return (
      <div className="loader">
        <img src="./img/loading.webp" alt="Loader" />
      </div>
    );
  }

  if (!dataItems || dataItems.length === 0) {
    return <h2 className="no-data-message">No data available</h2>;
  }

  return (
    <div className="product-items">
      {dataItems.map((item, index) => (
        <div key={item.id || index} className="product-item">
          <div className="product-item__image">
            {item.product.toLowerCase().includes("колье") ? (
              <img src="./img/jewelry/pic_01.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("кольцо") ? (
              <img src="./img/jewelry/pic_02.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("серьги") ? (
              <img src="./img/jewelry/pic_03.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("браслет") ? (
              <img src="./img/jewelry/pic_04.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("комплект") ? (
              <img src="./img/jewelry/pic_05.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("ложка") ? (
              <img src="./img/jewelry/pic_10.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("кулон") ? (
              <img src="./img/jewelry/pic_06.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("брошь") ? (
              <img src="./img/jewelry/pic_07.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("пусеты") ? (
              <img src="./img/jewelry/pic_08.webp" alt="Product" />
            ) : item.product.toLowerCase().includes("цепь") ? (
              <img src="./img/jewelry/pic_09.webp" alt="Product" />
            ) : (
              <img src="./img/jewelry/pic_11.webp" alt="Product" />
            )}
          </div>
          <div className="product-item__details">
            <div className="product-item__details-row">{item.id}</div>
            <div className="product-item__details-row">{item.product}</div>
            <div className="product-item__details-row">{item.price}</div>
            <div className="product-item__details-row">
              {item.brand || "no brand"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
