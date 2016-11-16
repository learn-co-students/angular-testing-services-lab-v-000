describe('UserService', function () {
    beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({first_name: 'Garfield', last_name: 'Cat', email: 'g@odiegoestospace.com'});
    }));

    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            var data = res.data;
            if (data.email === 'g@odiegoestospace.com' && data.first_name === 'Garfield') {
              done();
            }
          });
      $httpBackend.flush();
    });

    it('should get the current users full name', function () {
        var testUser = {first_name: 'Garfield', last_name: 'Cat', email: 'g@odiegoestospace.com'}
        expect(UserService.createFullName(testUser)).toBe('Garfield Cat');
    });
});
