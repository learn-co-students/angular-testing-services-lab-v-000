describe('UserService', function () {
    beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({first_name: 'Steve', last_name: 'Jobs'});
    }));

    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (response) {
            var data = response.data;
            if (data.first_name === 'Steve' && data.last_name === 'Jobs') {
              done();
            }
          });

        $httpBackend.flush();
    });

    it('should add the names together correctly', function () {
      expect(UserService.createFullName({first_name: 'Bill', last_name: 'Gates'})).toEqual('Bill Gates');
    });
});
