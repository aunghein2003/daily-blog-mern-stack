const express = require("express");
const router = express.Router();
const {
  GetBlogs,
  SetBlog,
  UpdateBlog,
  DeleteBlog,
} = require("../controllers/blogController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(GetBlogs).post(protect, SetBlog);
router.route("/:id").put(protect, UpdateBlog).delete(protect, DeleteBlog);

module.exports = router;
