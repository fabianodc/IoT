<!DOCTYPE html>
<html lang="pt-br">
<head>
<title>IoT - CEFET-MG</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- AnglularJs -->
<script
	src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular.min.js"></script>

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

<!-- Popper JS -->
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

<!-- Plotly -->
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<script>
	var url = 'http://35.229.57.208:3000/IoT/temperatura';
	angular.module('iot', []).controller(
			'sensor',
			function($scope, $http) {
				$scope.GetData = function() {
					$http.get(url).then(function(response) {
						$scope.sensor = response.data;
						$scope.Plot(response.data);
					});

				};

				$scope.SendData = function() {
					var d = new Date();
					var data = {
						time : d.getFullYear() + "-"
								+ ("00" + (d.getMonth() + 1)).slice(-2) + "-"
								+ ("00" + (d.getDate())).slice(-2) + " "
								+ d.toLocaleTimeString(),
						valor : $scope.valor
					};

					$http.post(url, data).then(function(response) {
						$scope.showSuccess = true;
						$scope.GetData();
					}, function(response) {
						$scope.showError = true;
					});
				};

				$scope.Plot = function(data) {
					var x = [], y = [];

					data.forEach(function(item) {
						x.push(item.time);
						y.push(item.valor);
					});

					var charData = [ {
						x : x,
						y : y,
						mode : 'lines+markers',
						line : {
							color : '#80CAF6'
						}
					} ];

					var chart = document.getElementById('chart');

					Plotly.newPlot(chart, charData);
				};

			});
</script>
</head>

<body ng-app="iot" ng-controller="sensor" ng-init="GetData()">
	<div class="container">
		<h2 align=center>
			<img
				src="http://www.leopoldina.cefetmg.br/wp-content/uploads/sites/6/2016/11/logotipo_curso_internet_coisas_cor.png"
				height="10%" width="10%"> <br>Exemplo Bootstrap -
			AngularJs - Rest - Plotly
		</h2>
		<div class="row">
			<div class="col-sm-4">
				<div class="form-group">
					<label for="valor">Valor:</label> <input type="number"
						class="form-control" name="valor" ng-model="valor"
						placeholder="informe o valor" required />
				</div>
				<button type="button" class="btn btn-primary" ng-click="SendData()">Enviar</button>
				<p></p>
				<div data-ng-show="showSuccess" class="alert alert-success">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Enviado
						com Sucesso!</strong>
				</div>
				<div data-ng-show="showError" class="alert alert-danger">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Erro
						ao Enviar!</strong>
				</div>
				<p></p>
				<table class="table table-striped">
					<thead class="thead-dark">
						<tr>
							<th>id</th>
							<th>time</th>
							<th>valor</th>
						</tr>
					</thead>
					<tbody>
						<tr ng-repeat="s in sensor">
							<td>{{s._id}}</td>
							<td>{{s.time}}</td>
							<td>{{s.valor}}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="col-sm-8">
				<div id="chart" class="responsive-plot"></div>
			</div>
		</div>
	</div>
</body>
</html>