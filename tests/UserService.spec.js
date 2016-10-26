describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;
 
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');

    it('should get the current users information', function (done) {
        $httpBackend.expectGET('/rest/user');

    UserService
        .getUserInfo()
        .then(function (res) {
          var data = res.data;
          if (data.email === 'callie@email.com' && data.user === 'Callie') {
              done();
            }
          });
    $httpBackend.flush();
    });

    it('should correctly join first and last names', function() {
      expect(UserService.createFulName({ first_name: 'Jon', last_name: 'Snow'})).toEqual('Jon Snow');
    })
});
