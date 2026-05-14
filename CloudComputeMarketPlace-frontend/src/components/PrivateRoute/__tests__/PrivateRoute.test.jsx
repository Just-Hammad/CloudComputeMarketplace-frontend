import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from '../index';
import { AuthContext } from '../../../context/AuthContext';

const renderAt = (path, ctx) =>
  render(
    <AuthContext.Provider value={ctx}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/private" element={<div>secret content</div>} />
          </Route>
          <Route path="/" element={<div>public home</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );

describe('PrivateRoute', () => {
  it('shows a loading state while auth is resolving', () => {
    renderAt('/private', { currentUser: null, loading: true });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('redirects unauthenticated users to /', () => {
    renderAt('/private', { currentUser: null, loading: false });
    expect(screen.getByText(/public home/i)).toBeInTheDocument();
    expect(screen.queryByText(/secret content/i)).not.toBeInTheDocument();
  });

  it('renders the nested route when the user is authenticated', () => {
    renderAt('/private', { currentUser: { id: 'u1' }, loading: false });
    expect(screen.getByText(/secret content/i)).toBeInTheDocument();
  });
});
