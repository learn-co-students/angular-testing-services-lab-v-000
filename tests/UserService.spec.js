describe('UserService', function () {
  beforeEach(module('app'));
  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Michael', last_name: 'Simon'});
  }));

  it('should get the current users information', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
    .getUser()
    .then(function(res){
      var data = res.data;
      if (data.first_name === 'Michael' && data.last_name === 'Simon') {
        done();
      }
    });
    $httpBackend.flush();
  });

  it('should get the Users fullname', function(done){
    if (
      UserService
      .createFullName({first_name: 'Michael', last_name: 'Simon'}) ==='Michael Simon'
    ) {
      done();
    }
  });
});
