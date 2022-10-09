let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,phone,picture&nat=us';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;
    let employeeHTML = ``;
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += 
            `
            <div class="card" data-index="${index}">
                <img class="avatar" src="${picture.large}" alt="photo-of-${name}">
                <div class="text-container">
                    <h2 class="name">${name.first}</h2>
                    <p class="email">${email}</p>
                    <p class="address">${city}</p>
                </div>
            </div>
            `
    });
    gridContainer.innerHTML = employeeHTML;
}

function displayModal (index) {


}