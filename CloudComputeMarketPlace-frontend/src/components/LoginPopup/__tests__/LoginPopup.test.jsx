import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginPopup from '../index';
import { AuthContext } from '../../../context/AuthContext';

const renderWithAuth = (ui, ctxOverrides = {}) => {
  const ctx = {
    login: vi.fn().mockResolvedValue({}),
    error: null,
    clearErrors: vi.fn(),
    ...ctxOverrides,
  };
  const utils = render(
    <MemoryRouter>
      <AuthContext.Provider value={ctx}>{ui}</AuthContext.Provider>
    </MemoryRouter>,
  );
  return { ...utils, ctx };
};

describe('LoginPopup', () => {
  it('renders nothing when isOpen is false', () => {
    const { container } = renderWithAuth(
      <LoginPopup isOpen={false} onClose={() => {}} onSwitchToSignup={() => {}} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders the form when open', () => {
    renderWithAuth(
      <LoginPopup isOpen={true} onClose={() => {}} onSwitchToSignup={() => {}} />,
    );
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
  });

  it('calls login() with the typed email and password on submit', async () => {
    const onClose = vi.fn();
    const { ctx } = renderWithAuth(
      <LoginPopup isOpen={true} onClose={onClose} onSwitchToSignup={() => {}} />,
    );
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'a@b.co');
    await userEvent.type(screen.getByPlaceholderText(/password/i), 'secret12');
    await userEvent.click(screen.getByRole('button', { name: /^login$/i }));

    expect(ctx.login).toHaveBeenCalledWith('a@b.co', 'secret12');
    expect(onClose).toHaveBeenCalled();
  });

  it('shows an error message when the context has one', () => {
    renderWithAuth(
      <LoginPopup isOpen={true} onClose={() => {}} onSwitchToSignup={() => {}} />,
      { error: 'Invalid credentials' },
    );
    expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
  });

  it('calls onSwitchToSignup when the signup link is clicked', async () => {
    const onSwitchToSignup = vi.fn();
    renderWithAuth(
      <LoginPopup isOpen={true} onClose={() => {}} onSwitchToSignup={onSwitchToSignup} />,
    );
    await userEvent.click(screen.getByText(/sign up/i));
    expect(onSwitchToSignup).toHaveBeenCalled();
  });
});
