//DOM ELEMENTS
const tHead = document.getElementById("tHead");
const tBody = document.getElementById("tBody");
const searchPoke = document.getElementById("searchPoke");

///API VARIABLES
const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;

// CHECKBOXES
let checks = [];


function searchPokemon() {
    let pokeName = searchPoke.value; 
    if(pokeName.trim() == "") {
        alert("Enter a pokemon!"); 
    } else {
    	url = baseURL + pokeName.toLowerCase(); //if the pokemon's name is in capital letters, the search will be returned as undefined
    	fetch(url)
	    	.then(response => { //response is the promise that we create to represent the data from the API
	        	return response.json()
	    	}).then(data => {
	        	fillTable(data);
	    	})
	}
}
function fillTable(pokeObj) { //the data is passed into the display function as pokeObj
    while (tHead.firstChild) {
        tHead.removeChild(tHead.firstChild);
    }
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    if (checks.length == 0) {
        alert("Please select at least one option");
    } else {
        tHead.innerHTML = '<tr><td><b>'+ "Pokémon:" + '</b></td><td><b>' + 
            capFirstName(pokeObj.name) + '</b></td></tr>';
        if (checks.includes("id")) {
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "PokéDex ID #:" + '</td><td>' + 
                pokeObj.id + '</td></tr>');
        }
        if (checks.includes("types")) {
            switch (pokeObj.types.length){
                case 2:
                    tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Types" + '</td><td>' +
                        capFirstName(pokeObj.types[1].type.name) + "/" + 
                        capFirstName(pokeObj.types[0].type.name) + '</td></tr>');
                    break;
                case 1:
                    tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Type" + '</td><td>' +
                        capFirstName(pokeObj.types[0].type.name) + '</td></tr>');
                    break;
                default:
                    break;
            }
        }
        if (checks.includes("sprites")) {
            tBody.insertAdjacentHTML("beforeend", '<tr><td>'+ "Sprites:" + '</td><td>' + 
                `<img src=${pokeObj.sprites.front_default} />` +
                `<img src=${pokeObj.sprites.back_default} />` + '</td></tr>');
        }
    }
}
function capFirstName(x) {
    for (let j in x) {
        if (j == 0) {
            x = x.replace(x[j], x[j].toUpperCase());
        }
        if (x[j-1] == "-") {
            x = x.replace(x[j], x[j].toUpperCase());
            x = x.replace(x[j-1], " ");
        }
    }
    return x;
}
function checkBoxes(box) {
    if (box.checked) {
        checks.push(box.id);
    } else {
        if (checks.includes(box.id)) {
            checks.splice(checks.indexOf(box.id), 1);
        }
    }
}