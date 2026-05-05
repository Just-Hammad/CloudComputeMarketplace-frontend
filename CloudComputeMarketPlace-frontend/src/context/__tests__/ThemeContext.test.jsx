import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe('ThemeContext', () => {
  it('defaults to light mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.darkMode).toBe(false);
  });
  it('toggles dark mode', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.toggleDarkMode());
    expect(result.current.darkMode).toBe(true);
  });
  it('throws outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/);
  });
});
