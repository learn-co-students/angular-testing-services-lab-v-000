describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject( function ($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Danny', last_name: 'Dawson'});

  }));
  
  it('should get the users info', function (done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res){
        var data = res.data;
        if (data.first_name === 'Danny' && data.last_name === 'Dawson') {
          done();
        }
      });
    $httpBackend.flush() 
  });

  it('should return the full name', function (done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function (res){
        var user = res.data;
        if (UserService.createFullName(user) === 'Danny Dawson') {
          done();
        }
      });
    $httpBackend.flush() 
  });
});
