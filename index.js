const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1111;

// making the server understant that json data is coming
app.use(express.json());

const users = require("./MOCK_DATA.json");

// multiple requests will be handled for one route
app.route('/api/users').get( (req, res) => {
    return res.send(users);
}).post((req, res) => {
    const user = req.body;
    console.log(user)

    if (!user || !user.first_name || !user.last_name || !user.email || !user.gender || !user.job_title) return res.status(400).send("Please provide all required fields");
    users.push({...user, id: users.length + 1});
    
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) throw err;

        return res.status(201).send(`User added successfully with id ${users.length}`);
    })
})

// multiple requests will be handled for one route
app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id == id);
    if (!user) return res.status(404).send("User not found");
    return res.send(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const userChanges = req.body;
    const userIndex = users.findIndex(user => user.id == id); 

    if (userIndex < 0) return res.status(404).send("User not found");

    users[userIndex] = {...users[userIndex], ...userChanges};

    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) throw err;

        return res.send(
            `User with id ${id} updated successfully`
        );
    })
}).delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id == id); 

    if (userIndex < 0) return res.status(404).send("User not found");

    const newUsers = users.filter(user => user.id != id);
    
    fs.writeFile("MOCK_DATA.json", JSON.stringify(newUsers), (err) => {
        if (err) throw err;

        return res.send(
            `User with id ${id} deleted successfully`
        )
    })
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));