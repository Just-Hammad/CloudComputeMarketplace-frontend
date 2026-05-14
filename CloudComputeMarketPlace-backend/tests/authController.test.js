process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRE = '1h';
process.env.JWT_COOKIE_EXPIRE = '1';

jest.mock('../src/models/User', () => {
  const create = jest.fn();
  const findOne = jest.fn();
  const findById = jest.fn();
  return { create, findOne, findById };
});

const User = require('../src/models/User');
const { register, login, getMe, logout } = require('../src/controllers/authController');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

const fakeUser = (overrides = {}) => ({
  _id: 'user-1',
  name: 'Test User',
  email: 'test@example.com',
  profileType: 'buyer',
  profilePicture: 'avatar.png',
  getSignedJwtToken: jest.fn(() => 'signed.jwt.token'),
  matchPassword: jest.fn().mockResolvedValue(true),
  ...overrides,
});

describe('authController.register', () => {
  beforeEach(() => {
    User.findOne.mockReset();
    User.create.mockReset();
  });

  it('rejects duplicate emails with 400', async () => {
    User.findOne.mockResolvedValue({ _id: 'existing' });
    const res = mockRes();
    await register(
      { body: { name: 'A', email: 'dup@example.com', password: 'pw1234' } },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: expect.stringMatching(/already/i) }),
    );
    expect(User.create).not.toHaveBeenCalled();
  });

  it('creates a new user and returns a token with 201', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(fakeUser());
    const res = mockRes();
    await register(
      { body: { name: 'New', email: 'new@example.com', password: 'pw1234', profileType: 'seller' } },
      res,
    );
    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'New', email: 'new@example.com', profileType: 'seller' }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, token: 'signed.jwt.token' }),
    );
  });
});

describe('authController.login', () => {
  beforeEach(() => User.findOne.mockReset());

  it('rejects missing email/password with 400', async () => {
    const res = mockRes();
    await login({ body: { email: '', password: '' } }, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('rejects unknown email with 401', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
    const res = mockRes();
    await login({ body: { email: 'nobody@example.com', password: 'pw1234' } }, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('rejects wrong password with 401', async () => {
    const u = fakeUser({ matchPassword: jest.fn().mockResolvedValue(false) });
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(u) });
    const res = mockRes();
    await login({ body: { email: 'test@example.com', password: 'bad' } }, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns a token on valid credentials', async () => {
    const u = fakeUser();
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(u) });
    const res = mockRes();
    await login({ body: { email: 'test@example.com', password: 'pw1234' } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, token: 'signed.jwt.token' }),
    );
  });
});

describe('authController.getMe', () => {
  beforeEach(() => User.findById.mockReset());

  it('returns 401 when req.user is missing', async () => {
    const res = mockRes();
    await getMe({}, res);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('returns 404 when the user no longer exists', async () => {
    User.findById.mockResolvedValue(null);
    const res = mockRes();
    await getMe({ user: { id: 'gone' } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('returns the current user with 200', async () => {
    const u = fakeUser();
    User.findById.mockResolvedValue(u);
    const res = mockRes();
    await getMe({ user: { id: 'user-1' } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: u }),
    );
  });
});

describe('authController.logout', () => {
  it('responds with 200 and a success message', async () => {
    const res = mockRes();
    await logout({}, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true }),
    );
  });
});
