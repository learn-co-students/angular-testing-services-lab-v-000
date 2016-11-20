describe('UserService', function () {
    beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({user: 'Octavio', email: 'octavio@paz.com'});
    }));

    it('should get the current users information', function () {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            if (res.email === 'octavio@paz.com' && res.user === 'Octavio') {
              done();
            }
          });

        $httpBackend.flush();
    });



    it('should join first and last name', function () {
     expect(UserService.createFullName({first_name: 'Octavio', last_name: 'Paz'})).toEqual('Octavio Paz');
   });

});
