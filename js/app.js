let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,phone,picture&nat=us';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalArrow = document.querySelector('.modal-arrow');


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = ``;
    employees
        .sort((a, b) => filterByName(a,b))
        .forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += 
            `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="photo-of-${name}">
                <div class="text-container">
                    <h2 class="name">${name.first} ${name.last}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `
    });
    gridContainer.innerHTML = employeeHTML;
}


function displayModal (index) {
    let { name, email, phone, location:{city, street, state, postcode}, dob, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
        <img class="avatar" src="${picture.large}" alt="photo-of-${name.first}">
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr>
            <p>${phone}</p>
            <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}</p>
        </div>
    `
    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

// modal window open and close
gridContainer.addEventListener('click', e => {
    if(e.target !== gridContainer) {
        const clickedCard = e.target.closest(".card");
        let index = clickedCard.getAttribute('data-index');
        displayModal(index);
        modalSlide(index);
    }
})
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
})



// name filter function
function filterByName (a, b) {
    const nameA = a.name.first
    const nameB = b.name.first
    if(nameA < nameB) return -1;
    if(nameA > nameB) return 1;
    return 0;
}

function modalSlide (index) {
    modalArrow.addEventListener('click', e => {
        e = e.target
        if(e.classList.contains('left')) {
            index = index - 1
            if(index >= 0) {
                displayModal(index);
            } else {
                overlay.classList.add('hidden');
            }
        } 
        if(e.classList.contains('right')) {
            index = +index + 1
            if(index < 12) {
                displayModal(index)
            } else {
                overlay.classList.add('hidden')
            }
        }
    })
}