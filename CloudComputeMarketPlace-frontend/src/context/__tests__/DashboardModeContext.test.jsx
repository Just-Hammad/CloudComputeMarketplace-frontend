import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { DashboardModeProvider, useDashboardMode } from '../DashboardModeContext';

const wrapper = ({ children }) => <DashboardModeProvider>{children}</DashboardModeProvider>;

describe('DashboardModeContext', () => {
  it('defaults to buyer', () => {
    const { result } = renderHook(() => useDashboardMode(), { wrapper });
    expect(result.current.dashboardMode).toBe('buyer');
  });
  it('switches to seller', () => {
    const { result } = renderHook(() => useDashboardMode(), { wrapper });
    act(() => result.current.setDashboardMode('seller'));
    expect(result.current.dashboardMode).toBe('seller');
  });
  it('throws outside provider', () => {
    expect(() => renderHook(() => useDashboardMode())).toThrow(/DashboardModeProvider/);
  });
});
