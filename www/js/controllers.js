angular.module('starter.controllers', ['ngCordova'])
    .controller('ChatsCtrl', function($scope, Chats, $ionicPlatform, $cordovaContacts, $rootScope, $cordovaLocalNotification) {
        $ionicPlatform.ready(function() {
            $scope.getAllContacts = function() {
                $cordovaContacts.find({}).then(function(allContacts) {
                    $scope.contacts = allContacts;
                }, function(err) {
                    $scope.contacts = err;
                })
            };

            $scope.getAllContacts();

            $scope.scheduleSingleNotification = function() {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'My first notification',
                    text: 'Did u recieve it',
                    data: {
                        customProperty: 'custom value'
                    }
                }).then(function(result) {
                    // ...
                });
                $scope.scheduleDelayedNotification();

            };


            $scope.scheduleDelayedNotification = function() {
                var now = new Date().getTime();
                var _10SecondsFromNow = new Date(now + 10 * 1000);

                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'Scheduled for _10SecondsFromNow',
                    text: 'Keep recieving my msgs :)',
                    at: _10SecondsFromNow
                }).then(function(result) {
                    // ...
                });

            };

            $scope.getSMS = function() {
                debugger;
                if (window.SMS) {
                    window.SMS.listSMS({}, function(data) {
                        $scope.smses = data;
                    }, function(err) {
                        console.log('error list sms: ' + err);
                    });
                }
            }
        });
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };


    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    });
