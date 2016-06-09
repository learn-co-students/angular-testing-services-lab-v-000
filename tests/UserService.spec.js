describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: "Jim"});
  }));

  it('should get the user logged in info', function() {
    $httpBackend.expectGET('/rest/user');
    UserService.getUser().then(function(res) {
      if (res.user === "Jim"){
        done();
      };
    });
    $httpBackend.flush();
  });

  it('should join the users first and last name with a space in between', function() {
    expect(UserService.createFullName({first_name: "Jim", last_name: "Bobs"})).toEqual("Jim Bobs");
  });

});
