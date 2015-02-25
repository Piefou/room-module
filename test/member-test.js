var assert = require('assert');
var Member = require('../lib/member').Member;

describe('Member', function() {

	describe('#Constructor()', function() {
		it('should be an instance of Member', function(){
			var member = new Member();
			assert.ok(member instanceof Member, "member is not an instance of Member");
		});
	});
	
	describe('#getToken()', function() {
		it('should be return the token of the member', function(){
			var member = new Member();
			assert.ok(member.getToken().length == 16, "member's token is invalid");
		});
	});

	describe('#get/set()', function() {
		it('should set the data of the member and then return it', function(){
			var member = new Member();
			member.set('name', 'toto');
			assert.ok(member.get('name') == 'toto', "member's data invalid");
		});
	});
	
});