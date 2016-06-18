describe('UserService', function () {
  beforeEach(module('app'))

  var UserService, $httpBackend

  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService')
    $httpBackend = $injector.get('$httpBackend')

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'deez', last_name: 'nuts'})
  }))

  it('should get user info', function(done){
    $httpBackend.expectGET('/rest/user')

    UserService
      .getUser()
      .then(function(res){
        var data = res.data
        if (data.first_name === 'deez' && data.last_name=== 'nuts'){
          done()
        }
      })

      $httpBackend.flush()
  })

  it('should create full names', function(){
    var user = {first_name: 'deez', last_name: 'nuts'}
    var fullName = UserService.createFullName(user)

    expect(fullName).toBe('deez nuts')
  })

});
