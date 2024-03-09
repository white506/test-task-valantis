import React, { useState } from "react";
import "./ProductFilter.scss";
import CryptoJS from "crypto-js";

const password = "Valantis";

const getAuthorizationString = () => {
  const timestamp = new Date().toISOString().slice(0, 10).split("-").join("");
  const data = `${password}_${timestamp}`;
  return CryptoJS.MD5(data).toString();
};

const brands = [
  "Alfieri & St.John",
  "Audemars Piguet",
  "Baraka",
  "Bibigi",
  "Bvlgari",
  "Carrera y Carrera",
  "Cartier",
  "Casa Gi",
  "Casato",
  "Chaumet",
  "Chopard",
  "Damiani",
  "De Beers",
  "De Grisogono",
  "Faberge",
  "Franck Muller",
  "Giorgio Visconti",
  "Imma",
  "Jacob & Co",
  "Mauboussin",
  "Mikimoto",
  "Pasquale Bruni",
  "Piaget",
  "Pomellato",
  "Roberto Coin",
  "Stephen Webster",
  "Tiffany & Co",
  "Van Cleef & Arpels",
  "ЭПЛ Якутские бриллианты",
];

const ProductFilter = ({ applyFilters, setDataItems }) => {
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  let filteredPriceIds = [];
  let filteredBrandIds = [];
  let filteredProductIds = [];

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const applyPriceFilter = async () => {
    try {
      const authorizationString = getAuthorizationString();
      const response = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": authorizationString,
        },
        body: JSON.stringify({
          action: "filter",
          params: { price: parseFloat(price) },
        }),
      });
  
      if (!response.ok) {
        if (response.status === 500) {
          console.log("Server error (500), retrying...");
          return applyPriceFilter();
        } else {
          throw new Error("Failed to apply price filter");
        }
      }
  
      const result = await response.json();
      if (!result || !result.result || !Array.isArray(result.result)) {
        throw new Error("Data format is incorrect for price filter result");
      }
  
      filteredPriceIds = result.result;
    } catch (error) {
      console.error("Error applying price filter:", error);
    }
  };
  
  const applyBrandFilter = async () => {
    try {
      const authorizationString = getAuthorizationString();
      const response = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": authorizationString,
        },
        body: JSON.stringify({
          action: "filter",
          params: { brand },
        }),
      });
  
      if (!response.ok) {
        if (response.status === 500) {
          console.log("Server error (500), retrying...");
          return applyBrandFilter();
        } else {
          throw new Error("Failed to apply brand filter");
        }
      }
  
      const result = await response.json();
      if (!result || !result.result || !Array.isArray(result.result)) {
        throw new Error("Data format is incorrect for brand filter result");
      }
  
      filteredBrandIds = result.result;
    } catch (error) {
      console.error("Error applying brand filter:", error);
    }
  };
  
  const applyProductFilter = async () => {
    if (!product || !product.trim()) {
      console.log("Skipping filter.");
      return;
    }
    try {
      const authorizationString = getAuthorizationString();
      const response = await fetch("http://api.valantis.store:40000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": authorizationString,
        },
        body: JSON.stringify({
          action: "filter",
          params: { product },
        }),
      });
  
      if (!response.ok) {
        if (response.status === 500) {
          console.log("Server error (500), retrying...");
          return applyProductFilter();
        } else {
          throw new Error("Failed to apply product filter");
        }
      }
  
      const result = await response.json();
      if (!result || !result.result || !Array.isArray(result.result)) {
        throw new Error("Data format is incorrect for product filter result");
      }
  
      filteredProductIds = result.result;
    } catch (error) {
      console.error("Error applying product filter:", error);
    }
  };
  
  
  const compareAndLogCommonIds = () => {

    let commonIds = [];
  
    if (filteredPriceIds.length > 0) {
      commonIds = [...filteredPriceIds];
    }
  
    if (filteredBrandIds.length > 0) {
      if (commonIds.length === 0) {
        commonIds = [...filteredBrandIds];
      } else {
        commonIds = commonIds.filter((id) => filteredBrandIds.includes(id));
      }
    }
  
    if (filteredProductIds.length > 0) {
      if (commonIds.length === 0) {
        commonIds = [...filteredProductIds];
      } else {
        commonIds = commonIds.filter((id) => filteredProductIds.includes(id));
      }
    }
  
    if (commonIds.length > 0) {
      setFilteredProducts(commonIds);
      applyFilters({ ids: commonIds });
    } else {
      setDataItems([])
    }
  };
  
  const applyAllFilters = async () => {
    try {
      const promises = [applyPriceFilter(), applyBrandFilter(), applyProductFilter()];
      await Promise.all(promises);
      compareAndLogCommonIds();
    } catch (error) {
      console.error("Error applying all filters:", error);
    }
  };
  

  return (
    <div className="product-filter">
      <input
        type="number"
        value={price}
        onChange={handlePriceChange}
        placeholder="enter price"
      />
      <div className="select-wrapper">
        <select value={brand} onChange={handleBrandChange}>
          <option value="">select brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        value={product}
        onChange={handleProductChange}
        placeholder="enter product"
        style={{ textTransform: 'lowercase' }}
      />
      <button onClick={applyAllFilters}>Search</button>
    </div>
  );
};

export default ProductFilter;
