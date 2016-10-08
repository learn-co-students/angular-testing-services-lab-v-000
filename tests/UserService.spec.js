describe('UserService', function () {

  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond(
      { user: 'dukeoflaser', country: 'USSR' }
    );
  }));

  it('should get the users data', function (done) {
        $httpBackend.expectGET('/rest/user');

        UserService
          .getUser()
          .then(function(response) {
            var data = response.data;

            if(data.user === 'dukeoflaser' && data.country === 'USSR') {
              done();
            }
          });

          $httpBackend.flush();
    });

    it('should add names together correctly', function () {
      expect(UserService.createFullName({first_name: 'Viktor', last_name: 'Kuchenski'})).toEqual('Viktor Kuchenski');
    });

});
