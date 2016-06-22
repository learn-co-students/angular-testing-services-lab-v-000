describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Steve', last_name: 'Jobs'});
  }));

  it('should get user\'s logged in info', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.first_name === "Steve" && data.last_name === "Jobs") {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should create full name from first and last name', function () {
    expect(UserService.createFullName({first_name: "Steve", last_name: "Jobs"})).toEqual('Steve Jobs');
  });


});
