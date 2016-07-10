var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
});

var start = function() {
	console.log("Bamazon Manager Window\n");
	inquirer.prompt([
		{
			type: "list",
			message: "Please pick an option",
			name: "choice",
			choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product"]
		}
	]).then(function(answers) {
		switch(answers.choice) {
			case "View Products":
				connection.query("SELECT * FROM Products", function(err, res) {
					console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
					res.forEach(function(items) {
						console.log("ID: " + items.ItemID + " | " + "Item: " + items.ProductName + " | " + "Price: $" + items.Price + " | " + "Quantity: " + items.StockQuantity + '\n');
					})
					console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
				})
				setTimeout(function(){start()},200);
				break;
			case "View Low Inventory":
				connection.query("SELECT * FROM Products WHERE StockQuantity < 6", function(err, res) {
					console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
					res.forEach(function(items) {
						console.log("ID: " + items.ItemID + " | " + "Item: " + items.ProductName + " | " + "Price: $" + items.Price + " | " + "Quantity: " + items.StockQuantity + '\n');
					})
					console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
				})
				setTimeout(function(){start()},200);
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product";
				addProduct();
				break;
		}
	});
}

var addProduct = function() {
	
}

var addInventory = function() {
	connection.query("SELECT * FROM Products", function(err, res) {
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
		res.forEach(function(items) {
			console.log("ID: " + items.ItemID + " | " + "Item: " + items.ProductName + " | " + "Price: $" + items.Price + " | " + "Quantity: " + items.StockQuantity + '\n');
		})
		console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\n");
		inquirer.prompt([
			{
				type: "input",
				message: "Which product ID would you like to add to?",
				name: "id"
			}
		]).then(function(answers) {
			if (answers.id.charCodeAt() >= 48 && answers.id.charCodeAt() <= 57) {
				for(var i=0;i<res.length;i++) {
					if(res[i].ItemID == answers.id) {
						console.log("ID: " + res[i].ItemID + " | " + "Item: " + res[i].ProductName + " | " + "Price: $" + res[i].Price + " | " + "Quantity: " + res[i].StockQuantity);
						addIt(res[i]);
					}
				}
			} else {
				console.log("Please enter a valid ID number");
				addInventory();
			}
		})
	})
}

var addIt = function(res) {
	inquirer.prompt([
		{
			type: "input",
			message: "How much would you like to add to inventory?",
			name: "num"
		}
	]).then(function(answers) {
		if(answers.num.charCodeAt() >= 48 && answers.num.charCodeAt() <= 57) {
			if(answers.num == 1) {
				console.log("Great! You've added 1 more " + res.ProductName + " to your inventory");
				connection.query("UPDATE Products SET ? WHERE ?",[{StockQuantity: (parseInt(res.StockQuantity) + parseInt(answers.num))}, {ItemID: res.ItemID}], function(err, res) {});
			} else {
				console.log("Great! You've added " + answers.num + " more " + res.ProductName + "'s to your inventory");
				connection.query("UPDATE Products SET ? WHERE ?",[{StockQuantity: (parseInt(res.StockQuantity) + parseInt(answers.num))}, {ItemID: res.ItemID}], function(err, res) {});
			}
			connection.query("SELECT * FROM Products WHERE ItemID = " + res.ItemID, function(err,res) {
				console.log("ID: " + res[0].ItemID + " | " + "Item: " + res[0].ProductName + " | " + "Price: $" + res[0].Price + " | " + "Quantity: " + res[0].StockQuantity);
			})
			setTimeout(function(){start()},200);
		} else {
			console.log("Please enter a valid number");
			addIt(res);
		}
	})
}

start();