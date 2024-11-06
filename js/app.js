const axios = require('axios') //adding axios from npm
const teamUrl = 'http://localhost:3000'; //setting variable for root URL

//async function to handle find player button
window.getPlayer = async () => {

    //Get the selected radio button element
    const selectedTeamRadio = document.querySelector('input[name=team]:checked');

    //if no team selected alert user
    if (!selectedTeamRadio) {
        alert('Please Select a Team');
        return;
    }

    const selectedTeam = selectedTeamRadio.value; //assign value from radio button to variable

    const selectedPlayerId = document.getElementById('get-id').value; //getting the player id from form

    //if no player ID entered alert user
    if (!selectedPlayerId) {
        alert('Enter Player ID');
        return;
    }

    //setting variables to handle response output to page
    const playerId = document.getElementById('player-id');
    const playerName = document.getElementById('player-name');
    const playerAge = document.getElementById('player-age');
    const playerEmail = document.getElementById('player-email');
    const playerTeam = document.getElementById('player-team');

    //starting try catch
    try {
        //Sending a GET request to fetch details from API using selected player ID
        const response = await axios.get(`${teamUrl}/${selectedTeam}/${selectedPlayerId}`)

        console.log("Player found", response.data) //logging the data to console

        //Populate HTML elements with response data from API
        playerId.innerHTML = `ID: ${response.data.id}`
        playerName.innerHTML = `Name: ${response.data.first_name}`
        playerAge.innerHTML = `Age: ${response.data.age}`
        playerEmail.innerHTML = `Email: ${response.data.email}`
        playerTeam.innerHTML = `Team: ${response.data.team_name}`

        //making the element visible that contains response data
        document.getElementById('player-info-div').style.display = 'block';
    } catch (error) {
        console.log('Error', error); //catch handling any errors 
        //alert user 
        alert("Player not found. Try again");
        return;

    }
};

//async function to handle find coach button
window.getCoach = async () => {

    //Retrieving info from the input field
    const selectedCoachId = document.getElementById('get-coach-id').value;

    //if no input alert user 
    if (!selectedCoachId) {
        alert('Please Enter Coach ID');
        return;
    }

    //setting variables to handle response output to page
    const coachId = document.getElementById('coach-id');
    const coachName = document.getElementById('coach-name');
    const coachTeam = document.getElementById('coach-team');
    const coachAssistant = document.getElementById('assistant-coach');

    //starting try and catch
    try {
        //Sending a GET request to fetch details from API using selected coach ID
        const response = await axios.get(`${teamUrl}/coaches/${selectedCoachId}`);

        console.log(response.data);

        //Populate HTML elements with response data from API
        coachId.innerHTML = `ID: ${response.data.id}`;
        coachName.innerHTML = `Name: ${response.data.first_name}`;
        coachTeam.innerHTML = `Team: ${response.data.team}`;
        coachAssistant.innerHTML = `Assistant: ${response.data.assistant_coach}`

        //making the element visible that contains response data
        document.getElementById('coach-info-div').style.display = 'block';
    } catch (error) {
        console.log('Error', error); //console log any errors
        alert('Coach not found. Try again');
        return;

    }
};

//async function to handle add palyer button
window.postPlayer = async () => {
    event.preventDefault();

    //Retrieving info from the input fields
    const firstname = document.getElementById('post-player-name').value;
    const age = document.getElementById('post-player-age').value;
    const email = document.getElementById('post-player-email').value;
    const team = document.getElementById('post-player-team').value;

    //if no info entered, alert user
    if (!firstname) {
        alert('Enter Name');
        return;
    }
    if (!age) {
        alert('Enter Age');
        return;
    }
    if (!email) {
        alert('Enter Email');
        return;
    }
    if (!team) {
        alert('Choose Team');
        return;
    }

    //Creating an object with values from input fields
    const newPlayer = {
        first_name: firstname,
        age: age,
        email: email,
        team_name: team
    }


    //setting variables to handle response output to page
    const playerId = document.getElementById('post-player-id-p');
    const playerName = document.getElementById('post-player-name-p');
    const playerAge = document.getElementById('post-player-age-p');
    const playerEmail = document.getElementById('post-player-email-p');
    const playerTeam = document.getElementById('post-player-team-p');

    try {
        //Sending a POST request to fetch details from API with object
        const response = await axios.post(`${teamUrl}/${team}`, newPlayer);
        console.log('Player Added', response.data)

        //Populate HTML elements with response data from API
        playerId.innerHTML = `ID: ${response.data.id}`
        playerName.innerHTML = `Name: ${response.data.first_name}`
        playerAge.innerHTML = `Age: ${response.data.age}`
        playerEmail.innerHTML = `Email: ${response.data.email}`
        playerTeam.innerHTML = `Team: ${response.data.team_name}`

        //making the element visible that contains response data
        document.getElementById('add-player-info-div').style.display = 'block';
    } catch (error) {
        console.log('Error', error);
    }
}

