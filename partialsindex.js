var app = angular.module('demo', ['ui.router']);

app.controller('DashboardController', ['$scope', function($scope) {
    //$scope.shows = ShowsService.list();
}]);

app.controller('CampaignController', ['$scope', function($scope) {
    //$scope.shows = ShowsService.list();
}]);

app.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/partialsindex');

    $stateProvider
        .state('partialsindex',{
            url: '/partialsindex',
            views: {
                'header': {
                    templateUrl: '/partialstemplates/header.html'
                },
                'content': {
                    templateUrl: '/partialstemplates/content.html'
                },
                'footer': {
                    templateUrl: '/partialstemplates/footer.html'
                }
            }
        })

        .state('dashboard', {
            url: '/dashboard',
            views: {
                'header': {
                    templateUrl: '/partialstemplates/header.html'
                },
                'content': {
                    templateUrl: 'partialstemplates/dashboard.html',
                    controller: 'DashboardController'
                },
                'footer': {
                    templateUrl: '/partialstemplates/footer.html'
                }
            }

        })

        .state('campaigns', {
            url: '/campaigns',
            views: {
                'header': {
                    templateUrl: '/partialstemplates/header.html'
                },
                'content': {
                    templateUrl: 'partialstemplates/campaigns.html',
                    controller: 'CampaignController'
                },
                'footer': {
                    templateUrl: '/partialstemplates/footer.html'
                }
            }

        })
});
