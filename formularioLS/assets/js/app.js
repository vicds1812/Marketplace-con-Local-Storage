//variables
const listaTweets = document.getElementById('lista-tweets');

//Event Listener
eventlisteners();

function eventlisteners(){
    //
    document.querySelector('#formulario').addEventListener('submit',agregarTweet);
    // Borrar tweets
    listaTweets.addEventListener('click',borrarTweet);
    //Contenido Cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);   
}
 
//Funciones


//Añadir tweet del formulario

function agregarTweet(e){
    e.preventDefault();
    console.log('Formulario Enviado');
    //
    const tweet = document.getElementById('tweet').value; 
    // console.log(tweet);
    // boton eliminar 
    const botonBorrar = document.createElement('a');
    //
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //   
    //
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
    //
    //Añadir al Local storage
    agregarTweetLocalStorage(tweet);
}
//
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        console.log(e.target.parentElement.remove());
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }    
}
//
//Mostrar Datos Local Storage

function localStorageListo(){
    let tweets;
    //
    tweets = obtenerTweetsLocalStorage();
    //
    tweets.forEach(tweet => {
    // boton eliminar 
    const botonBorrar = document.createElement('a');
    //
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';
    //   
    //
    const li = document.createElement('li');
    li.innerText = tweet;
    li.appendChild(botonBorrar);
    listaTweets.appendChild(li);
    });
}
//
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //
    tweets.push(tweet);
    // Convertir string a Array 
    localStorage.setItem('tweets', JSON.stringify(tweets));
   
}
    //comprobar elementos en local Storage
function obtenerTweetsLocalStorage(){
    let tweets;
    //
    if(localStorage.getItem('tweets')=== null){
        tweets = [];
    }else{
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
//Eliminar tweet local Storage
function borrarTweetLocalStorage(tweet, index){
    let tweets, tweetBorrar;
    //
    tweetBorrar = tweet.substring(0, tweet.lenght - 1);
    //
    tweets = obtenerTweetsLocalStorage();
    //
    tweets.forEach(function(tweet, index){
    if(tweetBorrar === tweet){
        tweet.splice(index,1);
    }
    });
    //
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
