describe('UserService', function () {
  beforeEach(module('app'));

  var UserService, $httpBackend;

  beforeEach(inject(function ($injector) {
    UserService = $injector.get('UserService');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/rest/user').respond({first_name: 'Adrian', last_name: 'Prieto'});
  }));

  it('should get the current user information', function (done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function (response) {
				var userData = response.data;
				if (userData.first_name === 'Adrian' && userData.last_name === 'Prieto') {
					done();
				}
			});

		$httpBackend.flush();
	});

  it('should concatenate correctly', function () {
      expect(UserService.createFullName({
        first_name: 'Adrian',
        last_name: 'Prieto'
      })).toEqual('Adrian Prieto');
  });
});
