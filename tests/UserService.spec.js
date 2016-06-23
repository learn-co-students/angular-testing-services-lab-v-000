describe('UserService', function () {
  beforeEach(module('app'));
  
  var UserService, $httpBackend;
  
  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    
    $httpBackend
      .when('GET', '/rest/user')
      .respond({
        first_name: 'Dakota', 
        last_name: 'Martinez'
      });
  }));
  
  it('should respond with a users information', function(done){
    $httpBackend.expectGET('/rest/user');
    
    UserService
      .getUser()
      .then(function(response){
        var data = response.data;
        if (data.first_name === 'Dakota' && data.last_name === 'Martinez') {
          done();  
        }
      });
      
    $httpBackend.flush();
  });
});
