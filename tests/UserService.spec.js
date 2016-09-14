describe('UserService', function () {
    beforeEach(module('app'));
    var UserService;
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
        $httpBackend.when('GET', '/rest/user').respond({first_name: 'brad', last_name: 'reiss'});
	}));
 
    it('should get the current user info', function (done) {
		$httpBackend.expectGET('/rest/user');
		UserService
			.getUser()
			.then(function(response){
				if (response.data.first_name === 'brad' && response.data.last_name === 'reiss') {
					done();
				}
			});
		$httpBackend.flush();
	});

	it('check the name concat thing', function () {
		expect(UserService.createFullName({first_name: 'brad', last_name: 'reiss'})).toEqual('brad reiss');
	});
});