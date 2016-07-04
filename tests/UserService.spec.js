describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Guest', email: 'example@example.com'});
  }));

  it('should return user informatino', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        if (res.data.user === 'Guest' && res.data.email === 'example@example.com') {
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should return full name', function() {
    expect(UserService.createFullName({first_name: "Bill", last_name: "Gates"})).toEqual("Bill Gates");
  });

});
