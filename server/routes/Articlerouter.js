const express = require("express");
const Article = require("../Database/ArticleSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "hello welcome to the Blogging website" });
});

router.post("/createArticle", async (req, res) => {
  try {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      return res
        .status(422)
        .json({ error: "please fill all the filled properly" });
    }

    const article = new Article({ title, description, content });
    await article.save();

    return res.status(201).json({ message: "Article created successfully" });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.get("/getArticles", async (req, res) => {
  try {
    const resp = await Article.find({}).sort({ createdAt: -1 }).lean();

    if (!resp) {
      return res.json({ message: "No article Found" });
    }
    res.send(resp);
  } catch (error) {
    res.send(error);
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug });
    res.send(article);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, content } = req.body;

    await Article.findByIdAndUpdate(id, { title, description, content });

    res.status(201).send({ message: "Article Edited successfully" });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete({ _id: req.params.id });
    res.send({ message: "Article Deleted successfully" });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