//async function to handle add coach button
window.postCoach = async () => {
    event.preventDefault();

    //Retrieving info from the input fields
    const firstname = document.getElementById('post-coach-name').value;
    const team = document.getElementById('post-coach-team').value;
    const assistant = document.getElementById('post-coach-assistant-name').value

    //if no info entered, alert user
    if (!firstname) {
        alert('Enter Name');
        return;
    }
    if (!team) {
        alert('Enter Team');
        return;
    }
    if (!assistant) {
        alert('Enter Assistant')
        return;
    }

    //Creating an object with values from input fields
    const newCoach = {
        first_name: firstname,
        team: team,
        assistant_coach: assistant
    }

    //setting variables to handle response output to page
    const coachId = document.getElementById('post-coach-id-p');
    const coachName = document.getElementById('post-coach-name-p');
    const coachTeam = document.getElementById('post-coach-team-p');
    const coachAssistant = document.getElementById('post-coach-assistant-coach-name-p');


    try {
        //Sending a POST request to fetch details from API with object
        const response = await axios.post(`${teamUrl}/coaches`, newCoach)
        console.log('Coach Added', response.data);
        console.log(response.data.id);

        //Populate HTML elements with response data from API
        coachId.innerHTML = `ID: ${response.data.id}`;
        coachName.innerHTML = `Name: ${response.data.first_name}`;
        coachTeam.innerHTML = `Team: ${response.data.team}`;
        coachAssistant.innerHTML = `Assistant: ${response.data.assistant_coach}`;

        //making the element visible that contains response data
        document.getElementById('add-coach-info-div').style.display = 'block';
    } catch (error) {
        console.log("Error", error)
    }

}

//async function to handle update player button
window.putPlayer = async () => {

    //Retrieving info from the input fields
    const id = document.getElementById('put-player-id').value;
    const firstname = document.getElementById('put-player-name').value;
    const age = document.getElementById('put-player-age').value;
    const email = document.getElementById('put-player-email').value;
    const team = document.getElementById('put-player-team').value;

    //if no info entered, alert user
    if (!team) {
        alert('Choose Team');
        return;
    }
    if (!id) {
        alert('Enter ID');
        return;
    }
    if (!firstname) {
        alert('Enter Name');
        return;
    }
    if (!age) {
        alert('Enter Age');
        return;
    }
    if (!email) {
        alert('Enter Email');
        return;
    }

    //Creating an object with values from input fields
    const updatePlayer = {
        first_name: firstname,
        age: age,
        email: email,
        team_name: team
    }

    //setting variables to handle response output to page
    const playerIdResponse = document.getElementById('put-player-id-p');
    const playerNameResponse = document.getElementById('put-player-name-p');
    const playerAgeResponse = document.getElementById('put-player-age-p');
    const playerEmailResponse = document.getElementById('put-player-email-p');
    const playerTeamResponse = document.getElementById('put-player-team-p');

    try {
        //Sending a PUT request to fetch details from API with object
        const response = await axios.put(`${teamUrl}/${team}/${id}`, updatePlayer);
        console.log(response.data)

        //Populate HTML elements with response data from API
        playerIdResponse.innerText = `ID: ${response.data.id}`;
        playerNameResponse.innerText = `Name: ${response.data.first_name}`;
        playerAgeResponse.innerText = `Age: ${response.data.age}`;
        playerEmailResponse.innerText = `Email: ${response.data.email}`;
        playerTeamResponse.innerText = `Team: ${response.data.team_name}`;

        //making the element visible that contains response data
        document.getElementById('put-player-info-div').style.display = 'block';

    } catch (error) {
        console.log("Error", error)
        alert("Player not found. Try Again");
        return;
    }
}

//async function to handle update coach function 
window.putCoach = async () => {

    //Retrieving info from the input fields
    const id = document.getElementById('put-coach-id').value;
    const name = document.getElementById('put-coach-name').value;
    const assistant = document.getElementById('put-coach-assistant').value;
    const team = document.getElementById('put-coach-team').value

    //if no info entered, alert user
    if (!team) {
        alert('Choose Team');
        return;
    }
    if (!id) {
        alert('Enter ID');
        return;
    }
    if (!name) {
        alert('Enter Name');
        return;
    }
    if (!assistant) {
        alert('Enter Assistant');
        return;
    }

    //Creating an object with values from input fields
    const updateCoach = {
        first_name: name,
        team: team,
        assistant_coach: assistant
    }

    //setting variables to handle response output to page
    const coachIdResponse = document.getElementById('put-coach-id-p');
    const coachNameResponse = document.getElementById('put-coach-name-p');
    const coachAssistantResponse = document.getElementById('put-coach-assistant-p');
    const coachTeamResponse = document.getElementById('put-coach-team-p');

    try {
        //Sending a PUT request to fetch details from API with object
        const response = await axios.put(`${teamUrl}/coaches/${id}`, updateCoach);
        console.log(response.data);

        //Populate HTML elements with response data from API
        coachIdResponse.innerText = `ID: ${response.data.id}`;
        coachNameResponse.innerText = `Name: ${response.data.first_name}`;
        coachTeamResponse.innerText = `Team: ${response.data.team}`;
        coachAssistantResponse.innerText = `Assistan: ${response.data.assistant_coach}`;

        //making the element visible that contains response data
        document.getElementById('put-coach-info-div').style.display = 'block';

    } catch (error) {
        console.log("Error", error);
        alert("Coach not found. Try again");
        return;
    }
}

