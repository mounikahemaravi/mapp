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
                debugger;
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
               
            };

            $scope.scheduleMultipleNotifications = function() {
                $cordovaLocalNotification.schedule([{
                    id: 1,
                    title: 'notification 2',
                    text: 'Mounikas message is waiting',
                    data: {
                        customProperty: 'Let us test'
                    }
                }, {
                    id: 2,
                    title: 'notification 3',
                    text: 'Hemas message is waiting',
                    data: {
                        customProperty: 'c'
                    }
                }, {
                    id: 3,
                    title: 'notification 4',
                    text: 'Ravis message is waiting',
                    data: {
                        customProperty: 'custom 3 value'
                    }
                }]).then(function(result) {
                    // ...
                });
               
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

            $scope.scheduleEveryMinuteNotification = function() {
                $cordovaLocalNotification.schedule({
                    id: 1,
                    title: 'Scheduled for _10SecondsFromNow',
                    text: 'Keep recieving my msgs :) every minute',
                    every: 'minute'
                }).then(function(result) {
                    // ...
                });
            };

            // =========/ Scheduling

            // ========== Update

            $scope.updateSingleNotification = function() {
                $cordovaLocalNotification.update({
                    id: 1,
                    title: 'Title - UPDATED',
                    text: 'Text - UPDATED'
                }).then(function(result) {
                    // ...
                });
            };

            $scope.updateMultipleNotifications = function() {
                $cordovaLocalNotification.update([{
                    id: 1,
                    title: 'Title 1 - UPDATED',
                    text: 'Text 1 - UPDATED'
                }, {
                    id: 2,
                    title: 'Title 2 - UPDATED',
                    text: 'Text 2 - UPDATED'
                }, {
                    id: 3,
                    title: 'Title 3 - UPDATED',
                    text: 'Text 3 - UPDATED'
                }]).then(function(result) {
                    // ...
                });
            };

            // =========/ Update

            // ========== Cancelation

            $scope.cancelSingleNotification = function() {
                $cordovaLocalNotification.cancel(1).then(function(result) {
                    // ...
                });
            };

            $scope.cancelMultipleNotifications = function() {
                $cordovaLocalNotification.cancel([1, 2]).then(function(result) {
                    // ...
                });
            };

            $scope.cancelAllNotifications = function() {
                $cordovaLocalNotification.cancelAll().then(function(result) {
                    // ...
                });
            };

            // =========/ Cancelation

            // ========== Events

            $rootScope.$on('$cordovaLocalNotification:schedule',
                function(event, notification, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:trigger',
                function(event, notification, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:update',
                function(event, notification, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:clear',
                function(event, notification, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:clearall',
                function(event, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:cancel',
                function(event, notification, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:cancelall',
                function(event, state) {
                    // ...
                });

            $rootScope.$on('$cordovaLocalNotification:click',
                function(event, notification, state) {
                    // ...
                });


        });
        $scope.chats = Chats.all();
        $scope.remove = function(chat) {
            Chats.remove(chat);
        };
    })
    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    });
