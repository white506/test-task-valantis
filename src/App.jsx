import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import "./App.scss";
import ProductItem from "./components/ProductItem/ProductItem";
import Pagination from "./components/Pagination/Pagination";
import ProductFilter from "./components/ProductFilter/ProductFilter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const password = "Valantis";

const getAuthorizationString = () => {
  const timestamp = new Date().toISOString().slice(0, 10).split("-").join("");
  const data = `${password}_${timestamp}`;
  return CryptoJS.MD5(data).toString();
};

const App = () => {
  const [dataIds, setDataIds] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const authorizationString = getAuthorizationString();
        const response = await fetch("https://api.valantis.store:41000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": authorizationString,
          },
          body: JSON.stringify({
            action: "get_ids",
          }),
        });

        if (!response.ok) {
          if (response.status === 500) {
            return fetchData();
          } else {
            throw new Error("Failed to fetch id");
          }
        }

        const result = await response.json();
        setDataIds(result.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        if (dataIds.length === 0) {
          return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, dataIds.length);
        const idsForPage = dataIds.slice(startIndex, endIndex);

        const authorizationString = getAuthorizationString();
        const response = await fetch("https://api.valantis.store:41000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": authorizationString,
          },
          body: JSON.stringify({
            action: "get_items",
            params: { ids: idsForPage },
          }),
        });

        if (!response.ok) {
          if (response.status === 500) {
            return fetchItems();
          } else {
            throw new Error("Failed to fetch item");
          }
        }

        const result = await response.json();
        if (!result || !result.result || !Array.isArray(result.result)) {
          throw new Error("Data format is incorrect for items");
        }

        const uniqueItems = result.result.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setDataItems(uniqueItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, dataIds, itemsPerPage]);

  const fetchDataWithFilters = async () => {
    try {
      if (!filters.ids || filters.ids.length === 0) {
        return;
      }
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, filters.ids.length);
      const idsForFilterPage = filters.ids.slice(startIndex, endIndex);
      setLoading(true);
      const authorizationString = getAuthorizationString();

      if (idsForFilterPage) {
        const response = await fetch("https://api.valantis.store:41000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": authorizationString,
          },
          body: JSON.stringify({
            action: "get_items",
            params: { ids: idsForFilterPage },
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const result = await response.json();

        if (!result || !result.result || !Array.isArray(result.result)) {
          throw new Error("Data format is incorrect for items");
        }

        const uniqueItems = result.result.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
        setDataItems(uniqueItems);
        setDataIds(filters.ids);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchDataWithFilters();
  }, [currentPage, filters]);

  const lastPage = Math.ceil(dataIds.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, lastPage));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
      <Header />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataIds.length}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <ProductFilter
        applyFilters={handleApplyFilters}
        setDataItems={setDataItems}
      />
      <ProductItem dataItems={dataItems} loading={loading} />
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataIds.length}
        currentPage={currentPage}
        paginate={paginate}
        prevPage={prevPage}
        nextPage={nextPage}
      />
      <Footer />
    </div>
  );
};

export default App;
