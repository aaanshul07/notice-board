import { useEffect, useState } from "react"

export default function Home() {
  const [notices, setNotices] = useState([])
  const [editId, setEditId] = useState(null)

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "General",
    priority: "Normal",
    publishDate: ""
  })

  const loadNotices = async () => {
    const res = await fetch("/api/notices")
    const data = await res.json()
    setNotices(data)
  }

  useEffect(() => {
    loadNotices()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (editId) {
      await fetch(`/api/notices/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      setEditId(null)
    } else {
      await fetch("/api/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
    }

    setForm({
      title: "",
      body: "",
      category: "General",
      priority: "Normal",
      publishDate: ""
    })

    loadNotices()
  }

  return (
    <div className="page">
      <h1 className="title">📌 Notice Board</h1>

      {/* FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="body"
          placeholder="Write notice..."
          value={form.body}
          onChange={handleChange}
        />

        <div className="row">
          <select name="category" value={form.category} onChange={handleChange}>
            <option>General</option>
            <option>Exam</option>
            <option>Event</option>
          </select>

          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Normal</option>
            <option>Urgent</option>
          </select>

          <input
            type="date"
            name="publishDate"
            value={form.publishDate}
            onChange={handleChange}
          />
        </div>

        <button className="btnPrimary">
          {editId ? "Update Notice" : "Add Notice"}
        </button>
      </form>

      {/* CARDS */}
      <div className="grid">
        {notices.map((n) => (
          <div key={n.id} className="card">
            <div className="cardTop">
              <h3>{n.title}</h3>
              {n.priority === "Urgent" && (
                <span className="badge">🔥 URGENT</span>
              )}
            </div>

            <p className="body">{n.body}</p>

            <div className="meta">
              <span>{n.category}</span>
              <span>{n.publishDate?.split("T")[0]}</span>
            </div>

            <div className="actions">
              <button
                className="editBtn"
                onClick={() => {
                  setForm(n)
                  setEditId(n.id)
                }}
              >
                Edit
              </button>

              <button
                className="deleteBtn"
                onClick={async () => {
                  const ok = confirm("Delete this notice?")
                  if (!ok) return

                  await fetch(`/api/notices/${n.id}`, {
                    method: "DELETE"
                  })

                  loadNotices()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* STYLE */}
      <style jsx>{`
        .page {
          padding: 30px;
          font-family: Arial;
          background: linear-gradient(135deg, #eef2ff, #f8fafc);
          min-height: 100vh;
        }

        .title {
          text-align: center;
          font-size: 32px;
          margin-bottom: 20px;
        }

        .form {
          background: white;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          max-width: 600px;
          margin: auto;
        }

        input, textarea, select {
          width: 100%;
          margin: 8px 0;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          outline: none;
        }

        textarea {
          height: 80px;
        }

        .row {
          display: flex;
          gap: 10px;
        }

        .btnPrimary {
          width: 100%;
          padding: 12px;
          border: none;
          background: #4f46e5;
          color: white;
          border-radius: 10px;
          cursor: pointer;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 30px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          transition: 0.3s;
        }

        .card:hover {
          transform: translateY(-5px);
        }

        .cardTop {
          display: flex;
          justify-content: space-between;
        }

        .badge {
          background: red;
          color: white;
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 12px;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: gray;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }

        .editBtn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }

        .deleteBtn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
}