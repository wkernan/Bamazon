var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');

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
			choices: ["View Products", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
		}
	]).then(function(answers) {
		switch(answers.choice) {
			case "View Products":
				connection.query("SELECT * FROM Products", function(err, res) {
					showItems(res);
				})
				setTimeout(function(){start()},200);
				break;
			case "View Low Inventory":
				connection.query("SELECT * FROM Products WHERE StockQuantity < 6", function(err, res) {
					showItems(res);
				})
				setTimeout(function(){start()},200);
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addProduct();
				break;
			case "Exit":
				process.exit();
				break;
		}
	});
}

var addProduct = function() {
	var nameArr = [];
	connection.query("SELECT DepartmentName FROM Departments", function(err, res) {
		res.forEach(function(name) {
			nameArr.push(name.DepartmentName);
		})
		inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of the item you want to add?"
			},
			{
				type: "list",
				name: "department",
				message: "What department?",
				choices: nameArr
			},
			{
				type: "input",
				name: "price",
				message: "Selling price?"
			},
			{
				type: "input",
				name: "amt",
				message: "How many do you have?"
			}
		]).then(function(answers) {
			connection.query("INSERT INTO Products SET ?", {
		    ProductName: answers.name,
		    DepartmentName: answers.department,
		    Price: answers.price,
		    StockQuantity: answers.amt
			}, function(err, res) {
		    console.log("Your item has been added!");
				connection.query("SELECT * FROM Products", function(err, res) {
					showItems(res);
				})
				setTimeout(function(){start()},200);
	    });
		})
	})
}

var addInventory = function() {
	connection.query("SELECT * FROM Products", function(err, res) {
		showItems(res);
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
				console.log("ID: " + res[0].ItemID + " | " + "Item: " + res[0].ProductName + " | " + "Price: $" + res[0].Price + " | " + "Quantity: " + res[0].StockQuantity + "\n");
			})
			setTimeout(function(){start()},200);
		} else {
			console.log("Please enter a valid number");
			addIt(res);
		}
	})
}

var showItems = function(res) {
		var table = new Table({
		head: ["ID", "Item", "Price $", "Department", "Quantity"]
	});
	res.forEach(function(item) {
		var itemArr = [];
		itemArr.push(item.ItemID);
		itemArr.push(item.ProductName);
		itemArr.push(item.Price);
		itemArr.push(item.DepartmentName);
		itemArr.push(item.StockQuantity);
		table.push(itemArr);
	})
	console.log(table.toString());
}

start();