describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user').respond({first_name: "first_name", last_name: "last_name"});
  }));

  it("get the user's logged in information", function (done) {
    $httpBackend.expectGET("/rest/user");

    UserService
      .getUser()
      .then(function (response) {
        var data = response.data
        if (data.first_name == "first_name" && data.last_name == "last_name") { 
          done() 
        }
      });

    $httpBackend.flush();
  });

  it("join the user's first name with their last name, with a space in between", function () {
    expect(UserService.createFullName({first_name: "first_name", last_name: "last_name"})).toEqual("first_name last_name")
  })

});
