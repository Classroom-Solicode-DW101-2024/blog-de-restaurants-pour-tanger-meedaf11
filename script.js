let restaurantsArray = [];
let restaurantsCartsContainers = document.getElementById("RestaurantsCartsContainer");

fetch('http://localhost:3000/restaurants').then(restaurants => {
    let restaurantsData = restaurants.json();
    console.log(restaurantsData);
    return restaurantsData;
}).then((restaurantsData) => {

    restaurantsData.forEach(restaurant => {
        restaurantsArray.push(restaurant);
    });

    console.log(restaurantsArray);
    showData(" ", " ");


});

function showData(filter, search) {

    restaurantsCartsContainers.innerHTML = '';
    restaurantsArray.forEach(restaurant => {


        let finalRating;
        let rating = 0;
        for (let i = 0; i < restaurant.Reviews.length; i++) {

            rating += restaurant.Reviews[i].Rating;

        }

        if (rating === 0) {
            finalRating = 'No Rating'
        } else {

            finalRating = rating / restaurant.Reviews.length;
        }

        let restaurantCart = document.createElement('div');
        restaurantCart.className = 'restaurantsCart';

        if (filter.trim() === '' && search.trim() === '') {
            restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
            restaurantsCartsContainers.appendChild(restaurantCart);
        } else {

            if (filter.trim() === 'Name' && search.trim().toLowerCase() === restaurant.Name.trim().toLowerCase()) {
                console.log('Matched Restaurant:', restaurant.Name);
                restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
                restaurantsCartsContainers.appendChild(restaurantCart);
            }
        }







        restaurantCart.addEventListener('click', () => {
            window.location.href = `restaurant.html?name=${encodeURIComponent(restaurant.Name)}&rating=${encodeURIComponent(finalRating)}`;
        });

        if (rating === 0) {
            rateTxt = document.getElementById('finalRateText');
            rateTxt.style.fontSize = "10px";
        }



    });
}


function showData(filter, search) {
    restaurantsCartsContainers.innerHTML = '';
    restaurantsArray.forEach(restaurant => {


        let finalRating;
        let rating = 0;
        for (let i = 0; i < restaurant.Reviews.length; i++) {
            rating += restaurant.Reviews[i].Rating;
        }

        if (rating === 0) {
            finalRating = 'No Rating';
        } else {
            finalRating = (rating / restaurant.Reviews.length).toFixed(2);
        }

        let restaurantCart = document.createElement('div');
        restaurantCart.className = 'restaurantsCart';

        if (filter.trim() === '' && search.trim() === '') {
            restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
            restaurantsCartsContainers.appendChild(restaurantCart);
        } else {

            if(filter.trim() === 'KeyWord' && restaurant.Name.trim().toLowerCase().includes(search.trim().toLowerCase())){

                console.log('Matched Restaurant:', restaurant.Name);
                restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
                restaurantsCartsContainers.appendChild(restaurantCart);

            }else if (filter.trim() === 'Name' && search.trim().toLowerCase() === restaurant.Name.trim().toLowerCase()) {

                console.log('Matched Restaurant:', restaurant.Name);
                restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
                restaurantsCartsContainers.appendChild(restaurantCart);

            } else if (filter.trim() === 'Speciality' && restaurant.Speciality.trim().toLowerCase().includes(search.trim().toLowerCase())) {

                console.log('Matched Restaurant:', restaurant.Speciality);
                restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
                restaurantsCartsContainers.appendChild(restaurantCart);

            }else if (filter.trim() === 'Rating') {
                if(finalRating >= search){
                    restaurantCart = FillDiv(restaurantCart, restaurant, finalRating);
                restaurantsCartsContainers.appendChild(restaurantCart);
                }
            }
        }


        restaurantCart.addEventListener('click', () => {
            window.location.href = `restaurant.html?name=${encodeURIComponent(restaurant.Name)}&rating=${encodeURIComponent(finalRating)}`;
        });

        if (rating === 0) {
            let rateTxt = document.getElementById('finalRateText');
            if (rateTxt) {
                rateTxt.style.fontSize = "10px";
            }
        }

    });
}


function FillDiv(cart, restaurant, finalRating) {

    cart.innerHTML += `

        <div class="RestuContainerTextsParents">
    
                <img src="${restaurant.Image}" alt="Resturant Image">
    
                <div class="RestuContainerTextsParents">
                    <h3>${restaurant.Name}</h3>
                    <p>${restaurant.Speciality}</p>
    
    
                    <hr class="line">
    
                    <class class="reviewsContainer">
    
                        <div class="ratingContainer">
    
                            <div>
                                <h3 id="finalRateText">${finalRating}</h3>
                                <img src="img/star.png" alt="">
    
                                <div class="hrHorizontal"></div>
                            </div>
    
    
                        </div>
    
                        <p><span>${restaurant.Reviews.length}</span> Reviews</p>
    
                    </class>
    
                    <hr class="line">
    
                    <div class="AddressContainer">
    
                        <p>${restaurant.Adresse}</p>
    
                    </div>
    
                </div>
    
    
            `;


    return cart;
}


function Search() {

    let filterBy = document.getElementById('filtreSearch').value;
    let searchFor = document.getElementById('searchBar').value;

    if (filterBy.trim() === '') {
        alert("Please Fill the Filter");
        return;
    } else if (searchFor.trim() === '') {
        alert("Please Fill the Search Bar");
        return;
    }

    if (filterBy.trim() === 'Rating' && !Number(searchFor.trim())) {

        alert('Rating should be A Number like 3.5 , 4 .... Please Fix it');
        return
    }

    alert(filterBy + ' ' + searchFor);

    showData(filterBy, searchFor);


}



