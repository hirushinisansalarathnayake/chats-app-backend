

# Chat App Backend (NestJS)

This is the backend for my real-time chat application. It is built using **NestJS**, **MongoDB (Mongoose)**, and **Socket.io**, and serves as the core API and realtime engine for the chat system.

The backend provides authentication, chat creation, message storage, message editing, message deletion, media uploads, and WebSocket events for real-time updates.
It works together with the Next.js frontend to create a smooth WhatsApp-like chat experience.



## Getting Started

### 1. Install dependencies

After cloning or downloading the project, run:

```
npm install
```

or

```
yarn install
```

### 2. Environment variables

Create a `.env` file in the project root with:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key
```

You may add more variables if needed (file upload path, CORS config, etc.).

### 3. Start the backend server

Development mode:

```
npm run start:dev
```

Production build:

```
npm run build
npm run start:prod
```

The API will start on:

```
http://localhost:3000
```

Socket.io will also run on the same port:

```
ws://localhost:3000/socket.io
```

---

## Technologies Used

**NestJS** – Backend framework
**MongoDB + Mongoose** – Database
**Socket.io Gateway** – Realtime messaging
**JWT Authentication** – Secure login
**Multer** – Media uploads
**bcrypt** – Password hashing



## Project Structure

```
src/
  auth/
  users/
  chats/
  messages/
  core/
    guards/
    decorators/
  infrastructure/
    storage/

main.ts
app.module.ts
```



## API Features

### Authentication

* Register
* Login (JWT based)
* Secure protected routes

### User Module

* Get all users
* Track online/offline users
* Last seen handling

### Chat Module

* Create chat between users
* Return existing chat if already created

### Messages Module

* Send encrypted messages
* Send media messages (images/files)
* Edit a message
* Delete for everyone
* Delete for me only
* Mark message delivered
* Mark message seen

### WebSocket (Real-time)

* Receive messages instantly
* Typing indicators
* Seen status updates
* Message edited
* Message deleted
* User online/offline notifications
* Room joining per chat



## Socket.io Events (Used by frontend)

### Incoming from client

```
joinChat
sendEncryptedMessage
sendMedia
editMessage
deleteMessage
typing
stopTyping
messageDelivered
messageSeen
```

### Outgoing to clients

```
newEncryptedMessage
newMediaMessage
messageEdited
messageDeleted
messageStatusUpdated
typing
userOnline
userOffline
```



## Assumptions

1. The frontend provides a valid **JWT token** when connecting to Socket.io.
2. A chat exists before messages can be sent.
3. Each message has a unique `_id` from MongoDB.
4. File uploads are stored locally in `/uploads`.
5. The frontend is responsible for UI formatting.



## Limitations

* No group chat support yet.
* No message forwarding.
* No message reactions.
* No end-to-end encryption (only encrypted payload, not full Signal protocol).
* File storage is local; should move to cloud storage for production.



## Example Commands

Run server:

```
npm run start:dev
```

Build:

```
npm run build
```

Start production:

```
npm run start:prod
```


