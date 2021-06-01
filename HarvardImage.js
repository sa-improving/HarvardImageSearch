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
        if(data.info.next !== null){
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
        let next = data.info.next;
        let previous = data.info.prev;
        if(direction === "next"){
            if(next !== undefined){
                imageContainer.textContent = ""
                produceImages(data);
                urlNext = next;
            }
            if(previous !== undefined){
                urlPrevious = previous; 
            }
        }else{
            if(previous !== undefined){
                imageContainer.textContent = ""
                produceImages(data);
                urlPrevious = previous;
            }
            if(previous !== undefined){
                urlNext = next; 
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

next.addEventListener('click', (currentPage) =>{
    paging(urlNext, "next")
})

previous.addEventListener('click', (currentPage) =>{
    paging(urlPrevious, "previous");
})