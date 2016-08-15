angular.module('underscore', []).factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);

// Make sure to include the `ui.router` module as a dependency
var photoGallery=angular.module('photoGallery', [
    'ui.router','underscore',
    'ngAnimate'
]);

photoGallery.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('content',{
            url: '/',
            abstract:true,
            views:{
                "":{templateUrl: './photospartials/content.html'},
                "header@content":{templateUrl: './photospartials/header.html'},
            }
        })
        .state('content.home',{
            url: 'home',
            views:{
                "body@content":{templateUrl: './photospartials/home.html'}
            }
        })
        .state('content.photos',{
            url: 'photos',
            abstract:true,
            views:{
                "body@content":{templateUrl: './photospartials/photos.html'}
            }
        })
        .state('content.photos.list',{
            url: '/list',
            templateUrl: './photospartials/photos-list.html'
        })
        .state('content.photos.detail',{
            url: '/detail',
            templateUrl: './photospartials/photos-detail.html'
        })
        .state('content.photos.detail.comment',{
            url: '/comment',
            templateUrl: './photospartials/photos-detail-comment.html'
        })
        .state('content.about',{
            url:'about',
            views:{
                "body@content":{templateUrl: './photospartials/about.html'}
            }
        })
})
