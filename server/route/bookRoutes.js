const express = require("express");
const router = express.Router();
const { client } = require("../db");
const { ObjectId } = require("mongodb");

// Route tìm kiếm sách với query parameter `q`
router.get("/v1/book/search", async (req, res) => {
  try {
    const db = client.db("books");
    const books = db.collection("book");

    let query = {};
    if (req.query.q) {
      const regexPattern = new RegExp(req.query.q, "i");
      query.name = { $regex: regexPattern };
    }

    const bookList = await books
      .find(query)
      .sort({
        list_price: 1,
      })
      .toArray();
    res.json(bookList);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/v1/book", async (req, res) => {
  try {
    console.log(req.query.name);
    const db = client.db("books");
    const books = db.collection("book");

    let query = {};
    const options = {
      projection: {
        categories: 0,
        book_cover: 0,
        id: 0,
        description: 0,
        specifications: 0,
      },
    };

    if (req.query.name) {
      const regexPattern = new RegExp(`^${req.query.name}`, "i");
      query.name = { $regex: regexPattern };
    }

    if (req.query.rating_average) {
      console.log(req.query.rating_average);
      const rating = parseFloat(req.query.rating_average);
      if (!isNaN(rating)) {
        query.rating_average = { $gte: rating };
      }
    }
    if (req.query.current_seller) {
      const regexPattern = new RegExp(`^${req.query.current_seller}`, "i");
      query["current_seller.name"] = { $regex: regexPattern };
    }

    // const bookList = await books.find(query).toArray();
    const bookList = await books
      .find(query, options)
      .sort({ rating_average: 1 })
      .toArray(); // Sắp xếp tăng dần theo rating_average
    res.json(bookList);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

// Route lấy thông tin sách theo id
router.get("/v1/book/:id", async (req, res) => {
  try {
    const db = client.db("books");
    const books = db.collection("book");

    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const options = {
      projection: {
        short_description: 0,
        categories: 0,
        book_cover: 0,
        id: 0,
      },
    };

    const book = await books.findOne(query, options);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
