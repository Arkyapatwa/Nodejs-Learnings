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
    users.push({...user, id: users.length + 1});
    
    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) throw err;

        return res.send(`User added successfully with id ${users.length}`);
    })
})

// multiple requests will be handled for one route
app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id == id);
    return res.send(user);
}).patch((req, res) => {
    const id = Number(req.params.id);
    const userChanges = req.body;
    const userIndex = users.findIndex(user => user.id == id); 

    users[userIndex] = {...users[userIndex], ...userChanges};

    fs.writeFile("MOCK_DATA.json", JSON.stringify(users), (err) => {
        if (err) throw err;

        return res.send(
            `User with id ${id} updated successfully`
        );
    })

    
})

app.post('')

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));