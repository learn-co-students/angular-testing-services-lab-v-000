describe('UserService', function () {
  
  beforeEach(module('app'));
  var UserService, $httpBackend;
  
  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/rest/user')
      .respond({first_name: 'Jesse', last_name: 'Novotny'});
  }));
  

  it('should get the current users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res){
        if(res.data.first_name === 'Jesse' && res.data.last_name === 'Novotny'){
          done()
        };
      });
      $httpBackend.flush();
  })

  it('should join the users first and last name', function(){
    var user = {first_name: 'Jesse', last_name: 'Novotny'}
    expect(UserService.createFullName(user)).toEqual('Jesse Novotny')
  })
});
