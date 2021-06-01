const input = document.querySelector("#query");
const imageContainer = document.querySelector("#imageGrid");
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
let urlNext;
let urlPrevious;

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
        if(data.info.next !== undefined){
            urlNext = data.info.next;
        } else {
            urlNext = apiEndpointBaseUrl;
        }
    })
}

function paging(url, direction){
    let apiEndpointBaseUrl = url;
    fetch(apiEndpointBaseUrl)
    .then((repsonse) => {
        return repsonse.json();
    })
    .then((data) => {
        console.log(data);
        let fetchNext = data.info.next;
        let fetchPrevious = data.info.prev;
        if(direction === "next"){
            if(fetchNext !== undefined){
                imageContainer.textContent = ""
                produceImages(data);
                urlNext = fetchNext;
            }
            if(fetchPrevious !== undefined){
                urlPrevious = fetchPrevious; 
            }
        }else if(direction === "previous"){
            if(fetchPrevious !== undefined){
                imageContainer.textContent = ""
                produceImages(data);
                urlPrevious = fetchPrevious;
            } else {
                imageContainer.textContent = ""
                produceImages(data);
            }
            if(fetchNext !== undefined){
                urlNext = fetchNext; 
            }
        }
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

next.addEventListener('click', () =>{
    paging(urlNext, "next")
})

previous.addEventListener('click', () =>{
    paging(urlPrevious, "previous");
})