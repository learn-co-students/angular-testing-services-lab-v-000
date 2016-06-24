describe('UserService', function () {

	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function($injector) {
		UserService = $injector.get('UserService')
		$httpBackend = $injector.get('$httpBackend')

		$httpBackend.when('GET', '/rest/user').respond({
			first_name: 'Brett',
			last_name: 'Heenan'
		});
	}));

	it('renders the correct response', function(done) {
		$httpBackend.expectGET('/rest/user');

		UserService
			.getUser()
			.then(function(response) {
				var data = response.data;
				if (data.first_name === 'Brett' && data.last_name === 'Heenan') {
					done();
				};
			});
		$httpBackend.flush();	
	});

	it('correctly calls createFullName function', function() {
		$httpBackend.expectGET('/rest/user');
		var user;

		UserService
			.getUser()
			.then(function(response) {
				user = response.data;
			});

		$httpBackend.flush();

		expect(UserService.createFullName(user)).toEqual('Brett Heenan');

	})


});
