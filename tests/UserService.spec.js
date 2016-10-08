describe('UserService', function () {
  beforeEach(module('app'))

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService')
    $httpBackend = $injector.get('$httpBackend')

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Derp", last_name: "Burp", email: "test@example.com"});
  }));

  it('should get the email and last name of user', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res){
        var data = res.data;
        if(data.email === "test@example.com" && data.last_name === "Burp") {
          done();
        }
      });

      $httpBackend.flush();
  });

  it('should return the full name of user', function(){
    expect(UserService.createFullName({first_name: "Derp", last_name: "Burp"})).toEqual("Derp Burp")
  })
});
