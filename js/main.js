
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

			income_total: 0,
			expense_total: 0
		}
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

			testing: function() {

				console.log(data);
			}




	}
	//console.log('we on it');
})();



//UI CONTROLLER

var UiController = (function(){

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

				html = '<tr><td>%description%</td><td>%amount%</td><td><a href="#"><i class="fa fa-trash" aria-hidden="true"></i></a></td></tr>';

				if(type === "income") {

					element = "#income";

				} else if(type === "expense") {

					element = "#expense";
				}


					//replace placeholder text
				new_html = html.replace("%description%", obj.description);

				new_html = new_html.replace("%amount%", obj.amount);

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

					//crete new item and add to data structure
				 new_item = BudgetController.add_item(input.type, input.description, input.amount);


				 //display item on ui
				 UiController.add_item(new_item, input.type);


				 //clear fields

				 UiController.clear_fields();
				}




		}

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

})(UiController, BudgetController);
