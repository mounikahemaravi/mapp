angular.module('starter.controllers', ['ngCordova'])

.controller('ChatsCtrl', function($scope, Chats, $cordovaContacts, $ionicPlatform) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});


    $ionicPlatform.ready(function() {
        /*plugin*/


        $scope.addContact = function() {
            $cordovaContacts.save($scope.contactForm).then(function(result) {}, function(err) {});
        };

        $scope.getAllContacts = function() {
            debugger;
            $cordovaContacts.find().then(function(allContacts) {
            debugger;
            
             //omitting parameter to .find() causes all contacts to be returned
                $scope.contacts = allContacts;
            }, function(err) {
                $scope.contacts = err;
            })
        };

         /*  $scope.getAllContacts();
           console.log($scope.getAllContacts());
*/
        $scope.findContactsBySearchTerm = function(searchTerm) {
            var opts = { //search options
                filter: searchTerm, // 'Bob'
                multiple: true, // Yes, return any contact that matches criteria
                fields: ['displayName', 'name'], // These are the fields to search for 'bob'.
                desiredFields: [id] //return fields.
            };

            if ($ionicPlatform.isAndroid()) {
                opts.hasPhoneNumber = true; //hasPhoneNumber only works for android.
            };

            $cordovaContacts.find(opts).then(function(contactsFound) {
                $scope.contacts = contactsFound;
            }, function(err) {});
        }

        $scope.pickContactUsingNativeUI = function() {
            $cordovaContacts.pickContact().then(function(contactPicked) {
                $scope.contact = contactPicked;
            }, function(err) {})
        }

        /*plugin ends*/



    });







    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    };



})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});
