angular.module('starter.controllers', ['ngCordova'])
.controller('ChatsCtrl', function($scope, Chats, $cordovaContacts, $ionicPlatform) {
        $ionicPlatform.ready(function() {


            $scope.getAllContacts = function() {
                $cordovaContacts.find({}).then(function(allContacts) {
                    $scope.contacts = allContacts;
                }, function(err) {
                    $scope.contacts = err;
                })
            };

            $scope.getAllContacts();

        });
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    });
