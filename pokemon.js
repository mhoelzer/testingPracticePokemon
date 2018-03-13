//DOM ELEMENTS
const tHead = document.getElementById("tHead");
const tBody = document.getElementById("tBody");
const searchPoke = document.getElementById("searchPoke");

///API VARIABLES
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;

function searchPokemon() {
    let pokeName = searchPoke.value; 
    if(pokeName.trim() == "") {
        alert("Enter a pokemon!"); 
    } else {
        //fetch and display results
    }
}