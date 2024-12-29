let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function createAndAppendValues(result) {
    let { description, link, title } = result;

    // Create Result Item
    let resultItemEle = document.createElement("div");
    resultItemEle.classList.add("result-item");
    searchResultsEle.appendChild(resultItemEle);

    // Title Element
    let resultTitleEle = document.createElement("a");
    resultTitleEle.classList.add("result-title");
    resultTitleEle.href = link;
    resultTitleEle.textContent = title;
    resultTitleEle.target = "_blank";
    resultItemEle.appendChild(resultTitleEle);

    resultItemEle.appendChild(document.createElement("br"));

    // URL Element
    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.textContent = link;
    resultItemEle.appendChild(urlEle);

    resultItemEle.appendChild(document.createElement("br"));

    // Description Element
    let descriptionEle = document.createElement("p");
    descriptionEle.classList.add("link-description");
    descriptionEle.textContent = description;
    resultItemEle.appendChild(descriptionEle);
}

function displayResults(searchResults) {
    spinnerEle.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendValues(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        spinnerEle.classList.remove("d-none");
        searchResultsEle.textContent = "";
        let searchElement = searchInputEle.value.trim();
        if (searchElement === "") {
            spinnerEle.classList.add("d-none");
            searchResultsEle.textContent = "Please enter a valid search term.";
            return;
        }
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchElement;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((jsonData) => {
                let { search_results } = jsonData;
                displayResults(search_results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                spinnerEle.classList.add("d-none");
                searchResultsEle.textContent = "An error occurred. Please try again.";
            });
    }
}

searchInputEle.addEventListener("keydown", searchWikipedia);
