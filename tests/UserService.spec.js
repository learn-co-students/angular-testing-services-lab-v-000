describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Barack", last_name: "Obama"});
  }));

  it("should get the current user's information", function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if (data.first_name === "Barack" && data.last_name === "Obama") {
          done();
        }
      })

    $httpBackend.flush();
  });

  it("should concatenate the current user's first_name, a space, and last_name", function () {
    var user = {first_name: "Barack", last_name: "Obama"}
    expect(UserService.createFullName(user)).toEqual("Barack Obama")
  });

});
