const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
var items = ["buy food","cook food","eat food"];
var workList = [];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", (req, res) => {

    var today = new Date();
    var day = " ";

    var option = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year:"numeric"
    }
    var day = today.toLocaleDateString("hi-IN", option);
    res.render('list', {
        listTitle: day,
        newListItems: items
    });
})

app.post("/", (req, res) => {
    var item = req.body.num1;
    console.log(item);
    if (req.body.list === "work") {
        workList.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/");
    }

})

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "work list", newListItems: workList })
})
app.post("/work", (req, res) => {
    let item = req.body.num1;
    workList.push(item);
    res.redirect("/");
})

app.listen(3000, () => {
    console.log("server is running at 3000 port ");
})