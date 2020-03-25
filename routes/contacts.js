const express = require("express");
const router = express.Router();

//@route GET /api/contacts
//@desription Get all users contacts
//@access Private
router.get("/", (req, res) => {
  res.json({ msg: "Get all contacts" });
});
//@route POST /api/contacts
//@desription Add new contacts
//@access Private
router.post("/", (req, res) => {
  res.json({ msg: "Add new contact" });
});
//@route PUT /api/contacts/:id
//@desription Update contact
//@access Private
router.put("/:id", (req, res) => {
  res.json({ msg: "Update contact" });
});
//@route DELETE /api/contacts/:id
//@desription Delete contact
//@access Private
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete contact" });
});

module.exports = router;
