const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRE = '1h';

const User = require('../src/models/User');

describe('User model', () => {
  it('rejects an invalid email format', async () => {
    const user = new User({ name: 'A', email: 'not-an-email', password: 'pw1234' });
    const err = user.validateSync();
    expect(err).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });

  it('rejects passwords shorter than 6 characters', () => {
    const user = new User({ name: 'A', email: 'a@b.co', password: 'short' });
    const err = user.validateSync();
    expect(err.errors.password).toBeDefined();
  });

  it('matchPassword returns true for the correct password', async () => {
    const plain = 'correctpw';
    const hash = await bcrypt.hash(plain, 10);
    const user = new User({ name: 'A', email: 'a@b.co', password: hash });
    expect(await user.matchPassword(plain)).toBe(true);
    expect(await user.matchPassword('wrongpw')).toBe(false);
  });

  it('getSignedJwtToken returns a non-empty string', () => {
    const user = new User({ name: 'A', email: 'a@b.co', password: 'pw1234' });
    const token = user.getSignedJwtToken();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });
});