//async function to handle delete player button
window.deletePlayer = async () => {

    //Retrieving info from the input fields
    const selectedTeam = document.querySelector('input[name="team"]:checked');
    const team = selectedTeam ? selectedTeam.value : null;
    const id = document.getElementById('delete-player-id').value;

    //if no info entered, alert user
    if (!team) {
        alert('Chosoe a team');
        return;
    }
    if (!id) {
        alert('Enter an ID');
        return;
    }

    try {
        const response = await axios.get(`${teamUrl}/${team}/${id}`)

        if (response.status === 200) {
            //asking user to confirm deletion 
            const isConfirmed = window.confirm(`Are you sure you want to delete Team: ${team} Player ID: ${id}?`);

            //if isConfirmed true
            if (isConfirmed) {
                //Sending a DELETE request to fetch details from API with Player ID
                await axios.delete(`${teamUrl}/${team}/${id}`);
                alert(`Team: ${team} ID: ${id} Deleted`);
            }
        } else {
            alert('Player not found. Try again')
        }


    } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Player not found.');

        } else {
            console.log('Error', error)
        }
    }
}

//async function to handle delete coach button 
window.deleteCoach = async () => {

    //Retrieving info from the input fields
    const id = document.getElementById('delete-coach-id').value

    //if no ID entered, alert user
    if (!id) {
        alert('Enter and ID');
        return;
    }

    try {

        const response = await axios.get(`${teamUrl}/coaches/${id}`);

        if (response.status === 200) {
            //asking user to confirm deletion 
            const isConfirmed = window.confirm(`Are you sure you want to delete Coach: ${id} ?`);

            //if isConfirmed true
            if (isConfirmed) {
                //Sending a DELETE request to API to delete requested coach ID 
                await axios.delete(`${teamUrl}/coaches/${id}`);
                alert(`Coach: ${id} deleted.`);
            }
        } else {
            alert("Coach not found. Try again")
        }

    } catch (error) {
        if (error.response && error.response.status === 404) {
            alert('Coach not found. Try again');
        } else {
            console.log('Error', error);
        }


    }
}

window.allPlayers = async () => {

    //Get the selected radio button element
    const selectedTeamRadio = document.querySelector('input[name=team]:checked');

    //if no team selected alert user
    if (!selectedTeamRadio) {
        alert('Please Select a Team');
        return;
    }

    const selectedTeam = selectedTeamRadio.value; //assign value from radio button to variable

    try {
        const response = await axios.get(`${teamUrl}/${selectedTeam}`);
        const data = response.data
        console.log(response.data)

        const playerTableBody = document.getElementById('team-table').querySelector('tbody');
        playerTableBody.innerHTML = '';

        data.forEach(item => {
            const row = document.createElement('tr');

            const idCell = document.createElement('td');
            idCell.textContent = item.id;

            const nameCell = document.createElement('td');
            nameCell.textContent = item.first_name;

            row.appendChild(idCell);
            row.appendChild(nameCell);

            playerTableBody.appendChild(row);
        });
    } catch (error) {
        console.log('Error', error)
    }
}

//async function to go to player index HTML
window.playerMaster = async () => {
    window.location.href = 'index.html' //send user to player index page
}

//async function to go to coach master HTML
window.coachMaster = async () => {
    window.location.href = 'coach-index.html' //send user to coach master page
}

//async function to go to add player HTML
window.postPlayerPage = async () => {
    window.location.href = 'add-player.html'
}

//async function to go to add coach HTML
window.postCoachPage = async () => {
    window.location.href = 'add-coach.html'
}

//async function to go to update player HTML
window.putPlayerPage = async () => {
    window.location.href = 'update-player.html'
}
//async function to go to update coach HTML
window.putCoachPage = async () => {
    window.location.href = 'update-coach.html'
}

//async function to go to delete player HTML
window.deletePlayerPage = async () => {
    window.location.href = 'delete-player.html'
}

//async function to go to delete coach HTML
window.deleteCoachPage = async () => {
    window.location.href = 'delete-coach.html'
}

//async function to go to get all players HTML
window.getAllPlayers = () => {
    window.location.href = 'get-all-players.html'
};

//function to restrict anything but letters in inputs
const restrictToLetters = () => {
    //find all the inputs with letter only class
    const letterInputs = document.querySelectorAll('.letters-only');

    //loop through each input element
    letterInputs.forEach(input => {
        //add input event listener
        input.addEventListener('input', (e) => {
            //replace characters with empty string
            e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
        });
    });
};
//load all DOM content then run the function
document.addEventListener('DOMContentLoaded', restrictToLetters);