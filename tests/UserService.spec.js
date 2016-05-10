describe('UserService', function () {
  beforeEach(module('app'));

  var UserService;
  var $httpBackend;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({user: 'Don', email: 'don@don.com'});

  }));

  it('should return user info', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService.getUser().then(function(resp){
      var data = resp.data;
      if(data.user === 'Don' && data.email === 'don@don.com'){
        done();
      }
    });

    $httpBackend.flush();
  });

  var me = {
    first_name: "Don",
    last_name: "Febbraio"
  };

  it('should return users fullname', function(){
    expect(UserService.createFullName(me)).toEqual('Don Febbraio');
  });


});
