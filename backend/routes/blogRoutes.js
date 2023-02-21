const express = require("express");
const router = express.Router();
const {
  GetBlogs,
  SetBlog,
  UpdateBlog,
  DeleteBlog,
} = require("../controllers/blogController");

router.get("/", GetBlogs);
router.post("/", SetBlog);
router.put("/:id", UpdateBlog);
router.delete("/:id", DeleteBlog);

module.exports = router;
