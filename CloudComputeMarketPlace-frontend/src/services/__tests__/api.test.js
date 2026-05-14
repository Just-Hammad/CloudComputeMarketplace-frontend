import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import api from '../api';

// The request interceptor is the first one registered on api.interceptors.request
const requestInterceptor = api.interceptors.request.handlers[0];

describe('api axios instance', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('uses the local backend baseURL', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:5001');
  });

  it('sends JSON by default', () => {
    expect(api.defaults.headers['Content-Type']).toBe('application/json');
  });

  it('attaches the bearer token from localStorage to outgoing requests', () => {
    localStorage.setItem('token', 'abc.def.ghi');
    const config = { headers: {} };
    const result = requestInterceptor.fulfilled(config);
    expect(result.headers.Authorization).toBe('Bearer abc.def.ghi');
  });

  it('does not attach an Authorization header when no token is stored', () => {
    const config = { headers: {} };
    const result = requestInterceptor.fulfilled(config);
    expect(result.headers.Authorization).toBeUndefined();
  });

  it('forwards interceptor rejections', async () => {
    const err = new Error('boom');
    await expect(requestInterceptor.rejected(err)).rejects.toBe(err);
  });
});
