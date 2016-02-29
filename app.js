

var app = angular.module('weatherApp', []);

app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
  function fetchWeather(zip) {
    weatherService.getWeather(zip).then(function(data){
      $scope.place = data;
    });
  }

  fetchWeather('Kitchener');

  $scope.findWeather = function(zip) {
    $scope.place = '';
    fetchWeather(zip);
  };
}]);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
  function getWeather (zip) {
    var deferred = $q.defer();
    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' + zip +'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')


    //('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + zip + '%22&format=json&diagnostics=true&callback=')
    //('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Kitchener%2C%20ON%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')


      .success(function(data){
        deferred.resolve(data.query.results.channel);
      })
      .error(function(err){
        console.log('Error retrieving markets');
        deferred.reject(err);
      });
    return deferred.promise;
  }

  return {
    getWeather: getWeather
  };
}]);


