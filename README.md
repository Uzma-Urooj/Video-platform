# Video Platform Backend

A Node.js & Express backend for a video streaming platform with user subscription, referral rewards, and video analytics.

---

## Features

- User registration & login with JWT authentication  
- Subscription management with referral rewards    
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
src/
├── controllers/
│ ├── user.controller.js
│ └── video.controller.js
├── middlewares/
│ ├── auth.middleware.js
│ ├── asyncHandler.js
│ └── errorMiddleware.js
├── models/
│ ├── user.model.js
│ └── video.model.js
├── routes/
│ ├── user.routes.js
│ └── video.routes.js
app.js
server.js 


