<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>

	<!--====  bootstrap =======-->
	<link rel="stylesheet" href="css/bootstrap.min.css">


	<!--====  font awesome =======-->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

	<!--====  custom css=======-->
	<link rel="stylesheet" href="css/styles.css">
</head>
<body>


	<header class="main-header">

		<div class="container">
			<h1 class="logo">Logo</h1>

			<nav>
				<a href="#" class="btn btn-primary" id="create">Create Transaction</a>
			</nav>


		</div>


	</header>


	<section id="interface">




		<div class="container">
			<h1 class="display-4 text-center">Budget Application</h1>

			<div class="row">


				<!-- add item container -->
					<div class="col-md-6 col-sm-8 col-xs-8 add_wrapper">

						<h1 class="display-5">Add Item</h1>

						<form action="">

							<div class="form-group">

								<label for="description">Description</label>
								<input type="text" class="form-control" placeholder="Enter Description" id="description">
							</div>

							<div class="form-group">

								<label for="amount">Enter Amount</label>
								<input type="number" class="form-control" id="amount" placeholder="Enter Amounts">

							</div>

							<div class="form-group">

								<select name="type" class="form-control" id="type">

									<option value="expense">Expense</option>
									<option value="income">Income</option>
								</select>

							</div>

							<div class="button-wrapper">
								<button class="btn btn-primary btn-lg" id="add_btn">Add</button>

								<button class="btn btn-success btn-lg" id="finish">Finish</button>

							</div>

						</form>
					</div>

					<!-- end add_item container -->
			</div>

			<!-- display area -->
			<div class="row">

				<div class="col-md-12">

					<div class="row">

						<!--====  income section=======-->

						<div class="col-md-6">

							<h1 class="display-5">Income</h1>

							<table class="table">

								<thead>
									<tr>
										<th>Description</th>
										<th>Amount</th>
										<th>Action</th>
									</tr>
								</thead>

								<tbody id="income">

								</tbody>
							</table>

						</div>


						<!--====  end income section=======-->

						<!--====  expense section=======-->
						<div class="col-md-6">

							<h1 class="display-5">Expenditure</h1>


							<table class="table">

								<thead>
									<tr>
										<th>Description</th>
										<th>Amount</th>
										<th>Action</th>
									</tr>
								</thead>

								<tbody id="expense">


								</tbody>
							</table>


						</div>
					</div>




				</div>



			</div>


		<!-- end display area -->
		</div>


	</section>


	<section id="footer">

		<div class="container">

			<p class="email lead">me@kofiarhin.com</p>

			<nav class="min-nav">
				<a href=""><i class="fa fa-facebook"></i></a>
				<a href=""><i class="fa fa-twitter"></i></a>
				<a href=""><i class="fa fa-instagram"></i></a>
			</nav>
		</div>
	</section>

	<script src="js/main.js"></script>
</body>
</html>
