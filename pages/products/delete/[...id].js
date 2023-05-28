import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function deleteProduct() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/Products?id=" + id).then((response) => {
      setProductInfo(response.data);
    });
  }, [id]);

  function goBack() {
    router.push("/products");
  }
  return (
    <Layout>
      <h1>Do You Really want to delete &nbsp;"{productInfo?.title}"?</h1>
      <button className="btn-red">Yes</button>
      <button onClick={goBack} className="btn-default">
        NO
      </button>
    </Layout>
  );
}
