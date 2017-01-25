describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  var user = {first_name: 'Ugh', last_name: 'Derp'};

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET','/rest/user').respond(user);
  }));

  it('should get the current user name', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        if (res.data.first_name === 'Ugh' && res.data.last_name === 'Derp'){
          done();
        }
      });

    $httpBackend.flush();
  });

  it('should get the user fullname', function(){
    expect(UserService.createFullName(user)).toEqual('Ugh Derp');
  });
});
