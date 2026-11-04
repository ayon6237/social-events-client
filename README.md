# 💙 CommunePulse 

> **Empowering communities and connecting compassionate citizens with direct local volunteer initiatives, charity drives, and social development campaigns.**

![CommunePulse Banner](https://via.placeholder.com/1200x400/1E3A8A/FFFFFF?text=CommunePulse+-+Community+Volunteer+Platform)

CommunePulse is a full-stack web application designed to bridge the gap between event organizers and volunteers. Users can seamlessly browse upcoming social initiatives, register as volunteers, and organizers can effortlessly create and manage their campaigns.

---

## ✨ Key Features

- **🔐 Robust Authentication:** Secure Email/Password and **Google OAuth** login powered by `Better Auth` and `JWT`.
- **📅 Event Management:** Organizers can create, update, and delete community events.
- **🤝 Volunteer Participation:** Users can join events with a single click and track their volunteer schedules.
- **🎨 Modern UI/UX:** Fully responsive, beautiful interfaces built with **Tailwind CSS**.
- **🌙 Dark Mode Support:** Seamless transition between Light and Dark themes for better user experience.
- **🛡️ Protected Routes:** JWT-secured backend endpoints to ensure data privacy and role-based access.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** [Next.js](https://nextjs.org/) (App/Pages Router)
- **Styling:** Tailwind CSS
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Icons & Alerts:** Lucide React, React Hot Toast

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Security:** JSON Web Tokens (JWT), CORS

### Deployment
- **Frontend:** Vercel
- **Backend:** Vercel / Render

---

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

### Frontend (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000  # Or your live backend URL
BETTER_AUTH_URL=http://localhost:3000      # Or your live frontend URL
BETTER_AUTH_SECRET=your_super_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
