(function(){
    var app = angular.module('app',['ui.router']);

    app.config(['$logProvider', '$stateProvider', function($logProvider, $stateProvider){
        $logProvider.debugEnabled(true);

        $stateProvider
            .state('home',{
                url: '/',
                templateUrl: 'schoolstemplates/home.html',
                controller: 'HomeController', //也可以写成HomeController as home
                controllerAs: 'home'
            });
    }]);
})();

(function() {
    'use strict';
    angular
        .module('app')
        .factory('storage', storage);
    function storage() { }
})();
