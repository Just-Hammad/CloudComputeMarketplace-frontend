import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { SidebarProvider, useSidebar } from '../SidebarContext';

const wrapper = ({ children }) => <SidebarProvider>{children}</SidebarProvider>;

describe('SidebarContext', () => {
  it('starts closed', () => {
    const { result } = renderHook(() => useSidebar(), { wrapper });
    expect(result.current.isSidebarOpen).toBe(false);
  });
  it('toggleSidebar flips state', () => {
    const { result } = renderHook(() => useSidebar(), { wrapper });
    act(() => result.current.toggleSidebar());
    expect(result.current.isSidebarOpen).toBe(true);
    act(() => result.current.toggleSidebar());
    expect(result.current.isSidebarOpen).toBe(false);
  });
  it('closeSidebar is a no-op when already closed', () => {
    const { result } = renderHook(() => useSidebar(), { wrapper });
    act(() => result.current.closeSidebar());
    expect(result.current.isSidebarOpen).toBe(false);
  });
});
