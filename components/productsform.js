import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
    _id,
  description: existDescription,
  title: existingTitle,
  price: existPrice,
}) {
  const [title, setTitle] = useState(existingTitle || "");

  const [description, setDescription] = useState(existDescription || "");
  const [price, setPrice] = useState(existPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    const data = { title, description, price };

    ev.preventDefault();
    if (_id) {
      //update
      await axios.put('/api/Products',{...data,_id});
      setGoToProducts(true);


    } else {
      //create

      await axios.post("/api/Products", data);
      setGoToProducts(true);
    }
  }

  if (goToProducts) {
    router.push("/products");
  }

  return (
    <form onSubmit={createProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>price(in rupees)</label>
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />
      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
