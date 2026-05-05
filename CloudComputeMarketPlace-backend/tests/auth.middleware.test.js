process.env.JWT_SECRET = 'test-secret';
const jwt = require('jsonwebtoken');

// Mock the User model so we don't need a database
jest.mock('../src/models/User', () => ({
  findById: jest.fn(),
}));
const User = require('../src/models/User');
const { protect, authorize } = require('../src/middleware/auth');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

describe('protect middleware', () => {
  beforeEach(() => User.findById.mockReset());

  it('rejects requests without a token (401)', async () => {
    const res = mockRes();
    const next = jest.fn();
    await protect({ headers: {} }, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects an invalid token (401)', async () => {
    const res = mockRes();
    const next = jest.fn();
    await protect(
      { headers: { authorization: 'Bearer not-a-real-token' } },
      res,
      next,
    );
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('attaches req.user and calls next() for a valid token', async () => {
    const fakeUser = { _id: 'u1', name: 'Test', profileType: 'buyer' };
    User.findById.mockResolvedValue(fakeUser);
    const token = jwt.sign({ id: 'u1' }, process.env.JWT_SECRET);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = mockRes();
    const next = jest.fn();
    await protect(req, res, next);
    expect(req.user).toBe(fakeUser);
    expect(next).toHaveBeenCalled();
  });

  it('rejects when user no longer exists (401)', async () => {
    User.findById.mockResolvedValue(null);
    const token = jwt.sign({ id: 'u1' }, process.env.JWT_SECRET);
    const res = mockRes();
    const next = jest.fn();
    await protect(
      { headers: { authorization: `Bearer ${token}` } },
      res,
      next,
    );
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('authorize middleware', () => {
  it('allows users whose profileType matches', () => {
    const next = jest.fn();
    const res = mockRes();
    authorize('seller')({ user: { profileType: 'seller' } }, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('blocks users whose profileType does not match (403)', () => {
    const next = jest.fn();
    const res = mockRes();
    authorize('seller')({ user: { profileType: 'buyer' } }, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
