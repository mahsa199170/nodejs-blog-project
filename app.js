const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes")

const app = express()

//connect to mongodb
const dbURI = "mongodb+srv://<username>:<password>@cluster-name.rxck7um.mongodb.net/nodepractice?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result)=> app.listen(3000))
    .catch((err)=> console.log(err))
// registr view engine
app.set("view engine", "ejs");



// middlware & static files
app.use(express.static("public"));
app.use(express.urlencoded({extended: true})); //this middleware which is going to pass the data we sent into a workable format that we can use and attach it to the req so that we can use req.body

app.use(morgan("dev"));

//mongoose and mongo sandbox routes

app.get("/add-blog", (req,res)=> {
    //create new instance of blog and save it into the blogs collection in database
    const blog = new Blog({
        title: "new blog2",
        snippet: "about my new blog",
        body: "more about my new blog"
    });

    blog.save()
        .then((result)=>{
            res.send(result)

        })
        .catch((err)=>{
            console.log(err)
        })
})

//retrieve blogs from the the collection in our database

app.get("/all-blogs",(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})
//retrieve a single block from blogs collection
app.get("/single-blog", (req, res)=>{
    Blog.findById("641cc9ffe5ad48add2aad906")
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })

})
// app.use((req,res,next)=>{
//     console.log("new request made:");
//     console.log("host:", req.hostname);
//     console.log("path:",req.path);
//     console.log("method:" ,req.method);
//     next();

// });


// app.use((req,res,next)=>{
//     console.log("in teh next middleware");
//     next();

// });

// basic routes:

app.get("/", (req,res)=> {
    // res.send('<p>hwllo</p>')
    // res.sendFile("./views/index.html", {root: __dirname});

    res.redirect("/blogs");
    // const blogs = [
    //     {title: "luna finds bone", snippet:"vfcnhbgvfcbgvfcgvfcgvfcd"},
    //     {title: "ellie finds egg", snippet:"vfcnhbgvfcbgvfcgvfcgvfcd"},
    //     {title: "aabi finds toy", snippet:"vfcnhbgvfcbgvfcgvfcgvfcd"},
    // ];
    // res.render("index", {title: "home", blogs: blogs});
    //as blogs:blogs are the same name we can just write blog:
    // res.render("index", {title: "home", blogs});
});


app.get("/about", (req,res)=> {
    // res.send('<p>about</p>')
    // res.sendFile("./views/about.html", {root: __dirname})
    res.render("about",{title: "about"})

});

////////////////////
// REDIRECT

// app.get("/about-us", (req,res)=>{
//     res.redirect("/about")
// })


//blog routes

app.use("/blogs",blogRoutes);

///////////////////////
// 404
// use is for create middleware
app.use((req, res)=> {
    // res.status(404).sendFile("./views/404.html", {root: __dirname})
    res.status(404).render("404",{title: "404"})

})


