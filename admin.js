let restaurantsListContainer = document.getElementById('overviewMainRestaurantsList');
let totalRestaurantsParagraph = document.getElementById('totalRestaurantContainer');
let restaurantsArray = [];

let overviewDiv = document.getElementById('dashboardOverView');
let editDiv = document.getElementById('dashboardEdit');
let addDiv = document.getElementById('dashboardAdd');



let editRestaurantName = document.getElementById('editRestaurantName');
let editRestaurantDescription = document.getElementById('editRestaurantDescription');
let editRestaurantSpeciality = document.getElementById('editRestaurantSpeciality');
let editRestaurantPhoneNumber = document.getElementById('editRestaurantPhoneNumber');
let editRestaurantAddress = document.getElementById('editRestaurantAddress');
let editRestaurantWebsite = document.getElementById('editRestaurantWebsite');
let editRestaurantImageUrl = document.getElementById('editRestaurantImageUrl');
let oldRestaurantNameFromEdit;

let restaurantListDiv = document.getElementById('overviewMainRestaurantsList');
let addNewRestaurantDiv = document.getElementById('overviewMainAddNewRestaurant');
let editRestaurantDiv = document.getElementById('overviewMainEditRestaurant');

let goHomeBtn = document.getElementById('goToHomeBtn');
let goToAddNewRestBtn = document.getElementById('goToAddNewRestBtn');

overviewDiv.addEventListener('click', () => {

    restaurantListDiv.style.display = "flex";
    addNewRestaurantDiv.style.display = "none";
    editRestaurantDiv.style.display = "none";

});

editDiv.addEventListener('click', () => {

    restaurantListDiv.style.display = "none";
    addNewRestaurantDiv.style.display = "none";
    editRestaurantDiv.style.display = "flex";

});

addDiv.addEventListener('click', () => {

    restaurantListDiv.style.display = "none";
    editRestaurantDiv.style.display = "none";
    addNewRestaurantDiv.style.display = "flex";

});


goToAddNewRestBtn.addEventListener('click', () => {

    editRestaurantDiv.style.display = "none";
    restaurantListDiv.style.display = "none";
    addNewRestaurantDiv.style.display = "flex";

});

goHomeBtn.addEventListener('click', () => {

    window.location.href = 'index.html';

});


let invalidName = document.getElementById('invalidName');
let invalidDescription = document.getElementById('invalidDescription');
let invalidSpeciality = document.getElementById('invalidSpeciality');
let invalidPhoneNumber = document.getElementById('invalidPhoneNumber');
let invalidAddress = document.getElementById('invalidAddress');
let invalidWebsite = document.getElementById('invalidWebsite');
let invalidImageUrl = document.getElementById('invalidImageUrl');


fetch('http://localhost:3000/restaurants').then(restaurants => {
    let restaurantsData = restaurants.json();
    console.log(restaurantsData);
    return restaurantsData;
}).then((restaurantsData) => {

    restaurantsData.forEach(restaurant => {
        restaurantsArray.push(restaurant);
    });

    showRestaurantsList(restaurantsArray);

});


function showRestaurantsList(RestaurantsList) {

    restaurantsListContainer.innerHTML = '';
    let totalRestaurants = updateTotalResturant(RestaurantsList);
    totalRestaurantsParagraph.innerHTML = totalRestaurants;


    RestaurantsList.forEach(restaurant => {

        restaurantsListContainer.innerHTML += `<div class="overflowRestaurantCart">

                        <img src="${restaurant.Image}" alt="">
                        <h3 id="restaurantCartName" >${restaurant.Name}</h3>
                        <div class="overflowRestaurantCartButtons">

                            <button class="overflowRestaurantCartEditBtn">edit</button>
                            <button class="overflowRestaurantCartDeleteBtn">delete</button>

                        </div>

                    </div>`;
    })


    let editButtons = document.querySelectorAll('.overflowRestaurantCartEditBtn');
    let deleteButtons = document.querySelectorAll('.overflowRestaurantCartDeleteBtn');

    editButtons.forEach(editButton => {
        editButton.addEventListener("click", () => {
            let RName = editButton.closest('.overflowRestaurantCart').querySelector('#restaurantCartName').innerText;
            oldRestaurantNameFromEdit = RName;
            editRestaurant(RName);
        });
    });

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener("click", () => {
            let RName = deleteButton.closest('.overflowRestaurantCart').querySelector('#restaurantCartName').innerText;
            deleteRestaurant(RName);
        });
    });

}

function editRestaurant(restaurantName) {


    restaurantListDiv.style.display = "none";
    addNewRestaurantDiv.style.display = "none";
    editRestaurantDiv.style.display = "flex";

    fetch(`http://localhost:3000/restaurants/${restaurantName}`).then(Restaurant => {
        let restaurantData = Restaurant.json();
        return restaurantData;
    }).then((restaurantData) => {

        editRestaurantName.value = restaurantData.Name;
        editRestaurantDescription.value = restaurantData.Description;
        editRestaurantSpeciality.value = restaurantData.Speciality;
        editRestaurantPhoneNumber.value = restaurantData.PhoneNumber;
        editRestaurantAddress.value = restaurantData.Adresse;
        editRestaurantWebsite.value = restaurantData.Website;
        editRestaurantImageUrl.value = restaurantData.Image;

    });

}


