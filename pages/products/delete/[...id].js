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

  async function deleteProduct(){
   await axios.delete('/api/Products?id='+id);
      goBack(); 
  }



  return (
    <Layout>
      <h1 className="text-center">Do You Really want to delete &nbsp;"{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center" >
        <button className="btn-red" onClick={deleteProduct}>Yes</button>
        <button onClick={goBack} className="btn-default">
          NO
        </button>
      </div>
    </Layout>
  );
}
