const input = document.querySelector("#query");
const imageContainer = document.querySelector("#imageGrid");


function imageFetch(inputQuery){
    var apiEndpointBaseUrl ="https://api.harvardartmuseums.org/image?q=" + inputQuery + "&apikey=" + HarvardAPIKey;
    fetch(apiEndpointBaseUrl)
    .then((repsonse) => {
        return repsonse.json();
    })
    .then((data) => {
        console.log(data);
        data.records.forEach(element => {
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("imageContainer")
            const image = document.createElement("img");
            image.src = element.baseimageurl;
            imageDiv.appendChild(image);
            imageContainer.appendChild(imageDiv);
        });
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