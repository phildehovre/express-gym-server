const express = require('express')
const membershipRoutes = require('./routes/membershipRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const locationRoutes = require('./routes/locationRoutes.js') 
const app = express()
const connectDB = require('./db.js')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/authMiddleware.js')

app.use(cors({ 
    origin: process.env.CLIENT_URL,
    // Important for CORS requests in order to allow cookies to be sent
    credentials: true, 
}));
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/membership', requireAuth, membershipRoutes)
app.use('/location', locationRoutes)
app.use('/protected', requireAuth, (req, res) => {
    res.send('This route is good to go')
})
app.use(authRoutes)


connectDB().then(() => {
    app.listen('8080', () => console.log("Server is running on port 8080"))
}).catch((err) => {
    console.error(err)
});
