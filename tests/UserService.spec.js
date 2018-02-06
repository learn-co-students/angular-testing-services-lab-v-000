describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Marco', last_name: 'Tsui'});
  }));

  it('should get the user information', function(done){
    $httpBackend.expectGET('/rest/user');
    UserService
      .getUser()
      .then(function(user) {
        var data =  user.data
        if(data.first_name === "Marco"  && data.last_name === "Tsui") {
          done();
        }
      });
      $httpBackend.flush();
  });

  it('should combine the first name and last name of the user', function (done) {
    var user = UserService
      .getUser()
      .then(function(user) {
        var data = user.data;
        var fullName = UserService.createFullName(data);
        if (fullName === 'Marco Tsui') {
          done();
        }
      })
    $httpBackend.flush();
  });



});
