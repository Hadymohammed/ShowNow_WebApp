
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

    //update reviews
    console.log(data.id);
    updateReviews(data.id);
}


function getInput(){
    const movie=document.getElementById('movieInput').value;
    return encodeURIComponent(movie);
}

//update reviews
async function updateReviews(id){
    
    //GET reviews
    let reviewsRes=await fetch(`reviews/${id}`);
    let reviews=await reviewsRes.json();
    console.log(reviews);

    let reviewList=document.getElementById('reviewList');
    reviewList.innerText="";
    for(const review of reviews.results){
        let autherName=review.author;
        let userName=review.author_details.username;
        let photoPath=review.author_details.avatar_path;

        if(photoPath!=null&&photoPath.slice(0,6)=="/https")photoPath=photoPath.slice(1,photoPath.length);
        else photoPath="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
        console.log(photoPath);
        let content=review.content;
        let date=review.created_at;

        let reviewBox=document.createElement('li');
        reviewBox.className='reviewBox';
        reviewBox.innerHTML=`
         <div class="reviewDetails">
        <div class="reviewAutherData">
            <div class="autherPhoto">
                <img src="${photoPath}" alt="">
            </div>
            <div class="auther">
                <div class="autherName">${autherName}</div>
                <div class="autherHandle">@${userName}</div>
            </div>
        </div>
        <div class="reviewDate">${date.slice(0,10)}</div>
    </div>
    <div class="reviewContent">
        ${content};
    </div>`;
        reviewList.appendChild(reviewBox);
    }
}

//get movie data requst
async function getServerData(movie){
    let data=await fetch(`all/${movie}`);
    let dataJson=await data.json();
    if(dataJson.status!="404"){
    updateContent(dataJson);}
    else alert("Error");
   
    console.log(dataJson);
}
//show input details
function showNow(){
    getServerData(getInput());
}
//searchClickEvent
function createClickListener(){
    const searchBtn=document.getElementById('showBtn');
    searchBtn.addEventListener('click',showNow);
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
//run onload
function runMainFunctions(){
    createClickListener();
    const movies=["fight club","Cast away","12 angry men","The Shawshank Redemption"," Forrest Gump","The Matrix"];
    let i=getRndInteger(0,6);
    getServerData(encodeURIComponent(movies[i]));
}