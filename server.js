const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// نقطة ترحيب لاختبار جاهزية السيرفر
app.get("/", (req, res) => {
  res.send("📘 Khamsa Notes API is running");
});

// جلب الملاحظات
app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT content, created_at FROM notes ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "خطأ في جلب البيانات" });
  }
});

// إضافة ملاحظة جديدة
app.post("/notes", async (req, res) => {
  const { note } = req.body;
  if (!note) return res.status(400).json({ error: "الملاحظة فارغة" });

  try {
    await db.query("INSERT INTO notes (content) VALUES (?)", [note]);
    res.status(201).json({ message: "تمت الإضافة" });
  } catch (err) {
    res.status(500).json({ error: "خطأ في حفظ البيانات" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
