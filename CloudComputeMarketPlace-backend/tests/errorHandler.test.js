const errorHandler = require('../src/middleware/errorHandler');

describe('errorHandler middleware', () => {
  let res;
  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    // silence console.error from the handler during tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  it('returns 404 for a Mongoose CastError', () => {
    const err = new Error('cast');
    err.name = 'CastError';
    err.value = 'abc';
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
  });

  it('returns 400 for a duplicate-key error (code 11000)', () => {
    const err = new Error('dup');
    err.code = 11000;
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 for a Mongoose ValidationError', () => {
    const err = new Error('v');
    err.name = 'ValidationError';
    err.errors = { name: { message: 'name required' } };
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('falls back to 500 for unrecognized errors', () => {
    errorHandler(new Error('boom'), {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
  });
});
