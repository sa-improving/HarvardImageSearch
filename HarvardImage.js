const input = document.querySelector("#query");
const imageContainer = document.querySelector("#imageGrid");

function produceImages(data){
    data.records.forEach(element => {
        const imageDiv = document.createElement("div");
        imageDiv.classList.add("imageContainer");

        const image = document.createElement("img");
        image.classList.add("art");
        image.src = element.baseimageurl;
        image.alt = element.alttext;

        const description = document.createElement("div");
        description.classList.add("description");
        description.textContent = element.description;
        if(description.textContent == ""){
            description.textContent = element.caption;
        }

        imageDiv.appendChild(image);
        imageDiv.appendChild(description);
        imageContainer.appendChild(imageDiv);
    })
}

function imageFetch(inputQuery){
    let apiEndpointBaseUrl ="https://api.harvardartmuseums.org/image?q=" + inputQuery + "&apikey=" + HarvardAPIKey;
    fetch(apiEndpointBaseUrl)
    .then((repsonse) => {
        return repsonse.json();
    })
    .then((data) => {
        console.log(data);
        produceImages(data);
    })
}

input.addEventListener('keyup', (e) => {
    if(e.keyCode === 13){
        imageContainer.textContent = "";
        console.log("Connected");
        let query = input.value;
        imageFetch(query);
    }
})

