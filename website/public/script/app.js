const { count } = require("console");


function updateContent(data){
    //update Poster
    let poster=document.getElementById('posterDiv');
    let posterPath=data.poster_path;
    poster.src=`https://image.tmdb.org/t/p/original/${posterPath}`;

    //update movie name
    let movieName=document.getElementById('movieName');
    movieName.innerHTML=data.original_title;

    //update movie rate
    let rate=document.getElementById('rate');
    rate.innerHTML=data.vote_average;

    //update movie release_date
    let Date=document.getElementById('date');
    Date.innerHTML=data.release_date;
    
    //update movie Country
    let countryDiv=document.getElementById('country');
    let countries=data.production_countries;
    let countriesString="";
    let i=0;
    
    for (const country of countries) {
        if(i==0){
            countriesString+=country.iso_3166_1;
        }
        else{
            countriesString+=` , ${country.iso_3166_1}`;
        }
        i++;
    }
    console.log(countriesString);
    console.log(countries);
    countryDiv.innerHTML=countriesString;

    //update movie time
    let timeDiv=document.getElementById('time');
    let timeData=data.runtime;
    timeDiv.innerHTML=`${timeData} minutes`;

    //update Overview
    let overviewDiv=document.getElementById('overviewContent');
    let overviewData=data.overview;
    overviewDiv.innerHTML=overviewData;
}
function getInput(){
    const movie=document.getElementById('movieInput').value;
    return encodeURIComponent(movie);
}
async function getServerData(){
    let movie=getInput();
    let data=await fetch(`all/${movie}`);
    let dataJson=await data.json();
    if(dataJson.status!="404"){
    updateContent(dataJson);}
    else alert("Error");
   
    console.log(dataJson);
}
//searchClickEvent
function createClickListener(){
    const searchBtn=document.getElementById('showBtn');
    searchBtn.addEventListener('click',getServerData);
}

//run onload
function runMainFunctions(){
    createClickListener();
}