
//BUDGET CONTROLLER

var BudgetController = (function(){


	var Income = function(id, description, amount) {

		this.id = id;
		this.description = description;
		this.amount = amount;
	}


	var Expense = function(id, description, amount) {

		this.id = id;
		this.description = description;
		this.amount = amount;
	};


	var data = {

		all_data: {

			expense: [],
			income: []
		},

		all_total: {

			income: 0,
			expense: 0,
			balance: 0
		}
	};


	

	function  calculate(type) {

		//console.log(type);
		//console.log(data);
		
			var sum, ArrData;

			sum = 0;

			ArrData = data.all_data[type];

			ArrData.forEach(function(curr){


					sum  = sum + curr.amount;


			});


			data.all_total[type] = sum;

			//console.log(sum);



	}


	return {



		add_item: function(type, description, amount) {

			var id, new_item;

			if(data.all_data[type].length > 0) {

				id = data.all_data[type][data.all_data[type].length -1].id + 1;

			} else {

				id  = 0 ;
			}

				//if type is expense
				if(type === 'expense') {

					new_item = new Expense(id, description, amount);
				}

				//if type is an icome

				else if(type === 'income') {

					new_item = new Income(id, description, amount);
				}

				//push item into the it array
				data.all_data[type].push(new_item);

				//return item

				return new_item;
			},


			updateBudget: function() {

				var balance;
				//calculate totals
				calculate('expense');
				calculate("income");

				//calculate balance

				balance = data.all_total.income - data.all_total.expense;

				data.all_total.balance = balance;

			},


			getTotals: function() {

				return data.all_total;
			},

			getBudget: function() {


				return {

					income: data.all_total.income,
					expense: data.all_total.expense,
					balance: data.all_total.balance

				}

			} ,


			removeItem: function(type, id) {

				var ArrData, ids, newData, index;

				ArrData = data.all_data[type];

				//console.log(ArrData);

				ids = ArrData.map(function(curr){

						return curr.id; 
				}); 


				index = ids.indexOf(id);

				if(index !== -1) {

					data.all_data[type].splice(index, 1); 
					
				}




			},


			testing: function() {

				console.log(data);
			}




		}
	//console.log('we on it');
})();



//UI CONTROLLER

var UiController = (function() {

	var dom_strings = {

		type: "#type",
		description: "#description",
		amount: "#amount"

	};


	return  {

		getInput: function() {

			return {

				type: document.querySelector("#type").value,
				description: document.querySelector("#description").value,
				amount: parseFloat(document.querySelector("#amount").value)

			}
		},

		add_item: function(obj, type) {

			var html, element, new_html;

				//create a placeholder text

				html = '<tr id="%id%"><td>%description%</td><td>%amount%</td><td><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';

				id = type+"-"+obj.id;

				if(type === "income") {

					element = "#income";
					

				} else if(type === "expense") {

					element = "#expense";

				}


				//replace placeholder text
				new_html = html.replace("%description%", obj.description);

				new_html = new_html.replace("%amount%", obj.amount);
				new_html = new_html.replace("%id%", id);

				//add item to  ui
				document.querySelector(element).insertAdjacentHTML('afterbegin', new_html);




				//console.log(type);
			},

			clear_fields: function() {


				var fields, array_fields;

				fields = document.querySelectorAll(dom_strings.description+", "+dom_strings.amount);


				array_fields = Array.prototype.slice.call(fields);

				array_fields.forEach(function(curr){

					curr.value = "";

				});

				array_fields[0].focus();

				/*

				document.querySelector(dom_strings.description).value = "";
				document.querySelector(dom_strings.amount).value = "";

				console.log("fields cleared");

				*/
			},


			displayBudget: function(obj) {


				document.querySelector(".income").textContent = obj.income;
				document.querySelector('.expense').textContent = obj.expense;
				document.querySelector('.balance').textContent = obj.balance;


			},

			removeItem: function(type, id) {

				var element, string;				
				
				//string ="#"+type+"-"+id;

				//console.log(string);

				
				//get the element
				element = document.querySelector("#"+type+"-"+id);

				//remove element

				element.parentNode.removeChild(element);

				console.log(element);

			

				//remove item from data structure;

			


			}


		}

	})();
//var Controller = ()();



//GLOBAL CONTROLLER

var Controller = (function(UiController, BudgetController) {



	function ctrl_add_item(event) {

		event.preventDefault();

		var new_item, input;

		input = UiController.getInput();

		if(input.description !== "" && input.amount > 0) {

				var totals, budget;

				//crete new item and add to data structure
				new_item = BudgetController.add_item(input.type, input.description, input.amount);


				 //display item on ui
				 UiController.add_item(new_item, input.type);

				 //clear fields
				 UiController.clear_fields();

				 //update the budget controller

				 BudgetController.updateBudget();
				 //BudgetController.updateBudget(input.type, new_item);


				 //getBudget and 

				budget = BudgetController.getBudget();

				//console.log(budget);

				//display budget;
				UiController.displayBudget(budget);

				 //update totals in ui

				 //UiController.updateTotals(totals);


				 //console.log(totals);


				}




			};

		//when add button is clicked

		document.querySelector("#add_btn").addEventListener("click",ctrl_add_item);

		document.addEventListener("keypress", function(event){

			if(event.keyCode === 13) {


				ctrl_add_item(event);

			}
		});


		//when user clicks on the create button
		document.querySelector("#create").addEventListener("click", function(){

				//do something
				//select the add add_wrapper
				//add active class to it
				document.querySelector(".add_wrapper").classList.add("active");

			});


		//when user clicks the finish button
		document.querySelector("#finish").addEventListener("click", function(event){

			event.preventDefault();
			document.querySelector(".add_wrapper").classList.remove("active");

		});


		//when the delete button is clicked

		document.querySelector(".budget-wrapper").addEventListener("click", function(event){

			var itemId, newItemId,  id, budget, type; 
			itemId = event.target.parentNode.parentNode.parentNode.id;


			if(itemId) {

				newItemId = itemId.split("-");

				console.log(newItemId);

				type = newItemId[0];
				id = newItemId[1];

				//remove item from data structure;

				BudgetController.removeItem(type, parseInt(id));

			

				UiController.removeItem(type, id);

				//update the budget;
				BudgetController.updateBudget();

				//get the budget;

				budget = BudgetController.getBudget();

				//display budget

				UiController.displayBudget(budget); 

			
				
			}

		});


		return {


			testing: function() {

				//set the total to zero
				document.querySelector(".income").textContent = "No Income";
				document.querySelector(".expense").textContent = "No Expense";
			}
		}

	})(UiController, BudgetController);


	Controller.testing();