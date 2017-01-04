describe('UserService', function () {
    beforeEach(module('app'));

    var UserService, $httpBackend;

    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

        $httpBackend.when('GET', '/rest/user').respond({user: 'Dougie Gates'});
    }));

    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function (res) {
            var data = res.data;
            if (data.user === 'Dougie Gates') {
              done();
            }
          });
        $httpBackend.flush();
    });

    it('should join a users first and last names', function () {
      var user = {first_name: "Dougie", last_name: "the Great One Gates"}
      expect(UserService.createFullName(user)).toEqual('Dougie the Great One Gates')
    })
});
