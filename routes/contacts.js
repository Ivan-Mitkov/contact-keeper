const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Contact = require("../models/Contacts");
//@route GET /api/contacts
//@desription Get all users contacts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
//@route POST /api/contacts
//@desription Add new contacts
//@access Private
router.post(
  "/",
  [
    auth,
    check("name", "Name is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  }
);
//@route PUT /api/contacts/:id
//@desription Update contact
//@access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;
  //Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    //Find contact in db and update
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );
    //send the updated contact
    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
//@route DELETE /api/contacts/:id
//@desription Delete contact
//@access Private
router.delete("/:id", auth,async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    //Make sure user owns contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    //Find contact in db and delete
    await Contact.findByIdAndRemove(req.params.id)
    //send the updated contact
    res.json({msg:'Contact remove'});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
