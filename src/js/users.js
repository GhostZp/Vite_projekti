import { fetchData } from "./fetch.js";

// TODO 
//tee tänne function joka hakee yksittäisen userin tiedot
//käytä tähän reittiä 
// GET http://127.0.0.1:3000/api/users/2

const getId = async (event) => {
    event.preventDefault();
    const userid = document.querySelector('#userid').value.trim();
    if (!userid) {
        alert('User ID cannot be empty.');
        return;
    }

    const url = `http://localhost:3000/api/users/${userid}`;

    const options = {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
    };

    try {
        const response = await fetchData(url, options);

        if (response.error) {
            alert('Tapahtui virhe fetch haussa.');
            console.log(response.error);
            return;
        }

        if (response.message) {
            alert(response.message);
        }

        console.log(response);
    } catch (error) {
        console.error('Error fetching user:', error);
    }

    document.querySelector('.idform').reset(); // tyhjennetään formi
};


const getUsers = async () => {

    const url = 'http://localhost:3000/api/users';
    const users = await fetchData(url);

    if (users.error) {
        console.log('Tapahtui virhe fetch haussa.');
        return;
    }

    console.log(users);
    renderUsersTable(users);
};

const renderUsersTable = (users) => {
    const tableBody = document.querySelector('#taulukko');
    tableBody.innerHTML = ''; //tyhjennetään taulukko

    users.forEach((user) => {
        const row = document.createElement('tr');
    
        row.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td><button class="check" data-id="${user.id}">Info</button></td>
          <td><button class="del" data-id="${user.id}">Delete</button></td>
          <td>${user.id}</td>
        `;
    
        tableBody.appendChild(row);
    });

};


const addUser = async (event) => {
    event.preventDefault();

    // POST
    //content-type: application/json

    //haetaan formista oikea tieto mikä on käytetty
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    const email = document.querySelector('#email').value.trim();
    
/*     const bodyData = {
    "username": "Sitruuna",
    "password": "Peruna",
    "email": "Sitruuna.Peruna@mailmail.com"
    }; */

    const bodyData = {
        "username": username,
        "password": password,
        "email": email,
        };

    // url
    const url = 'http://localhost:3000/api/users';

    // options eli mikä method, headers ja JSON
    const options = {
        body: JSON.stringify(bodyData),
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
      };
      console.log(options);
    
      const response = await fetchData(url, options);

    if (response.error) {
        alert('Tapahtui virhe fetch haussa.');
        console.log(response.error);
        return;
    }

    if (response.message) {
        alert(response.message);
    }

    console.log(response);
    document.querySelector('.addform').reset(); //tyhjennetään formi
    getUsers();

};


export {getUsers, addUser, getId};