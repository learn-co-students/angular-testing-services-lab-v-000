describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

  $httpBackend.when('GET', '/rest/user').respond({first_name: "Bobby", last_name: "Brown" });
  }));

  it('should get the current users information', function (done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res) {
        var data = res.data;
        if (data.first_name === "Bobby" && data.last_name === "Brown") {
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should concatenate users first and last name', function() {
    expect(UserService.createFullName({first_name: "Bobby", last_name: "Brown"})).toEqual('Bobby Brown');
  });

});
