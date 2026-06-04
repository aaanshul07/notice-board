import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  // =========================
  // GET: Fetch all notices
  // =========================
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" }, // Urgent first
          { createdAt: "desc" }
        ]
      })

      return res.status(200).json(notices)
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch notices" })
    }
  }

  // =========================
  // POST: Create notice
  // =========================
  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body

      // Server-side validation (IMPORTANT)
      if (!title || !body || !category || !priority || !publishDate) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const newNotice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null
        }
      })

      return res.status(201).json(newNotice)
    } catch (error) {
      return res.status(500).json({ error: "Failed to create notice" })
    }
  }

  // =========================
  // Method not allowed
  // =========================
  return res.status(405).json({ error: "Method not allowed" })
}