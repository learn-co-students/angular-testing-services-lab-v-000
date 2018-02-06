describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name:"Bill", last_name: 'Gates'});
  }));

  it('should return user first_name and user last_name', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function(response){
      var user = response.data;
      if (user.first_name === "Bill" && user.last_name === "Gates"){
        done();
      }
    });

    $httpBackend.flush();
  });

  it('should correctly return first_name and last_name appended in a string', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function(response){
      var user = response.data;
      if (UserService.createFullName(user) === "Bill Gates"){
        done();
      }
    });
    $httpBackend.flush();
  });
});
