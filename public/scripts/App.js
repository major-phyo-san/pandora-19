var App = angular.module("App",['ngMaterial','ngMessages','ngRoute']);

App.value("country_stat_url","https://covid-193.p.rapidapi.com/statistics");
App.value("world_stat_url","https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php");

App.value("stud_my_stat","http://localhost:8500/my-stat.php");
App.value("stud_world_stat","http://localhost:8500/world-stat.php");

App.value("api_key", "db232e08a0msh475843905294660p11e025jsn03fdea6e59f0");
App.value("proj", "COVID-Info");

App.config(['$routeProvider', function($routeProvider){
    $routeProvider
    
    .when("/",{
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

App.controller("myanmarController", function($scope,$http, stud_my_stat, country_stat_url, api_key, proj){
	$scope.myanmar_stat = null;
	$scope.data_status = "ခေတ္တစောင့်ပါ";
    let url = country_stat_url + "?country=myanmar";
    //alert(url);
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
    	$scope.datetimeobj = $scope.myanmar_stat.response[0].time;
    	$scope.newCases = $scope.myanmar_stat.response[0].cases.new;
    	$scope.activeCases = $scope.myanmar_stat.response[0].cases.active;
    	$scope.criticalCases = $scope.myanmar_stat.response[0].cases.critical;
    	$scope.newDeaths = $scope.myanmar_stat.response[0].deaths.new;
    	$scope.totalDeaths = $scope.myanmar_stat.response[0].deaths.total;
    	$scope.recoveredCases = $scope.myanmar_stat.response[0].cases.recovered;
    	$scope.testedCases = $scope.myanmar_stat.response[0].tests.total;
    	$scope.totalCases = $scope.myanmar_stat.response[0].cases.total;    	
    },
    	function errorCallBack(){
    		alert("အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ");
    		$scope.data_status = "အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ";
    		//conosole.log(url);

    });

    $scope.date = function(datetimeobj){
    	datetime = new Date(datetimeobj);
    	year = datetime.getFullYear();
		month = datetime.getMonth() + 1;
		if(month<10)
    		month = "0" + month;
		day = datetime.getDate();
		if(day<10)
			day = "0" + day;
		return year + "-" + month+ "-" + day;

    }

    $scope.time = function(datetimeobj){
    	datetime = new Date(datetimeobj);
    	hour = datetime.getHours();
		part_of_day = "AM";

		if(hour<10){
			hour = "0" + hour;
		}
    
		if(hour>12){
			part_of_day = "PM";
			hour -= 12;
			if(hour<10){
				hour = "0" + hour;
			}
	
		}
		minute = datetime.getMinutes();
		if(minute<10)
    		minute = "0" + minute;
		return hour + ":" + minute + part_of_day;

    }
    
});

App.controller("globalController", function($scope, $http, stud_world_stat, world_stat_url, api_key, proj){
	$scope.world_stat = null;
	$scope.data_status = "ခေတ္တစောင့်ပါ";
    let url = world_stat_url;
    //alert(url);
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
    	$scope.datetime = $scope.world_stat.statistic_taken_at;
    	
    	$scope.totalCases = $scope.world_stat.total_cases;
    	$scope.totalDeaths = $scope.world_stat.total_deaths;
    	$scope.totalRecovered = $scope.world_stat.total_recovered;

    	$scope.newCases = $scope.world_stat.new_cases;
    	$scope.newDeaths = $scope.world_stat.new_deaths;

    	$scope.activeCases = $scope.world_stat.active_cases;
    	$scope.criticalCases = $scope.world_stat.serious_critical;

    	$scope.totalCasesPOneM = $scope.world_stat.total_cases_per_1m_population;
    	$scope.deathsCasesPOneM = $scope.world_stat.deaths_per_1m_population;

    },
    	function errorCallBack(response){
    		alert("အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ");
    		$scope.data_status = "အချက်အလက်များရယူရန် mobile data သို့မဟုတ် wi-fi ကွန်ယက်နှင့်ချိတ်ဆက်ပေးပါ";
    		//conosole.log(url);
    });
    
});

App.controller("byCountryController", function($scope, $http, country_stat_url, stud_my_stat, api_key, proj){
	$scope.country_stat = null;
	$scope.data_status = "ခေတ္တစောင့်ပါ";
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
		$scope.selectedCountry = $scope.selectedCountry.split(' ').join('-');
		if($scope.selectedCountry==null || $scope.selectedCountry===""){
			alert("Please input country name properley");
		}
		else{				
    			let url = country_stat_url+ "?country=" + $scope.selectedCountry;
    			//alert(url);
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
    			$scope.datetimeobj = $scope.country_stat.response[0].time;
    			$scope.newCases = $scope.country_stat.response[0].cases.new;
    			$scope.activeCases = $scope.country_stat.response[0].cases.active;
    			$scope.criticalCases = $scope.country_stat.response[0].cases.critical;
    			$scope.newDeaths = $scope.country_stat.response[0].deaths.new;
    			$scope.totalDeaths = $scope.country_stat.response[0].deaths.total;
    			$scope.recoveredCases = $scope.country_stat.response[0].cases.recovered;
    			$scope.testedCases = $scope.country_stat.response[0].tests.total;
    			$scope.totalCases = $scope.country_stat.response[0].cases.total;
    			},
    		function errorCallBack(response){
    		alert("မိတ်ဆွေထည့်သွင်းသော နိုင်ငံအမည် မှားယွင်းနေခြင်းဖြစ်နိုင်ပါသည်။ ပြန်လည်စစ်ဆေးပြီး ထည့်သွင်းပေးပါ။");
    		$scope.data_status = "မိတ်ဆွေထည့်သွင်းသော နိုင်ငံအမည် မှားယွင်းနေခြင်းဖြစ်နိုင်ပါသည်။ ပြန်လည်စစ်ဆေးပြီး ထည့်သွင်းပေးပါ။";
    		//alert(response.headers);
    		
    		});

			}
		}

	$scope.date = function(datetimeobj){
    	datetime = new Date(datetimeobj);
    	year = datetime.getFullYear();
		month = datetime.getMonth() + 1;
		if(month<10)
    		month = "0" + month;
		day = datetime.getDate();
		if(day<10)
			day = "0" + day;
		return year + "-" + month+ "-" + day;

    }

    $scope.time = function(datetimeobj){
    	datetime = new Date(datetimeobj);
    	hour = datetime.getHours();
		part_of_day = "AM";

		if(hour<10){
			hour = "0" + hour;
		}
    
		if(hour>12){
			part_of_day = "PM";
			hour -= 12;
			if(hour<10){
				hour = "0" + hour;
			}
	
		}
		minute = datetime.getMinutes();
		if(minute<10)
    		minute = "0" + minute;
		return hour + ":" + minute + part_of_day;

    }	
});

App.controller("aboutController", function($scope,$http){

});

