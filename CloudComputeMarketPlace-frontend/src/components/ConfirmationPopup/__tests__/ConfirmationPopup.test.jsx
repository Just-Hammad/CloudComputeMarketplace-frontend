import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmationPopup from '../index';

describe('ConfirmationPopup', () => {
  it('returns null when isOpen is false', () => {
    const { container } = render(
      <ConfirmationPopup
        isOpen={false}
        onClose={() => {}}
        onConfirm={() => {}}
        title="t"
        message="m"
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders title and message when open', () => {
    render(
      <ConfirmationPopup
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        title="Delete listing?"
        message="This cannot be undone."
      />,
    );
    expect(screen.getByText('Delete listing?')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
  });

  it('calls onConfirm when the danger button is clicked', async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmationPopup
        isOpen={true}
        onClose={() => {}}
        onConfirm={onConfirm}
        title="t"
        message="m"
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /yes, delete/i }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the cancel button is clicked', async () => {
    const onClose = vi.fn();
    render(
      <ConfirmationPopup
        isOpen={true}
        onClose={onClose}
        onConfirm={() => {}}
        title="t"
        message="m"
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
