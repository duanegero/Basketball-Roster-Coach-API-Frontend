const axios = require('axios') //requiring axios from npm
const teamUrl = 'http://localhost:3000'; //setting variable for root URL

//creating async function 
window.login = async () => {
    const username = document.getElementById('user-login').value; //vairable to handle username
    const password = document.getElementById('user-password').value; //variable to handle password

    const user ={
        username: username,
        password: password
    }
    //if no username or password throw alert
    if(!username || !password){
        alert('Enter Username and Password');
        return;
    }

    try{
        const response = await axios.post(`${teamUrl}/login`, user); //sending post with axios

        const token = response.data.token; //taking token from response
        console.log(token) //logging for testing
        localStorage.setItem('token',token); //storing the token
        alert(`Welcome ${username}`);
        window.location.href = 'index.html';
    }
    catch(error){
        console.log('Error', error); //logging the erroe
        alert('Login failed, try again'); //alerting to try again
    }
}

window.login = login;
