import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DestinationFilters } from '@/components/destinations/DestinationFilters';

const mockOnCategoryChange = vi.fn();
const mockOnRegionChange = vi.fn();

const defaultProps = {
  selectedCategory: null,
  selectedRegion: null,
  onCategoryChange: mockOnCategoryChange,
  onRegionChange: mockOnRegionChange,
};

describe('DestinationFilters', () => {
  beforeEach(() => {
    mockOnCategoryChange.mockClear();
    mockOnRegionChange.mockClear();
  });

  it('should render all category filters', () => {
    render(<DestinationFilters {...defaultProps} />);
    expect(screen.getByText('Beach')).toBeInTheDocument();
    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
    expect(screen.getByText('Culture')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
  });

  it('should render all region filters', () => {
    render(<DestinationFilters {...defaultProps} />);
    expect(screen.getByText('Europe')).toBeInTheDocument();
    expect(screen.getByText('Asia')).toBeInTheDocument();
    expect(screen.getByText('Americas')).toBeInTheDocument();
    expect(screen.getByText('Africa')).toBeInTheDocument();
    expect(screen.getByText('Oceania')).toBeInTheDocument();
  });

  it('should call onCategoryChange with category when clicked', async () => {
    const user = userEvent.setup();
    render(<DestinationFilters {...defaultProps} />);
    await user.click(screen.getByText('Beach'));
    expect(mockOnCategoryChange).toHaveBeenCalledWith('beach');
  });

  it('should call onCategoryChange with null when selected category is clicked', async () => {
    const user = userEvent.setup();
    render(<DestinationFilters {...defaultProps} selectedCategory="beach" />);
    await user.click(screen.getByText('Beach'));
    expect(mockOnCategoryChange).toHaveBeenCalledWith(null);
  });

  it('should call onRegionChange with region when clicked', async () => {
    const user = userEvent.setup();
    render(<DestinationFilters {...defaultProps} />);
    await user.click(screen.getByText('Europe'));
    expect(mockOnRegionChange).toHaveBeenCalledWith('europe');
  });

  it('should call onRegionChange with null when selected region is clicked', async () => {
    const user = userEvent.setup();
    render(<DestinationFilters {...defaultProps} selectedRegion="europe" />);
    await user.click(screen.getByText('Europe'));
    expect(mockOnRegionChange).toHaveBeenCalledWith(null);
  });

  it('should show selected variant on active category', () => {
    render(<DestinationFilters {...defaultProps} selectedCategory="beach" />);
    const beachChip = screen.getByText('Beach').closest('span');
    expect(beachChip).toHaveClass('bg-primary');
  });
});
