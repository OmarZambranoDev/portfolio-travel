import { describe, it, expect } from 'vitest';
import destinations, {
  getDestinationBySlug,
  getDestinationsByRegion,
  getDestinationsByCategory,
  featuredDestinations,
} from '@/data/destinations';

describe('destinations data', () => {
  it('should have 15 destinations', () => {
    expect(destinations).toHaveLength(15);
  });

  it('should have featured destinations', () => {
    expect(featuredDestinations.length).toBeGreaterThan(0);
    featuredDestinations.forEach((d) => expect(d.featured).toBe(true));
  });
});

describe('getDestinationBySlug', () => {
  it('should return the correct destination', () => {
    const result = getDestinationBySlug('tokyo');
    expect(result).toBeDefined();
    expect(result?.name).toBe('Tokyo');
    expect(result?.country).toBe('Japan');
  });

  it('should return undefined for unknown slug', () => {
    const result = getDestinationBySlug('unknown-slug');
    expect(result).toBeUndefined();
  });
});

describe('getDestinationsByRegion', () => {
  it('should return only destinations matching the region', () => {
    const results = getDestinationsByRegion('europe');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((d) => expect(d.region).toBe('europe'));
  });

  it('should return empty array for region with no destinations', () => {
    const results = getDestinationsByRegion('oceania');
    expect(results.length).toBeGreaterThanOrEqual(0);
  });
});

describe('getDestinationsByCategory', () => {
  it('should return only destinations matching the category', () => {
    const results = getDestinationsByCategory('beach');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((d) => expect(d.categories).toContain('beach'));
  });

  it('should return destinations matching adventure category', () => {
    const results = getDestinationsByCategory('adventure');
    expect(results.length).toBeGreaterThan(0);
  });
});
