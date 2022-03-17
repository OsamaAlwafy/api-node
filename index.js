const express=require("express");
const app=express();
//app.use(express.urlencoded)
const fetch=require("node-fetch");

app.set("view engine","ejs");
app.use(express.urlencoded());
app.use(express.static("./public/css"));
app.use(express.static("./public/js"));
app.use(express.static("./public/fonts"));
app.use(express.static("./public/images"));


app.get("/",(req,res)=>
{
    console.log();
    fetch('https://dummyjson.com/products/')
  .then(response => response.json())
  .then(data => {
    fetch("https://dummyjson.com/products/categories")
.then(response => response.json())
   .then(catigory => {
    console.log(data.products.length);

    res.render("index",{products :data.products,data:catigory});
   // res.end();
   })
  })

   
  
});

app.get("/details/:id?",(req,res)=>
{
   
    
    console.log();
    
    fetch("https://dummyjson.com/products/"+req.params.id)
  .then(response => response.json())
  .then(data => {
    console.log("data details");
    console.log(data.images.length);
    console.log(data);
    res.render("details",{products :data});
   res.end();
  })

});


app.post("/search",(req,res)=>
{
   
    
    console.log("yes "+req.body.nameProduct);
    
    fetch('https://dummyjson.com/products/search?q='+req.body.nameProduct)
   .then(response => response.json())
   .then(datas => {
   console.log("data serach");
  //  console.log(data);
    console.log(datas);
    res.render("search",{data:datas.products});
   res.end();
  });
  

})
// app.get("/catigory",(req,res)=>{
// fetch("https://dummyjson.com/products/categories")
// .then(response => response.json())
//    .then(datas => {
//    console.log("Catigory");
//   //  console.log(data);
//     console.log(datas.length);
//     res.render("index",{data:datas});
//   res.end();
//    });
// })

app.listen("3000");
