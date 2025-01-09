const express = require('express')
const memberships = require('./routes/memberships.js')
const authRoutes = require('./routes/authRoutes.js')
const app = express()
const connectDB = require('./db.js')
const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.get('/', (req, res) => {
    return res.send('Hello world')
})

app.use('/membership', memberships)
app.use(authRoutes)



connectDB().then(() => {
    app.listen('8080', () => console.log("Server is running on port 8080"))
}).catch((err) => {
    console.error(err)
});
