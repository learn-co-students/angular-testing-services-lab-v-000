describe('UserService', function () {

  beforeEach(module('app'));

  var UserService;

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

  $httpBackend.when('GET', '/rest/user').respond({first_name: 'Ryan', last_name: 'McNeely'})
}));

  it('Should make correct $http requests', function(done) {
    $httpBackend.expectGET('/rest/user')
    UserService
      .getUser()
      .then(function (res){
        var data = res.data
        if (data.first_name === 'Ryan' && data.last_name === 'McNeely'){
        done()
      }
    });

    $httpBackend.flush();

  });

  it('Should have an injection that that creates a full name', function(){
    expect(UserService.createFullName({first_name: 'Ryan', last_name: 'McNeely'})).toEqual('Ryan McNeely')
  });
});
