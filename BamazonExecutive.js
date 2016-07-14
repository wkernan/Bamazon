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
	console.log("Bamazon Executive Window\n");
	inquirer.prompt([
		{
			type: "list",
			message: "Please Select an Option",
			name: "choice",
			choices: ["View Product Sales by Department", "Create New Department", "Exit"]
		}
	]).then(function(answers) {
		switch(answers.choice) {
			case "View Product Sales by Department":
				connection.query("SELECT * FROM Departments", function(err, res) {
					showDep(res);
				})
				setTimeout(function(){start()},200);
				break;
			case "Create New Department":
				createNew();
				break;
			case "Exit":
				process.exit();
				break;
		}
	})
}

var createNew = function() {
	connection.query("SELECT * FROM Departments", function(err, res) {
		showDep(res);
	})
	setTimeout(function() {inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is the name of the new department?"
		},
		{
			type: "input",
			name: "cost",
			message: "What is the overhead cost?"
		}
	]).then(function(answers) {
		connection.query("INSERT INTO Departments SET ?", {
	    DepartmentName: answers.name,
	    OverHeadCosts: answers.cost,
	    TotalSales: 0
		}, function(err, res) {
	    console.log("Department added!");
			connection.query("SELECT * FROM Departments", function(err, res) {
				showDep(res);
			})
			setTimeout(function(){start()},200);
    });
	})},200);
}

var showDep = function(res) {
	var table = new Table({
		head: ["DepartmentID", "DepartmentName", "OverHeadCosts", "ProductSales", "TotalProfit"]
	});
	res.forEach(function(dep) {
		var depArr = [];
		depArr.push(dep.DepartmentID);
		depArr.push(dep.DepartmentName);
		depArr.push(dep.OverHeadCosts);
		depArr.push(dep.TotalSales);
		depArr.push(parseInt(dep.TotalSales) - parseInt(dep.OverHeadCosts));
		table.push(depArr);
	})
	console.log(table.toString());
}

start();