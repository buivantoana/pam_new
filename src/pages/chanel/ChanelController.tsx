import React, { useEffect, useState } from "react";
import ChanelView from "./ChanelView";
import { getAllProducts } from "../../service/product";

type Props = {};

const ChanelController = (props: Props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAll = async () => {
    try {
      const resProducts = await getAllProducts();

      if (resProducts && resProducts.status === 0)
        setProducts(resProducts.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <ChanelView products={products} />
    </>
  );
};

export default ChanelController;
