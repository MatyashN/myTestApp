'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('mainCtrl', ['$scope','$http', function($scope, $http){
  
  $scope.data = [];

  $http.get('data.json').success( function(data){
    $scope.data = data['colorsArray'];
  });

}]);

myApp.directive('colorTable', function(){
  return function(scope, e, attr){

    var element = angular.element('<table>');
    element.addClass('table table-bordered');
    e.append(element);

    var watcherFunction = function(watchScope){
      return scope[attr['colorTable']];
    }

    scope.$watch(watcherFunction, function(newValue){
      element.empty();

      var thead = angular.element('<thead>');
      var tr = angular.element('<tr>')
      for (var key in newValue[0]){
        var th = angular.element('<th>');
        th.text(key);
        tr.append(th);
      };
      thead.append(tr);
      element.append(thead);

      if (angular.isArray(newValue)){
        newValue.forEach(function(item, i, arr){
          var tr = angular.element('<tr>');
          for (var key in newValue[i]){
            var td = angular.element('<td>');
            td.html('<span>'+newValue[i][key]+'</span>');
            tr.append(td);
            if (key == "hexValue") td.attr('style', 'background-color:' + newValue[i][key]);
          }
          element.append(tr);
        });
      };

    }, true)

  };
});