function deleteRestaurant(restaurantName) {

    fetch(`http://localhost:3000/restaurants/${restaurantName}`, {
        method: 'DELETE',
    }).then(response => {

        if (response.status === 204) {
            alert(`The Restaurant ${restaurantName} has been successfully  deleted`)
            restaurantsArray = restaurantsArray.filter(resturant => resturant.Name !== restaurantName);
            showRestaurantsList(restaurantsArray);
        } else {
            alert(`Restaurant not found or could not be deleted.`)

        }

    }).catch(error => {

        console.error('Error', error);
        alert('There was an error while deleting the restaurant.');

    });



}


function updateTotalResturant(resturantsArray) {

    let numberOfRestaurants = resturantsArray.length;

    return numberOfRestaurants;

}


function AddNewRestaurant() {

    let restaurantName = document.getElementById('addNewRestaurantName').value;
    let restaurantDescription = document.getElementById('addNewRestaurantDescription').value;
    let restaurantSpeciality = document.getElementById('addNewRestaurantSpeciality').value;
    let restaurantPhoneNumber = document.getElementById('addNewRestaurantPhoneNumber').value;
    let restaurantAddress = document.getElementById('addNewRestaurantAddress').value;
    let restaurantWebsite = document.getElementById('addNewRestaurantWebsite').value;
    let restaurantImageUrl = document.getElementById('addNewRestaurantImageUrl').value;

    if (restaurantName.trim() === '') {
        invalidName.style.display = 'block';
        invalidName.innerHTML = 'Please Fill The Name'
    } else if (restaurantDescription.trim() === '') {

        invalidDescription.style.display = 'block';
        invalidDescription.innerHTML = 'Please Fill The Description'

    } else if (restaurantSpeciality.trim() === '') {

        invalidSpeciality.style.display = 'block';
        invalidSpeciality.innerHTML = 'Please Fill The Description'

    } else if (restaurantPhoneNumber.trim() === '') {

        invalidPhoneNumber.style.display = 'block';
        invalidPhoneNumber.innerHTML = 'Please Fill The Description'

    } else if (restaurantAddress.trim() === '') {

        invalidAddress.style.display = 'block';
        invalidAddress.innerHTML = 'Please Fill The Description'

    } else if (restaurantWebsite.trim() === '') {

        invalidWebsite.style.display = 'block';
        invalidWebsite.innerHTML = 'Please Fill The Description'

    } else if (restaurantImageUrl.trim() === '') {

        invalidImageUrl.style.display = 'block';
        invalidImageUrl.innerHTML = 'Please Fill The Description'

    } else {

        invalidName.style.display = 'none';
        invalidDescription.style.display = 'none';
        invalidSpeciality.style.display = 'none';
        invalidPhoneNumber.style.display = 'none';
        invalidAddress.style.display = 'none';
        invalidWebsite.style.display = 'none';
        invalidImageUrl.style.display = 'none';

        let newRestaurant = {
            Name: restaurantName,
            Description: restaurantDescription,
            Adresse: restaurantAddress,
            Speciality: restaurantSpeciality,
            Rating: 3,
            Reviews: [],
            Website: restaurantWebsite,
            PhoneNumber: restaurantPhoneNumber,
            Image: restaurantImageUrl
        }

        restaurantsArray.push(newRestaurant);
        console.log(restaurantsArray);

        fetch('http://localhost:3000/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant)
        })
            .then(response => response.json())
            .then(data => {
                console.log('The Restaurant Has been Successfully Added', data);
            })
            .catch(error => {
                console.error('Error', error);
            });

    }

}

function newRestaurantValue() {

    
    

    let neweditRestaurantName = editRestaurantName.value;
    let neweditRestaurantDescription = editRestaurantDescription.value;
    let neweditRestaurantSpeciality = editRestaurantSpeciality.value;
    let neweditRestaurantPhoneNumber = editRestaurantPhoneNumber.value;
    let neweditRestaurantAddress = editRestaurantAddress.value;
    let neweditRestaurantWebsite = editRestaurantWebsite.value;
    let neweditRestaurantImageUrl = editRestaurantImageUrl.value;



    let updateRestaurant = {
        Name: neweditRestaurantName,
        Description: neweditRestaurantDescription,
        Adresse: neweditRestaurantAddress,
        Speciality: neweditRestaurantSpeciality,
        Website: neweditRestaurantWebsite,
        PhoneNumber: neweditRestaurantPhoneNumber,
        Image: neweditRestaurantImageUrl
    }

    fetch(`http://localhost:3000/restaurants/${oldRestaurantNameFromEdit}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateRestaurant)
    })
        .then(response => response.json())
        .then(data => {
            console.log('The Restaurant Has been Successfully Updated', data);
        })
        .catch(error => {
            console.error('Error', error);
        });


}