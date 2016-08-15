angular.module('underscore', []).factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);

// Make sure to include the `ui.router` module as a dependency
var app=angular.module('demo', [
    'ui.router','underscore',
    'ngAnimate'
]);

app.controller('DashboardController', ['$scope', function($scope) {
    //$scope.shows = ShowsService.list();
}]);

app.controller('CampaignController', ['$scope', function($scope) {
    //$scope.shows = ShowsService.list();
}]);

app.controller('SubscriberController', ['$scope','ShowsService', function($scope, ShowsService) {
    $scope.subscribers = ShowsService.list();
}]);

app.controller('SubscriberDetailController', ['$scope', function($scope) {
    $scope.selected = ShowsService.find();
}]);

app.controller('SubscriberDetailController', ['$scope','$stateParams', 'ShowsService', function($scope, $stateParams, ShowsService) {
    $scope.selected = ShowsService.find($stateParams.id);
}]);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/partialsindex');
    $stateProvider
        .state('app',{
            url: '/partialsindex',
            views: {
                'header': {
                    templateUrl: 'templates/partials/header.html'
                },
                'content': {
                    templateUrl: 'templates/partials/content.html'
                },
                'footer': {
                    templateUrl: 'templates/partials/footer.html'
                }
            }
        })
        .state('app.dashboard', {
            url: 'dashboard',
            views: {
                'content@': {
                    templateUrl: 'templates/dashboard.html',
                    controller: 'DashboardController'
                }
            }
        })
        .state('app.campaigns', {
            url: 'campaigns',
            views: {
                'content@': {
                    templateUrl: 'templates/campaigns.html',
                    controller: 'CampaignController'
                }
            }

        })
        .state('app.subscribers', {
            url: 'subscribers',
            views: {
                'content@': {
                    templateUrl: 'templates/subscribers.html',
                    controller: 'SubscriberController'
                }
            }
        })
        .state('app.subscribers.detail', {
            url: '/:id',
             views: {
                'detail@app.subscribers': {//detail content@
                    templateUrl: 'templates/partials/subscriber-detail.html',
                    controller: 'SubscriberDetailController'
                }
            }
        });
});


app.factory('ShowsService',function(_){
    var shows = [{
        id: 1,
        name: 'Walking Dead',
        email:'Walking Dead@abc.com',
        description: 'The Walking Dead is an American post-apocalyptic horror drama television series developed by Frank Darabont. It is based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard. It stars Andrew Lincoln as sheriff\'s deputy Rick Grimes, who awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies.'
    },
        {
            id: 2,
            name: 'Breaking Bad',
            email:'Walking Dead@abc.com',
            description: 'Breaking Bad is an American crime drama television series created and produced by Vince Gilligan. The show originally aired on the AMC network for five seasons, from January 20, 2008 to September 29, 2013. The main character is Walter White (Bryan Cranston), a struggling high school chemistry teacher who is diagnosed with inoperable lung cancer at the beginning of the series.'
        },
        {
            id: 3,
            name: '7D',
            email:'Walking Dead@abc.com',
            description: 'The 7D is an American animated television series produced by Disney Television Animation, and broadcast on Disney XD starting in July 7, 2014. It is a re-imagining of the titular characters from the 1937 film Snow White and the Seven Dwarfs by Walt Disney Productions'
        }];
    return {
        list: function(){
            return shows;
        },
        find: function(id){
            //return shows[id];
            return _.find(shows, function(show){return show.id == id});
        }
    }
});


