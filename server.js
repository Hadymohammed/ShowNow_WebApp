let projectData=[];
const apiKey="55e285f37d1ce18064e68d0c2941e492";

// import needed modules
const http =require('http');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const fetch=require('node-fetch');

// create an instance of app
const app=express();
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initializing the main project folder 
app.use(express.static('website'));

const port=8000;
app.listen(port,(req,res)=>{
    console.log(`server running in port : ${port}`);
});

//Initializing GET route
app.get('/all/:movie',async (req,res)=>{
    const movie=req.params.movie;//get movie name from client side
    console.log(`request with movie : ${movie} from server`);

    const baseURLbyName=`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    const fetchedData=await fetch(baseURLbyName);
    const json = await fetchedData.json();
    if(json.results.length==0){
        res.json({
            "status":"404",
        });
    }
    else{
    //get main data collection using movie id
    const movieID=json.results[0].id;
    const urlById=`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`;
    const mainData=await fetch(urlById);
    const mainDataJson=await mainData.json();
    res.json(mainDataJson);}
});
app.get('/reviews/:id',async (req,res)=>{
    const id=req.params.id;
    const url=`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${apiKey}`;
    const data=await fetch(url);
    const dataJson=await data.json();
    console.log(dataJson);
    res.json(dataJson);
})