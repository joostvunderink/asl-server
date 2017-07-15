import * as mocha from 'mocha';
import { chapp, app, expect, authedReq, disableAuthentication, enableAuthentication } from './helper';

describe('users endpoint', () => {
  beforeEach(disableAuthentication);
  afterEach(enableAuthentication);

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

          const roles = user.roles;
          expect(roles).to.be.an('array');
          expect(roles).to.have.length(2);

          const roleNames = roles.map(role => role.name).sort();
          expect(roleNames).to.deep.equal(['admin', 'user']);
        });
    });
  });

});