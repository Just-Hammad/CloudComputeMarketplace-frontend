jest.mock('../src/models/Computer', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  countDocuments: jest.fn(),
  create: jest.fn(),
}));

const Computer = require('../src/models/Computer');
const { getComputers, getComputer, createComputer } = require('../src/controllers/computerController');

const mockRes = () => ({
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
});

const chain = (resolved) => ({
  populate: jest.fn().mockReturnThis(),
  skip: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  lean: jest.fn().mockResolvedValue(resolved),
});

describe('computerController.getComputers', () => {
  beforeEach(() => {
    Computer.find.mockReset();
    Computer.countDocuments.mockReset();
  });

  it('returns paginated computer listings', async () => {
    const docs = [{ _id: 'c1', title: 'Rig 1' }, { _id: 'c2', title: 'Rig 2' }];
    Computer.countDocuments.mockResolvedValue(2);
    Computer.find.mockReturnValue(chain(docs));

    const res = mockRes();
    await getComputers({ query: {} }, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        count: 2,
        data: docs,
        pagination: expect.objectContaining({ totalItems: 2 }),
      }),
    );
  });

  it('passes category and search filters through to the query', async () => {
    Computer.countDocuments.mockResolvedValue(0);
    Computer.find.mockReturnValue(chain([]));

    const res = mockRes();
    await getComputers({ query: { category: 'Gaming', search: 'RTX' } }, res);

    const firstArg = Computer.find.mock.calls[0][0];
    expect(firstArg.categories).toBe('Gaming');
    expect(Array.isArray(firstArg.$or)).toBe(true);
  });
});

describe('computerController.getComputer', () => {
  beforeEach(() => Computer.findById.mockReset());

  it('returns 404 when the computer is not found', async () => {
    Computer.findById.mockReturnValue(chain(null));
    const res = mockRes();
    await getComputer({ params: { id: 'missing' } }, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('returns 200 with the computer when found', async () => {
    const doc = { _id: 'c1', title: 'Rig' };
    Computer.findById.mockReturnValue(chain(doc));
    const res = mockRes();
    await getComputer({ params: { id: 'c1' } }, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: doc }),
    );
  });
});

describe('computerController.createComputer', () => {
  beforeEach(() => Computer.create.mockReset());

  it('blocks buyers from creating listings with 403', async () => {
    const res = mockRes();
    await createComputer(
      { body: { title: 'X' }, user: { id: 'u1', profileType: 'buyer' } },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(403);
    expect(Computer.create).not.toHaveBeenCalled();
  });

  it('creates a listing for sellers with 201', async () => {
    const created = { _id: 'c-new', title: 'X' };
    Computer.create.mockResolvedValue(created);
    const res = mockRes();
    await createComputer(
      { body: { title: 'X' }, user: { id: 'u1', profileType: 'seller' } },
      res,
    );
    expect(Computer.create).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'X', user: 'u1' }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: true, data: created }),
    );
  });

  it('returns 400 on mongoose validation errors', async () => {
    const err = new Error('bad');
    err.name = 'ValidationError';
    err.errors = { title: { message: 'Title is required' } };
    Computer.create.mockRejectedValue(err);

    const res = mockRes();
    await createComputer(
      { body: {}, user: { id: 'u1', profileType: 'both' } },
      res,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: 'Title is required' }),
    );
  });
});
