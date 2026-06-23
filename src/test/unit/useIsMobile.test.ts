import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useIsMobile } from '@/hooks/useIsMobile';

function mockMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    media: '',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('useIsMobile', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return false on desktop width', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true on mobile width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should return false at exactly the breakpoint', () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it('should return true below the breakpoint', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(true);
  });

  it('should respect a custom breakpoint', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useIsMobile(600));
    expect(result.current).toBe(true);
  });
});
