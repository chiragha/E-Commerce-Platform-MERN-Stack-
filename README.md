# 🛍️ E-Commerce Platform (MERN Stack)

A full-featured modern **E-Commerce Platform** built using the **MERN Stack** with secure authentication, Razorpay payment integration, cart management, order tracking, and responsive UI.

This project focuses on delivering a smooth shopping experience with a scalable architecture and clean frontend design.

---

## 🚀 Live Demo

### Frontend (Vercel)
[Live Website](https://e-commerce-platform-mern-stack-pi.vercel.app/)

### Backend API (Render)
[Backend API](https://e-commerce-platform-8qor.onrender.com/)

---

## 📌 Features

### 👤 User Authentication
- JWT Authentication
- Login / Signup
- Protected Routes
- Secure Token-based Authorization

### 🛒 Cart Management
- Add to Cart
- Remove from Cart
- Update Quantity
- Persistent Cart Saved in Database
- Cart remains saved after refresh/login

### ❤️ User Experience
- Fully Responsive UI
- Premium Modern Design
- Smooth Animations
- Clean Shopping Flow

### 📦 Product Management
- Product Listing
- Product Details
- Dynamic Product Fetching
- Image Upload with Cloudinary

### 📍 Address Management
- Add Multiple Addresses
- Select Address During Checkout

### 💳 Payment Integration
- Razorpay Payment Gateway
- Secure Payment Verification
- Order Creation & Payment Validation

### 📑 Purchase History
- Order History Page
- Purchased Products Display
- Buy Again Functionality

### ☁️ Deployment
- Frontend deployed on **Vercel**
- Backend deployed on **Render**
- Database hosted on **MongoDB Atlas**

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Framer Motion
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Razorpay API
- Cloudinary
- Express File Upload

---

## 📂 Project Structure

```bash
E-COMMERCE/
│── frontend/
│── backend/
│── README.md
```
###🔐 Environment Variables

- Frontend (.env)

```
VITE_BACKEND_URL=your_backend_url
VITE_RAZORPAY_KEY=your_razorpay_key

```
- Backend (.env)
  
 ```
PORT=4001
MONGO_URI=your_mongodb_connection
JWT_USER_PASSWORD=your_jwt_secret

CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_SECRET=your_secret

FRONTEND_URL=your_frontend_url

```
### ⚙️ Installation & Setup

- Clone Repository 

```
Clone Repository
```
- Frontend Setup
  
 ```
cd frontend
npm install
npm run dev

```

- Backend Setup
  
```
cd backend
npm install
npm run server

```
