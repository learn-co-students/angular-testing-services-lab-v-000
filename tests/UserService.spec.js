describe('UserService', function () {

  beforeEach(module('app'));

    var UserService;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({first_name: 'Karuna', last_name: 'Sehgal', email: 'karuna@email.com'});
    }));

    it('should get the current users information', function(done) {
        $httpBackend.expectGET('/rest/user');

    UserService
          .getUser()
          .then(function(res) {
            var data = res.data
            if (data.email === 'karuna@email.com' && data.first_name === 'Karuna' && data.last_name === 'Sehgal') {
              done();
            }
          });
        $httpBackend.flush();
    });
    it('should join the first and last names', function () {
        expect(UserService.createFullName({first_name: 'Karuna', last_name: 'Sehgal'})).toEqual('Karuna Sehgal');
    });
});
