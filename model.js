
var apiURL = "https://games-world.herokuapp.com";

fetch(apiURL + "/games", {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function(response){
    return response.json();
}).then(function(arrayOfGames){
    //console.log("the response   ", arrayOfGames);

    var container1 = document.querySelector('.container');

    let gameElements = "";
    for(var i = 0; i < arrayOfGames.length; i++) {
       
        gameElements += `<h1>${arrayOfGames[i].title}</h1> 
                            <img src="${arrayOfGames[i].imageUrl}" />
                            <p>${arrayOfGames[i].description}</p> 
                            <button class="delete-btn" onclick="deleteGame('${arrayOfGames[i]._id}')">Delete</button>
                            <button class="edit-btn">Edit</button>
                            <div id="container2"></div>
                            `;

    }
    container1.innerHTML = gameElements;
    //punem aici  click pt button edit

    document.querySelector(".edit-btn").addEventListener("click",function(event){
        console.log("click pe edit")
       
        var x = document.getElementById("second-form");
        x.style.display = "block";
        var node=document.getElementById("container2");
        console.log("in event de click pe edit ")
      //  var x = document.getElementById("second-form");
        node.appendChild(x);    
        console.log("dupa append child");
       
  
    })

});




document.querySelector(".submitBtn").addEventListener("click", function(event){
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");


    if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
     

        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded);
    }
})

function validateFormElement(inputElement, errorMessage){
    if(inputElement.value === "") {
        if(!document.querySelector('[rel="' + inputElement.id + '"]')){
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if(document.querySelector('[rel="' + inputElement.id + '"]')){
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage){
    if(isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg){
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

function createGameRequest(gameObject){
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response){
        return response.text();
    }).then(function(createdGame){
        console.log(createdGame);
    });
}
function deleteGame(gameID) {
    //console.log("delete the game ", gameID);

    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r){
        return r.text();
    }).then(function(apiresponse){
        console.log(apiresponse);
        location.reload(true);
    });

} 