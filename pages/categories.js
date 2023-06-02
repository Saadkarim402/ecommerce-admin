import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

 export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState("");
  const [parentCategory, setParentCategory] = useState(" ");
  const [editCategory, setEditCategory] = useState(null);

  //for fetching data
  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }

  //when saving data
  async function saveCategory(ev) {

    ev.preventDefault();
    const data = { name, parentCategory };
    if (editCategory) {

      data._id=editCategory._id;
      await axios.put("/api/categories", data);
      setEditCategory(null);
    } else {

      await axios.post("/api/categories", data);

    }
    setName("");
    fetchCategories();
  }

  function editedCategory(category) {
    setParentCategory(category?.parent?._id);
    setEditCategory(category);
    setName(category?.name);
  }

 async function deleteCategory(category){
    const {_id}=category;
    await axios.delete('/api/categories?_id='+_id);

    fetchCategories();
  }

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editCategory
          ? `Edit category ${editCategory.name}`
          : "create new product"}
      </label>
      <form className="flex gap-2" onSubmit={saveCategory}>
        <input
          className="mb-0"
          placeholder="Category name"
          onChange={(ev) => setName(ev.target.value)}
        />
        <select
          className="mb-0"
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value="">No parent category</option>
        
          {categories.length > 0 &&
            categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
            
        </select>
        <button className="btn-primary py-1">Save</button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>parentCategory</td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    className="btn-primary mr-1"
                    onClick={() => editedCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-red mr-1"
                    onClick={() => deleteCategory(category)}
                  >
                   Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}

