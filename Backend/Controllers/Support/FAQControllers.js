const FAQ = require("../../Model/Support/FAQModel");

//RETRIVE
const getAllFAQs = async (req, res, next) => {
  try {
    const faqs = await FAQ.find();
    if (!faqs || faqs.length === 0) {
      return res.status(404).json({ message: "FAQs not found" });
    }
    return res.status(200).json({ faqs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//CREATE
const addFAQ = async (req, res, next) => {
  const { category, question, answer } = req.body;

  try {
    const faq = new FAQ({ category, question, answer });
    await faq.save();
    return res.status(200).json({ faq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Unable to add FAQ" });
  }
};

//GETBYID
const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    return res.status(200).json({ faq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
const updateFAQ = async (req, res, next) => {
  const id = req.params.id;
  const { category, question, answer } = req.body;

  console.log(id)
  console.log(category)
  console.log(question)
  console.log(answer)

  try {
    const faq = await FAQ.findByIdAndUpdate(
      id,
      { category, question, answer },
      { new: true }
    );
    if (!faq) {
      return res.status(404).json({ message: "Unable to update FAQ details" });
    }
    return res.status(200).json({ faq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//DELETE
const deleteFAQ = async (req, res, next) => {
  const id = req.params.id;
  try {
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return res.status(404).json({ message: "Unable to delete FAQ" });
    }
    return res.status(200).json({ faq });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllFAQs,
  addFAQ,
  getById,
  updateFAQ,
  deleteFAQ,
};
