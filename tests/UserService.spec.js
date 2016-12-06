describe('UserService', function () {

	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function($injector) {
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend.when('GET', '/rest/user').respond({ user: 'Billy Bob', email: 'billy@bob.com' });
	}));

	it ('should get the current users information', function(done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(res) {
				var data = res.data;
				if (data.email === 'billy@bob.com' && data.user === 'Billy Bob') {
					done();
				}
			});

		$httpBackend.flush();
	});

});
