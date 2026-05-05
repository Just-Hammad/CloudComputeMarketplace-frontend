import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { StatsProvider, useStats } from '../StatsContext';

const wrapper = ({ children }) => <StatsProvider>{children}</StatsProvider>;

describe('StatsContext', () => {
  it('starts at version 1', () => {
    const { result } = renderHook(() => useStats(), { wrapper });
    expect(result.current.statsVersion).toBe(1);
  });
  it('refreshStats increments the version', () => {
    const { result } = renderHook(() => useStats(), { wrapper });
    act(() => result.current.refreshStats());
    act(() => result.current.refreshStats());
    expect(result.current.statsVersion).toBe(3);
  });
});
