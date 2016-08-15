angular.module('underscore', []).factory('_', ['$window', function($window) {
    return $window._; // assumes underscore has already been loaded on the page
}]);

// Make sure to include the `ui.router` module as a dependency
var app=angular.module('demo', [
    'ui.router','underscore',
    'ngAnimate'
]);


app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/partialsindex');
    $stateProvider
        .state('contacts', {
            // This will get automatically plugged into the unnamed ui-view
            // of the parent state template. Since this is a top level state,
            // its parent state template is index.html.
            templateUrl:'relativename/contacts.html'
        })
        .state('contacts.detail', {
            views: {
                ////////////////////////////////////
                // Relative Targeting             //
                // Targets parent state ui-view's //
                ////////////////////////////////////
                // Relatively targets the 'detail' view in this state's parent state, 'contacts'.
                // <div ui-view='detail'/> within contacts.html
                //相对目标是父状态contacts中的详细detail视图，即 contacts.html中的detail
                "detail": {},
                // Relatively targets the unnamed view in this state's parent state, 'contacts'.
                // <div ui-view/> within contacts.html
                //相对目标为在父状态中的无命名视图，即
                "": {},
                ///////////////////////////////////////////////////////
                // Absolute Targeting using '@'                      //
                // Targets any view within this state or an ancestor //
                ///////////////////////////////////////////////////////
                // Absolutely targets the 'info' view in this state, 'contacts.detail'.
                // <div ui-view='info'/> within contacts.detail.html
                //绝对目标是状态（'contacts.detail'）中的info视图
                "info@contacts.detail": {},
                // Absolutely targets the 'detail' view in the 'contacts' state.
                // <div ui-view='detail'/> within contacts.html
                //绝对目标为状态'contacts'中的视图'detail'，即
                //<div ui-view='detail'/> within contacts.html
                "detail@contacts": {},
                // Absolutely targets the unnamed view in parent 'contacts' state.
                // <div ui-view/> within contacts.html,
                //绝对目标为父状态contacts中没有命名视图，即
                //<div ui-view/> within contacts.html,
                "@contacts": {},
                // absolutely targets the 'status' view in root unnamed state.
                // <div ui-view='status'/> within index.html
                //绝对目标为无命名的根状态的status视图,即
                //<div ui-view='status'/> within index.html
                "status@": {},
                // absolutely targets the unnamed view in root unnamed state.
                // <div ui-view/> within index.html
                //绝对目标为根无命名状态的无命名视图，即
                //<div ui-view/> within index.html
                "@": {}
            }
        });
 });


angular.module("app",[])

    .controller("demoController",["$scope",function($scope){

        $scope.title = "angualr";

    }])

angular.module("app",[])

    .controller("demoController",[function(){

        this.title = "angualr";

    }])


