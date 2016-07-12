describe('UserService', function () {
    beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates', email: 'bill@microsoft.com'});
    }));

    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            var data = res.data;
            if (data.email === 'bill@microsoft.com' && data.first_name === 'Bill') {
              done();
            }
          });

        $httpBackend.flush();
    });

});
