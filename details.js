const urlParams = new URLSearchParams(window.location.search);
const RestaurantName = urlParams.get('name');
const RestaurantRating = urlParams.get('rating');

fetch(`http://localhost:3000/restaurants/${RestaurantName}`).then(Restaurant =>{
    let restaurantData = Restaurant.json();
    return restaurantData;
}).then((restaurantData) => {

    let resturantDetailsContainer =document.getElementById('restaurantDetail');
    resturantDetailsContainer.innerHTML = ` <div class="RestaurantMainImage">

                <img src="${restaurantData.Image}" alt="">
                <div class="ButtonsContainer">

                    <button id="websiteBtn" onclick="GoToWebsite('${restaurantData.Website}')">Website</button>
                    <button id="callBtn" onclick="Call('${restaurantData.PhoneNumber}')">Call</button>
                </div>


            </div>

            <div class="RestaurantMainTexts">

                <h1>${restaurantData.Name}</h1>
                <div class="RatingDiv">

                    <div class="restauSpeciality">
                        <p>${restaurantData.Speciality}</p>
                    </div>

                    <div>

                        <h3>${RestaurantRating}</h3>
                        <img src="img/star.png" alt="">
                    </div>

                    <div class="hrVertical">

                    </div>
                    <div>
                        <p><span>${restaurantData.Reviews.length}</span> Reviews</p>
                    </div>

                </div>

                <div class="addressDiv">

                    <p>${restaurantData.Adresse}</p>

                </div>

                <div class="descriptionDiv">

                    <h3>Description</h3>
                    <p>${restaurantData.Description}</p>

                </div>

            </div>`;

    


})


function GoToWebsite(websiteUrl){
    window.open(websiteUrl, '_blank');
}

function Call(PhoneNumber){
    alert(PhoneNumber)
}


