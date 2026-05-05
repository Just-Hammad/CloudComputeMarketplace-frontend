import { describe, it, expect } from 'vitest';
import { generateAvatarUrl } from '../avatar';

describe('generateAvatarUrl', () => {
  it('encodes the username into the seed parameter', () => {
    const url = generateAvatarUrl('Ahmad Hassan');
    expect(url).toBe('https://api.dicebear.com/7.x/pixel-art/svg?seed=Ahmad%20Hassan');
  });
  it('falls back to "anonymous" when username is missing', () => {
    expect(generateAvatarUrl()).toContain('seed=anonymous');
    expect(generateAvatarUrl(null)).toContain('seed=anonymous');
    expect(generateAvatarUrl('')).toContain('seed=anonymous');
  });
});
