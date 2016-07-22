describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({
      first_name: 'Clarke', last_name: 'Griffin'
    });
  }));

  it('should get the current user info', function(done){
    $httpBackend.expectGET('/rest/user');

    UserService
      .getUser()
      .then(function(res) {
        var data = res.data;
        if(data.first_name === 'Clarke' && data.last_name === 'Griffin') {
          done();
        }
      });

      $httpBackend.flush();
  });

  it ('should join the user first name and last name together', function() {
    expect(UserService.createFullName({first_name: 'Clarke', last_name: 'Griffin'})).toEqual('Clarke Griffin');
  });

});
