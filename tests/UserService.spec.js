describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

  $httpBackend.when('GET', '/rest/user').respond({first_name: 'Michael', last_name: 'Jordan', email: 'hey@fake.gov'});

  }));

  it('should get user information with $http request', function (done) {
    $httpBackend.expectGET('/rest/user');

      UserService
        .getUser()
        .then(function (res) {
          var data = res.data;
          if (data.email === 'hey@fake.gov' && data.first_name === 'Michael' && data.last_name === 'Jordan') {
            done();
        }
      });

    $httpBackend.flush();
  });

  it('should concatenate first and last name', function () {
    expect(UserService.createFullName({first_name: 'Michael', last_name: 'Jordan'})).toEqual("Michael Jordan");
      });

});
