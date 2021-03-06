const express = require("express");
const Article = require("./models/article")
const articleRouter = require('./routes/articles')
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const dotenv = require("dotenv");


dotenv.config();

mongoose.connect(process.env.mongo_url)
.then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));


const app = express();
const port = process.env.PORT || 5000;
app.set("port", port);
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: "desc" })
    res.render('articles/index', { articles: articles });
});

app.use('/articles', articleRouter);

app.listen(port, (req, res) => {
    console.log(`server running at port ${port}`);
})


