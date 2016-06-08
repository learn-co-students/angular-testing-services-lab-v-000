describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: "Will", last_name: "Smith"});
  }));

  it('should return user first_name and user last_name', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function(response) {
      var user = response.data;
      if (user.first_name === "Will" && user.last_name === "Smith"){
        done();
      }
    });

    $httpBackend.flush();
  });

  it('should append first and last name to create fullName', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function(response) {
      var user = response.data;
      if (UserService.createFullName(user) === "Will Smith") {
        done();
      }
    });

    $httpBackend.flush();
  });

  });
//});




