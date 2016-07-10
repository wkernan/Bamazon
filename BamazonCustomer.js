var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: "", 
    database: "Bamazon"
});

var start = function() {
	connection.query("SELECT * FROM Products", function(err, res) {
		res.forEach(function(items) {
			console.log("ID: " + items.ItemID + " | " + "Item: " + items.ProductName + " | " + "Price: $" + items.Price + '\n');
		})
		setTimeout(function(){idPrompt(res)}, 200);
	})
}

var idPrompt = function(res) {
	console.log("What product ID would you like to buy?");
	prompt.get(['id'], function (err, result) {
		if (result.id.charCodeAt() >= 48 && result.id.charCodeAt() <= 57) {
			for(var i=0; i<res.length; i++) {
				if(result.id == res[i].ItemID) {
					console.log("ID: " + res[i].ItemID + " | " + "Item: " + res[i].ProductName + " | " + "Price: $" + res[i].Price + " | " + "Quantity: " + res[i].StockQuantity);
					buyPrompt(res[i]);
				}
			}
		} else {
			console.log("Please enter a valid number");
			idPrompt(res);
		}
	})
}

var buyPrompt = function(item) {
	console.log("How many would you like to buy?");
	prompt.get(['number'], function(err, result) {
		if(result.number.charCodeAt() >= 48 && result.number.charCodeAt() <= 57) {
			if(result.number > 0 && result.number <= item.StockQuantity) {
				console.log("Great! Thank you for your order. Your total amount will be: $" + (result.number * item.Price));
				connection.query("UPDATE Products SET ? WHERE ?", [{StockQuantity: (item.StockQuantity - result.number)}, {ItemID: item.ItemID}], function(err, res) {console.log("Quantity Updated!");});
			} else {
				console.log("Not enough quantity to fulfill this order, sorry.");
				console.log("Please enter an amount less than or equal to: " + item.StockQuantity);
				buyPrompt(item);
			}
		} else {
			console.log("Please enter a valid number");
			buyPrompt(item);
		}
	})
}

start();