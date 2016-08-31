describe('UserService', function () {
   beforeEach(module('app'));
 
    var UserService, $httpBackend;
 
    beforeEach(inject(function ($injector) {
        UserService = $injector.get('UserService');
        $httpBackend = $injector.get('$httpBackend');
 
        $httpBackend.when('GET', '/rest/user').respond({user: 'Bill Gates', email: 'bill@microsoft.com'});
    }));

    it('should retrieve user data', function(done){
    	$httpBackend.expectGET('/rest/user');

    	UserService
    		.getUser()
    		.then(function(response){
    			var realData = response.data;

    			if(realData.email === 'bill@microsoft.com' && realData.user === 'Bill Gates'){
    			 	done();
    			}
    		});

    		$httpBackend.flush();
    });

    it("should return a full name", function(){
    	expect(UserService.createFullName({first_name: 'Vin', last_name: 'Vasir'})).toEqual('Vin Vasir');
    })
});
