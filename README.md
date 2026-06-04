Notice Board – Full Stack Web Application

A full-stack Notice Board application built using Next.js, Prisma ORM, and MySQL.
This project demonstrates CRUD operations with a responsive frontend and backend API integration.

Live Demo:

https://notice-board-eight.vercel.app/

GitHub Repository:

https://github.com/aaanshul07/notice-board.git

Tech Stack:

Next.js (Pages Router)
React.js
Prisma ORM
MySQL (TiDB Cloud)
Node.js
CSS (custom styling)
Vercel (deployment)

Features:

Notice Management (CRUD)
Create new notices
View all notices
Update existing notices
Delete notices with confirmation

Priority System:

Urgent notices are highlighted
Normal notices displayed separately

User Interface:

Clean card-based layout
Responsive design for mobile and desktop
Hover effects for better interaction
Simple and readable UI structure

Backend Features:

Next.js API routes for backend logic
Prisma ORM for database operations
MySQL cloud database integration
REST API structure (GET, POST, PUT, DELETE)

Project Structure:

notice-board/
│
├── pages/
│   ├── api/
│   │   └── notices/
│   │       ├── index.js
│   │       └── [id].js
│   ├── index.js
│
├── prisma/
│   └── schema.prisma
│
├── lib/
│   └── prisma.js
│
├── package.json


Setup Instructions:

Clone Repository
git clone https://github.com/aaanshul07/notice-board.git
cd notice-board
Install Dependencies
npm install
Environment Variables

Create a .env file:

DATABASE_URL="mysql://username:password@host:4000/database?sslaccept=strict"

Run Prisma
npx prisma db push

Start Development Server:

npm run dev

Open:

http://localhost:3000

What I Learned:

Full-stack development using Next.js
Building REST APIs
Prisma ORM with MySQL
CRUD operations implementation
UI development and state management
Deployment workflow using GitHub and Vercel

Future Improvements:

Authentication system (login/register)
Role-based access control
Search and filter functionality
Pagination for notices
File/image upload support

Author:

Anshul Yadav
Web Development Intern Project
