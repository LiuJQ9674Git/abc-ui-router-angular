var photoGallery = angular.module('photoGallery',["ui.router","photos.controllers"]);
photoGallery.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('home');
    $stateProvider
        .state('content',{
            url: '/',
            abstract: true,
            data:{
                user: "user",
                password: "1234"
            },
            views:{
                "":{
                    templateUrl: 'photospartials/content.html',
                    controller: 'RootController'
                },
                "header@content":{
                    templateUrl: 'photospartials/header.html',
                    controller: function($scope, $rootScope, $state){
                        $scope.logoff = function(){
                            $rootScope.user = null;
                        }
                    }
                }//
            }
        })
        .state('content.home',{
            url: 'home',
            views:{
                "body@content":{
                    templateUrl: 'photospartials/home.html',
                    controller: 'HomeController',
                    controllerAs: 'ctrHome'
                }
            }
        })
        .state('content.photos',{
            url: 'photos',
            abstract: true,
            views:{
                "body@content":{
                    templateUrl: 'photospartials/photos.html',
                    controller: 'PhotoController',
                    controllerAs: 'ctrPhoto'
                }
            }
        })
        .state('content.photos.list',{
            url: '/list',
            templateUrl: 'photospartials/photos-list.html',
            controller: "PhotoListController",
            controllerAs: 'ctrPhotoList'
        })
        .state('content.photos.detail',{
            //url: '/detail',
            url: '/detail/:id',
            templateUrl: 'photospartials/photos-detail.html',
            controller: 'PhotoDetailController',
            controllerAs: 'ctrPhotoDetail',
            data:{
                required: true
            },
            resolve:{
                viewing: function($stateParams){
                    return{
                        photoId: $stateParams.id
                    }
                }
            },
            onEnter: function(viewing){
                var photo = JSON.parse(sessionStorage.getItem(viewing.photoId));
                if(!photo){
                    photo = {
                        views: 1,
                        viewing: 1
                    }
                }else{
                    photo.views = photo.views + 1;
                    photo.viewing = photo.viewing + 1;
                }
                sessionStorage.setItem(viewing.photoId, JSON.stringify(photo));
            },
            onExit: function(viewing){
                var photo = JSON.parse(sessionStorage.getItem(viewing.photoId));
                photo.viewing = photo.viewing - 1;
                sessionStorage.setItem(viewing.photoId, JSON.stringify(photo));
            }
        })
        .state('content.photos.detail.comment',{
            //url: '/comment',
            url:'/comment?skip&limit',
            templateUrl: 'photospartials/photos-detail-comment.html',
            controller: 'PhotoCommentController',
            controllerAs: 'ctrPhotoComment',
            data:{
                required: true
            }
        })
        .state('content.about',{
            url:'about',
            views:{
                "body@content":{templateUrl: 'photospartials/about.html'}
            }
        })
        .state('content.login',{
            url:'login',
            data:{
                loginError: 'User or password incorrect.'
            },
            views:{
                "body@content" :{
                    templateUrl: 'photospartials/login.html',
                    controller: function($scope, $rootScope, $state){
                        $scope.login = function(user, password, valid){
                            if(!valid){
                                return;
                            }
                            if($state.current.data.user === user && $state.current.data.password === password){
                                $rootScope.user = {
                                    name: $state.current.data.user
                                };
                                // Or Inherited
                                /*$rootScope.user = {
                                 name: $state.$current.parent.data.user
                                 };*/
                                $state.go('content.home');
                            }else{//
                                $scope.message = $state.current.data.loginError;
                            }
                        }
                    }//controller ober
                }
            }
        })
        .state('content.notfound',{
            url:'notfound',
            views: {
                "body@content": {templateUrl: 'photospartials/page-not-found.html'}
            }
        })
      .state('content.log',{
            url:'log',
            data:{
                required: true
            },
            views: {
                "body@content": {templateUrl: 'photospartials/log.html'}
            }
        })
        .state('content.profile', {
            url:'profile',
            data:{
                required: true
            },
            resolve:{
                showError: function(){
                    throw 'Error in code.';
                }
            },
            views:{
                "body@content": {template: '<div>Error</div>'}
            }
        })
        .state('content.error',{
            url:'error/:error',
            views:{
                "body@content":{
                    templateUrl: 'photospartials/error.html',
                    controller: function($scope, $stateParams){
                        $scope.error = {
                            message: $stateParams.error
                        }
                    }
                }
            }
        })


});
