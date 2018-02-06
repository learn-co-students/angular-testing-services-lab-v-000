describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');


    $httpBackend.when('GET', '/rest/user').respond({
      user: "Cernan Bernardo", email: "cernan@gmail.com"
    });
  }));

  it('should make a get request', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        var data = res.data;
        if (data.email === 'cernan@gmail.com' && data.user === 'Cernan Bernardo'){
          done();
        }
      });
    $httpBackend.flush();
  });

  it('should combine the user"s first and last name', function(){
    expect(UserService.createFullName({first_name: "Cernan", last_name: "Bernardo"})).toBe('Cernan Bernardo');
  });
});
