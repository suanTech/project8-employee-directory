let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,phone,picture&nat=us';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const modalArrow = document.querySelector('.modal-arrow');
const searchInput = document.querySelector('.search');
const sortButton = document.querySelector('.sort');


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = ``;
    employees
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


// modal window
gridContainer.addEventListener('click', modalLoad);
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
})
function modalLoad(e) {
    if(e.target !== gridContainer) {
        const clickedCard = e.target.closest(".card");
        let index = clickedCard.getAttribute('data-index');
        displayModal(index);
        modalSlide(index);
    }
};

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
};

function modalSlide (index) {
    modalArrow.addEventListener('click', e => {
        e = e.target;
        index = parseInt(index);
        if (index < 11 && index != 12) {
            if (e.classList.contains('right')) {
                displayModal(index += 1);
            }
        }  else {
            overlay.classList.add('hidden');
        }
        if (index < 12 && index != 0) {
            if (e.classList.contains('left')) {
                displayModal(index -= 1);
            }
        } else {
            overlay.classList.add('hidden');
        }
    })
};


// search filter
searchInput.addEventListener('input', filterByName);
function filterByName (e) {
    let input = e.target.value;
    input = input.toUpperCase();
    const names = document.querySelectorAll('.name');
    names.forEach(name => {
        if(name.textContent.toUpperCase().includes(input)){
            name.parentNode.parentNode.style.display = 'flex';
        } else {
            name.parentNode.parentNode.style.display = 'none';
        }
    })
}

// sort by name button
sortButton.addEventListener('click', () => {
    displayEmployees(employees.sort((a, b) => sortName(a,b)))
})
function sortName (a, b) {
    const nameA = a.name.first
    const nameB = b.name.first
    if(nameA < nameB) return -1;
    if(nameA > nameB) return 1;
    return 0;
}
