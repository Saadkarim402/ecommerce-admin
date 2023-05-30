import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name,setName]=useState('');
    const [categories,setCategories]=useState('');
    const [parentCategory,setParentCategory]=useState('');
    
    //for fetching data
    useEffect(()=>{
      fetchCategories();
    },[]);

    function fetchCategories(){
      axios.get('/api/categories').then(result=>{
        setCategories(result.data);
      })
    }

    //when saving data 
    async function saveCategory(ev){
        ev.preventDefault();
        await axios.post('/api/categories',{name,parentCategory});
        setName('');
        fetchCategories();
    }
  return (
    <Layout>
      <h1>Categories</h1>
      <label>New Category name</label>
      <form className="flex gap-2" onSubmit={saveCategory}>
        <input
          className="mb-0"
          placeholder="Category name"
          onChange={(ev) => setName(ev.target.value)}
          value={name}/>
          <select className="mb-0" onChange={ev=>setParentCategory(ev.target.value)}>
          {categories.length>0&&categories.map(it=>(
            <option value={it._id} >{it.name}</option>))}
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
          {categories.length>0&&categories.map(it=>(
            <tr>
              <td>{it.name}</td>
              <td>{it?.parent?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
