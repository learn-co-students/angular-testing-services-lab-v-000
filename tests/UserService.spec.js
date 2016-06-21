describe('UserService', function () {

  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Bill', last_name: 'Gates'});
  }));

  it('gets users logged in information', function(done){
    $httpBackend.expectGET('rest/user')

    UserService
      .getUser()
      .then(function(response){
        var data = response.data;
        if(data.first_name === 'Bill' && data.last_name === 'Gates'){
          done();
        };
      });

    $httpBackend.flush();
  });

  it('joins the users first and last name with a space in between', function(done){
    $httpBackend.expectGET('rest/user')

    UserService
      .getUser()
      .then(function(response){
        var data = response.data
        if (UserService.createFullName(data) === 'Bill Gates'){
          done();
        };
      });

      $httpBackend.flush();
  });

});
