import '../css/style.css';
import '../css/snackbar.css';
import { getItems } from './items.js';
import { getData } from './testdata.js';
import { getUsers, addUser, getId} from './users.js';

document.querySelector('#app').innerHTML = 'Moi tässä oman APIn harjoituksia';

console.log('Hello world! Scripts begin.');

/* getData(); */

//haetaan get_id nappi ja tehdään rajapintahaku
const addIdForm = document.querySelector('.idformpost');
addIdForm.addEventListener('click', getId);

//haetaan GET all items nappi ja tehdään rajapintahaku
const getItemBtn = document.querySelector('.get_items');
getItemBtn.addEventListener('click', getItems);
//getItems();

//haetaan GET all users nappi ja tehdään rajapintahaku
const getUserBtn = document.querySelector('.get_users');
getUserBtn.addEventListener('click', getUsers);

//haetaan form ja tehdään rajapintahaku
const addUserForm = document.querySelector('.formpost');
addUserForm.addEventListener('click', addUser);