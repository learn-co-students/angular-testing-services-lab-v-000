describe('UserService', function () {

  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
      UserService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');

      $httpBackend.when('GET', '/rest/user').respond({
        name: "Chris", email: "bruen.chris@gmail.com"});
  }));

  it('should respond to a get request', function(done) {
    $httpBackend.expectGET('/rest/user');

    UserService
    .getUser()
    .then(function (res) {
      var data = res.data;
      if (data.name == "Chris" && data.email == "bruen.chris@gmail.com") {
        done();
      }
    });

    $httpBackend.flush();


    });

});
