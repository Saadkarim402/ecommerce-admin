import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Category.find().populate('parent'));
  }

  if (method == "POST") {
    const { name, parentCategory } = req.body;
   // console.log(parentCategory);
    const categoryDoc = await Category.create({ name, parent: parentCategory, });
    res.json(categoryDoc);
  }
}