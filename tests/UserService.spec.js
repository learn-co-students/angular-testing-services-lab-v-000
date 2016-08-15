describe('UserService', function () {
   beforeEach(module('app'));

   var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({user: 'Peter Jacobson', email: 'peter.jacobson@gmail.com'});
    }));

});


