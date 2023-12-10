const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const database = {
	users: [
	{
		id: '123',
		name: 'john',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: '124',
		name: 'Sally',
		email: 'sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	]
}

app.get('/', (req, resp) => {
	console.log("inside get")
	resp.json(database.users);
});

app.post('/signin', (req, resp) => {
	let loggedUser = {};

	if ( req.body.email === database.users[0].email && req.body.password === database.users[0].password ) {
		loggedUser.id = database.users[0].id;
		loggedUser.name = database.users[0].name;
		loggedUser.email = database.users[0].email;
		loggedUser.entries = database.users[0].entries;
		loggedUser.joined = database.users[0].joined;
		
		resp.json(loggedUser);
	} else {
		resp.status(400).json("error logging in");
	}
});

app.post('/register', (req, resp) => {
	let newUser = {};
	const { name, email, password } = req.body;
	
	if ( name !== "" && email !== "" && password !== "" ) {
		if ( name !== database.users[0].name && email !== database.users[0].email ) {
			newUser.id = '125';
			newUser.name = name;
			newUser.password = password;
			newUser.email = email;
			newUser.entries = 0;
			newUser.joined = new Date();
			database.users.push(newUser);

			delete newUser.password;

			resp.json(newUser);
			console.log(database.users);

		} else {
			resp.status(400).json("user already exist");
		}
	} else {
		resp.status(400).json("please enter valid user details, empty data is not allowed!");
	}
});

app.get('/profile/:id', (req, resp) => {
	const { id } = req.params;
	const user = database.users.filter(data => {
		return id === data.id;
	});
	if ( user.length ) {
		resp.json(user);
	} else {
		resp.status(400).json("not found!");
	}
});

app.put('/image', (req, resp) => {
	const { id } = req.body;
	const user = database.users.filter(data => {
		return id === data.id;
	});
	if ( user.length ) {
		user[0].entries ++;
		resp.json(user[0].entries);
	} else {
		resp.status(400).json("not found!");
	}
});

app.listen(3001, () => console.log("app is running on port 3001"));