var App = angular.module("App",['ngMaterial','ngMessages','ngRoute']);
App.value("country_stat_url","https://covid-193.p.rapidapi.com/statistics?country=");
App.value("world_stat_url","https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php");
//App.value("stud_my_stat","http://localhost:8500/my-stat.php");
//App.value("stud_world_stat","http://192.168.43.64:8500/world-stat.php");
App.value("api_key", "db232e08a0msh475843905294660p11e025jsn03fdea6e59f0");
App.value("proj", "COVID-Info");

var now = new Date();
year = now.getFullYear();
month = now.getMonth() + 1;
if(month<10)
    month = "0" + month;
day = now.getDate();
if(day<10)
	day = "0"+day;
hour = now.getHours();
part_of_day = "AM";
if(hour<10)
{
	hour = "0" + hour;
}
    
if(hour>12)
{
	part_of_day = "PM";
	hour -= 12;
	if(hour<10){
		hour = "0" + hour;
	}
	
}	
	
	
minute = now.getMinutes();
if(minute<10)
    minute = "0" + minute;
var date = year + "-" + month+ "-" + day;
var time = hour + ":" + minute + part_of_day;

App.value("date", date);
App.value("time", time);

App.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when("/myanmar",{
        templateUrl: "myanmar.html",
        controller: "myanmarController"
    })
    .when("/global",{
        templateUrl: "global.html",
        controller: "globalController"
    })
    .when("/about",{
        templateUrl: "about.html",
        controller: "aboutController"
    })
    .when("/bycountry",{
        templateUrl: "bycountry.html",
        controller: "byCountryController"
    })
    .otherwise({
        redirectTo: '/'
    })
}]);

App.controller("mainController", function($scope, $mdSidenav){
    $scope.toggleLeftMenu = function()
    {
        $mdSidenav('left').toggle();
    };

});

App.controller("myanmarController", function($scope,$http, country_stat_url, api_key, proj, date, time){
	$scope.myanmar_stat = null;
	$scope.date = date;
	$scope.time = time;
    let url = country_stat_url + "myanmar";
    //self.conosole.log(url);
    let req = {
    	method: 'GET',
    	url: url,
    	headers: {
    		'Content-Type': 'application/json',
    		'Access-Control-Allow-Origin': '*',
    		'X-RapidAPI-Host': "covid-193.p.rapidapi.com",
    		'X-RapidAPI-Key': api_key,
    		'RapidAPI-Project': proj
    	},
    };

    $http(req)
    .then(function successCallBack(response){
    	$scope.myanmar_stat = response.data;
    	$scope.newCases = $scope.myanmar_stat.response[0].cases.new;
    	$scope.activeCases = $scope.myanmar_stat.response[0].cases.active;
    	$scope.criticalCases = $scope.myanmar_stat.response[0].cases.critical;
    	$scope.recoveredCases = $scope.myanmar_stat.response[0].cases.recovered;
    	$scope.totalCases = $scope.myanmar_stat.response[0].cases.total;
    },
    	function errorCallBack(){
    		alert("အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ");
    		//conosole.log(url);

    });
    
});

App.controller("globalController", function($scope, $http, world_stat_url, api_key, proj, date, time){
	$scope.world_stat = null;
	$scope.date = date;
	$scope.time = time;
    let url = world_stat_url;
    let req = {
    	method: 'GET',
    	url: url,
    	headers: {
    		'Content-Type': 'application/json',
    		'Access-Control-Allow-Origin': '*',
    		'X-RapidAPI-Host': "coronavirus-monitor.p.rapidapi.com",
    		'X-RapidAPI-Key': api_key,
    		'RapidAPI-Project': proj
    	},
    };

    $http(req)
    .then(function successCallBack(response){
    	$scope.world_stat = response.data;
    	$scope.totalCases = $scope.world_stat.total_cases;
    	$scope.totalDeaths = $scope.world_stat.total_deaths;
    	$scope.totalRecovered = $scope.world_stat.total_recovered;
    	$scope.newCases = $scope.world_stat.new_cases;
    	$scope.newDeaths = $scope.world_stat.new_deaths;

    },
    	function errorCallBack(response){
    		alert("အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ");
    		//conosole.log(url);
    });
    
});

App.controller("byCountryController", function($scope, $http, country_stat_url, api_key, proj, date, time){
	$scope.country_stat = null;
	$scope.date = date;
	$scope.time = time;
	$scope.listOfCountries = [
	"Australia", "Bangladesh", "Brazil", "Brunei", "Cambodia",
	"Canada", "China", "Cuba", "Denmark", "Egypt", 
	"France", "Germany", "India", "Indonesia", "Ireland",
	"Israel", "Italy", "Japan", "Laos", "Morocco", 
	"Malaysia", "Pakistan", "Philippines", "Russia", "Singapore", "Spain",
	"Sweden", "Thailand", "UK", "USA", "Vietnam"
	];

	let url = country_stat_url;
	let req = null;

	$scope.selectFromMenu = null;
	$scope.enterManually = null;
	$scope.inputMode = "";
	$scope.selectedCountry = "";

	$scope.radioChanged = function(){
		$scope.selectedCountry = "";
		$scope.country_stat = null;
		if($scope.inputMode==="fromMenu"){
			$scope.selectFromMenu = true;
			$scope.enterManually = false;
		}
		if($scope.inputMode==="fromInput"){
			$scope.selectFromMenu = false;
			$scope.enterManually = true;
		}
	}

	$scope.textChanged = function(){
		$scope.country_stat = null;
	}

	$scope.selectChanged = function(){
		$scope.country_stat = null;
	}

	$scope.getData = function(){
		//alert($scope.selectedCountry);
		if($scope.selectedCountry==null || $scope.selectedCountry===""){
			alert("Please input country name properley");
		}
		else{				
    			let url = country_stat_url + $scope.selectedCountry;
    			req = {
    					method: 'GET',
    					url: url,
    					headers: {
    						'Content-Type': 'application/json',
    						'Access-Control-Allow-Origin': '*',
    						'X-RapidAPI-Host': "covid-193.p.rapidapi.com",
    						'X-RapidAPI-Key': api_key,
    						'RapidAPI-Project': proj
    				},
    			};
    		$http(req)
    		.then(function successCallBack(response){
    			$scope.country_stat = response.data;
    			$scope.newCases = $scope.country_stat.response[0].cases.new;
    			$scope.activeCases = $scope.country_stat.response[0].cases.active;
    			$scope.criticalCases = $scope.country_stat.response[0].cases.critical;
    			$scope.recoveredCases = $scope.country_stat.response[0].cases.recovered;
    			$scope.totalCases = $scope.country_stat.response[0].cases.total;
    			},
    		function errorCallBack(response){
    		alert("မိတ်ဆွေထည့်သွင်းသော နိုင်ငံအမည်မှားယွင်းနေခြင်း ဖြစ်နိုင်ပါသည်။ ပြန်လည်စစ်ဆေးပြီး ထည့်သွင်းပေးပါ။");
    		
    			});

			}
		}
	
});

App.controller("aboutController", function($scope,$http){

});

