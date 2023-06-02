import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProductForm({
  _id,
  description: existDescription,
  title: existingTitle,
  price: existPrice,
  images,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [description, setDescription] = useState(existDescription || "");
  const [price, setPrice] = useState(existPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState("");

  const router = useRouter();

  async function createProduct(ev) {
    const data = { title, description, price };

    ev.preventDefault();
    if (_id) {
      //update
      await axios.put("/api/Products", { ...data, _id });
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

  //for fetching data
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  // async function uploadImages(ev) {
  //   const files = ev.target?.files;
  //   if (files?.length > 0) {
  //     const data = new FormData();
  //     files.forEach((file) => data.append("file", file));
  //     await axios.post("/api/upload", data);
  //   }
  // }

  return (
    <form onSubmit={createProduct}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <label>Category</label>
      <select className="mb-0">
        <option value="">No parent category</option>
        {categories.length > 0 &&
          categories.map((category) => (
            <option value={category._id}>{category.name}</option>
          ))}
      </select>
      <label>Photos</label>
      <div className="mb-2 ">
        <label className="w-24 h-24 cursor-pointer text-center flex items-center justify-center text-sm gap-1 text-gray-600 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" className="hidden" />
        </label>
        {!images?.length && (
          <div className="mt-2">No Photos in this product</div>
        )}
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      ></textarea>
      <label>Price(in rupees)</label>
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
