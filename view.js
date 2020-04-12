
getGamesList(function(arrayOfGames){
    for(var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj){
    var container1 = document.querySelector('.container');
    const gameELement = document.createElement("div");
    gameELement.className = "game-box";
    gameELement.setAttribute("id", gameObj._id)

    // const editForm = document.getElementById("updateForm");
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn" id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" id="${gameObj._id}">Edit Game</button>`;    

    const updatedGameElement = document.createElement('div');
    updatedGameElement.innerHTML = `<form id="updateForm">
                                        <label for="gameTitle">Title *</label>
                                        <input type="text"  name="gameTitle" id="gameTitle" value = "${gameObj.title}"/>

                                        <label for="gameDescription">Description</label>
                                        <textarea name="gameDescription" id="gameDescription">"${gameObj.description}"</textarea>

                                        <label for="gameImageUrl">Image URL *</label>
                                        <input type="text" name="gameImageUrl" id="gameImageUrl" value = "${gameObj.imageUrl}"/>

                                        <button class="save-btn">Save Changes</button>
                                        <button class="cancel-btn">Cancel</button>
                                    </form> `



    // gameELement.appendChild(editForm);
    container1.appendChild(gameELement);
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event){
        if(event.target.classList.contains("delete-btn")){
            deleteGame(event.target.getAttribute("id"), function(apiResponse){
                    console.log(apiResponse);
                    removeDeletedElementFromDOM(event.target.parentElement);})
        } else if(event.target.classList.contains("update-btn")){
            gameELement.appendChild(updatedGameElement);
        }
    });
}

function removeDeletedElementFromDOM(domElement){
    domElement.remove();
}







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

        createGameRequest(urlencoded, createDomElement);
    }
})

// document.querySelector(".updateBtn").addEventListener("click", function(event){
//     event.preventDefault();

    

// })
