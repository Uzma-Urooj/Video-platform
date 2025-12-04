# Video Platform Backend

A Node.js & Express backend for a video streaming platform with user subscription, referral rewards.

---

## Features

- User registration & login with JWT authentication  
- Subscription management with referral rewards
- video view count   
- Protected routes with middleware  
- Logout with cookie clearing  
- Error handling & validation

---

## Tech Stack

- Node.js  
- Express.js  
- MongoDB & Mongoose  
- JWT for authentication  
- bcrypt for password hashing

---

## Project Structure
video-platform/
├── app.js 
├── server.js 
├── config/
│ ├── .env # Environment variables (gitignored)
│ └── db.js # MongoDB connection logic
├── public/ # Frontend static files (optional)
├── src/
│ ├── controllers/
│ │ ├── user.controller.js
│ │ └── video.controller.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── asyncHandler.middleware.js
│ │ └── error.middleware.js
│ ├── models/
│ │ ├── user.model.js
│ │ ├── video.model.js
│ │ └── videoView.model.js
| | |__subcriptiom.model.js
│ ├── routes/
│ │ ├── user.routes.js
│ │ └── video.routes.js
│ └── utils/
│ └── errorHandler.js
├── package.json
└── README.md

## Subscription & Referral Logic

- Users cannot watch videos unless subscribed.
- Users can refer others. When a referred user subscribes, the referrer receives a reward in their wallet.
- Subscription expiration date is tracked per user.


