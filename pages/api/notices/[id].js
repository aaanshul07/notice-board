import { prisma } from "../../../lib/prisma"

export default async function handler(req, res) {
  const { id } = req.query

  // =========================
  // PUT: Update notice
  // =========================
  if (req.method === "PUT") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body

      if (!title || !body || !category || !priority || !publishDate) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const updatedNotice = await prisma.notice.update({
        where: { id: Number(id) },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null
        }
      })

      return res.status(200).json(updatedNotice)
    } catch (error) {
      return res.status(500).json({ error: "Failed to update notice" })
    }
  }

  // =========================
  // DELETE: Delete notice
  // =========================
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: { id: Number(id) }
      })

      return res.status(200).json({ message: "Notice deleted successfully" })
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete notice" })
    }
  }

  return res.status(405).json({ error: "Method not allowed" })
}