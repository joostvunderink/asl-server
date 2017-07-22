import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuth, enableAuth } from './helper';

describe('users endpoint', () => {
  beforeEach(disableAuth);
  afterEach(enableAuth);

  describe('GET user', () => {
    it('should include user\'s roles', () => {
      return chapp.get('/api/v1/users/1?filter={"include":"roles"}')
        .then(res => {
          const user = res.body;
          expect(user).to.include.all.keys([
            'id',
            'email',
            'roles',
          ]);
          expect(user).to.not.have.property('password');

          const roles = user.roles;
          expect(roles).to.be.an('array');
          expect(roles).to.have.length(2);

          const roleNames = roles.map(role => role.name).sort();
          expect(roleNames).to.deep.equal(['admin', 'user']);
        });
    });
  });

});
