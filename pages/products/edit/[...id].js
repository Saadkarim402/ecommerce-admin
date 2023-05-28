import Layout from "@/components/layout";
import ProductForm from "@/components/productsform";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return;
  }
  useEffect(() => {
    axios.get("/api/Products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit page</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
