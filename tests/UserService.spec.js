describe('UserService', function () {
	beforeEach(module('app'));
	var UserService, $httpBackend;
	beforeEach(inject(function ($injector) {
		UserService = $injector.get('UserService');
		$httpBackend = $injector.get('$httpBackend');

		$httpBackend
			.when('GET', '/rest/user')
			.respond(200, {
				first_name: 'Bill',
				last_name: 'Gates',
				email: 'bill@microsoft.com'
			});
	}));

	it('should get current users info', function(done) {
			$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(result) {
				var data = result.data;
				if (data.first_name === 'Bill' && data.last_name === 'Gates') {
					done();
				}
			});
		$httpBackend.flush();
	});

	it('should join first and last name', function(done) {
			$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(result) {
				expect(UserService.createFullName(result.data)).toBe('Bill Gates');
				done();

			});
		$httpBackend.flush();
	});
});
