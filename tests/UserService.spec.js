describe('UserService', function () {

  beforeEach(module('app'))

  var UserService, $httpBackend


  beforeEach(inject(function($injector){
    UserService = $injector.get('UserService')
    $httpBackend = $injector.get('$httpBackend')
    $httpBackend.when('GET', '/rest/user').respond({name: 'hud'})

      }))

    it('should make a get call to rest/user', function() {

      $httpBackend.expectGET('/rest/user')
      UserService
        .getUser()
        .then(function(resp) {
          if (resp.name === 'hud') {
            done()
          }
        })

        $httpBackend.flush()
    })



});
