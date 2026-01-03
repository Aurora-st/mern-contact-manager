<<<<<<< HEAD
# 📇 MERN Contact App

A full-stack contact management application built with MongoDB, Express, React, and Node.js. This app allows users to create, view, and delete contacts with a clean, modern UI.

## 🏗️ Project Structure

```
.
├── client/          # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.js
│   │   │   ├── ContactForm.css
│   │   │   ├── ContactList.js
│   │   │   └── ContactList.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── server/          # Node.js + Express backend
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── contactController.js
    ├── middleware/
    │   └── errorHandler.js
    ├── models/
    │   └── Contact.js
    ├── routes/
    │   └── contactRoutes.js
    ├── server.js
    └── package.json
```

## ✨ Features

### Backend
- ✅ RESTful API with Express
- ✅ MongoDB database connection (database: `contact_app`)
- ✅ Mongoose schema with validation
- ✅ Centralized error handling
- ✅ CORS configuration
- ✅ Proper HTTP status codes

### Frontend
- ✅ Responsive, modern UI
- ✅ Live form validation
- ✅ Loading states and error handling
- ✅ Auto-refresh contact list
- ✅ Delete contacts with confirmation
- ✅ Sort by latest or name
- ✅ Success feedback messages

## 🚀 Local Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB running locally
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/contact_app
```

5. Start the server:
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional, for custom API URL):
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

App will open on `http://localhost:3000`

## 📡 API Endpoints

### POST /api/contacts
Create a new contact

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "message": "Optional message"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": { ... }
}
```

### GET /api/contacts
Get all contacts

**Query Parameters:**
- `sort` (optional): `latest` or `name` (default: `latest`)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [ ... ]
}
```

### DELETE /api/contacts/:id
Delete a contact by ID

**Response:**
```json
{
  "success": true,
  "message": "Contact deleted successfully",
  "data": { ... }
}
```

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Build Command: `cd server && npm install`
   - Start Command: `cd server && npm start`
   - Environment: `Node`

3. **Add Environment Variables:**
   - `MONGODB_URI`: Your MongoDB connection string (MongoDB Atlas or other)
   - `PORT`: Leave empty (Render sets this automatically)
   - `NODE_ENV`: `production`

4. **Deploy** - Render will automatically deploy your backend

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your project:**
   - Connect your GitHub repository
   - Root Directory: `client`
   - Framework Preset: `Create React App`

3. **Add Environment Variable:**
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api`)

4. **Deploy** - Vercel will automatically deploy your frontend

### MongoDB Atlas Setup (for production)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist IP addresses (or use `0.0.0.0/0` for all)
5. Get connection string and update `MONGODB_URI` in Render

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/contact_app?retryWrites=true&w=majority
```

## 🧪 Testing the API

### Using cURL:

```bash
# Create a contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","phone":"1234567890"}'

# Get all contacts
curl http://localhost:5000/api/contacts

# Delete a contact
curl -X DELETE http://localhost:5000/api/contacts/ID_HERE
```

## 🎨 Tech Stack

- **Frontend:** React 18, Axios, CSS3
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Deployment:** Render (backend), Vercel (frontend)

## 📝 Code Quality

- ✅ Clean, modular code structure
- ✅ Proper error handling
- ✅ Input validation (frontend & backend)
- ✅ Responsive design
- ✅ No console errors
- ✅ Production-ready code

## 🔧 Development Notes

- The app uses MongoDB database named `contact_app`
- Frontend automatically refreshes contact list after adding a contact
- Form validation prevents invalid submissions
- All API responses follow consistent format with `success` flag
- Error messages are user-friendly and informative

## 📄 License

ISC

---

**Built with ❤️ using MERN Stack**

=======
# mern-contact-manager
A full-stack MERN Contact Management Web Application with real-time validation, REST APIs, MongoDB integration, and live deployment. Built as part of a technical interview assignment.
>>>>>>> a1f62625d39e0d4ae75d0976059b05940d46d0b2
