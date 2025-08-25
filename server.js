const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/notes", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT content FROM notes ORDER BY created_at DESC"
    );
    res.json(rows.map((row) => row.content));
  } catch (err) {
    res.status(500).json({ error: "خطأ في جلب البيانات" });
  }
});

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
