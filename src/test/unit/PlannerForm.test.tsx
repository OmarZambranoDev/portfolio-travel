import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PlannerForm } from '@/components/planner/PlannerForm';

const mockOnSubmit = vi.fn();

describe('PlannerForm', () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should render all form fields', () => {
    render(<PlannerForm onSubmit={mockOnSubmit} loading={false} />);
    const labels = screen.getAllByText('Budget');
    expect(labels.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Destination')).toBeInTheDocument();
    expect(screen.getByText('Duration')).toBeInTheDocument();
    expect(screen.getByText('Travel Style')).toBeInTheDocument();
  });

  it('should render all travel style buttons', () => {
    render(<PlannerForm onSubmit={mockOnSubmit} loading={false} />);
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Cultural')).toBeInTheDocument();
    expect(screen.getByText('Relaxation')).toBeInTheDocument();
    expect(screen.getByText('Foodie')).toBeInTheDocument();
    expect(screen.getByText('Luxury')).toBeInTheDocument();
    expect(screen.getByText('Sports & Events')).toBeInTheDocument();
    const budgetButtons = screen.getAllByText('Budget');
    expect(budgetButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('should disable submit button when no destination selected', () => {
    render(<PlannerForm onSubmit={mockOnSubmit} loading={false} />);
    const button = screen.getByRole('button', { name: /generate itinerary/i });
    expect(button).toBeDisabled();
  });

  it('should disable submit button when loading', () => {
    render(<PlannerForm onSubmit={mockOnSubmit} loading={true} />);
    const button = screen.getByRole('button', { name: /generating itinerary/i });
    expect(button).toBeDisabled();
  });

  it('should update active travel style when clicked', async () => {
    const user = userEvent.setup();
    render(<PlannerForm onSubmit={mockOnSubmit} loading={false} />);
    const adventureButton = screen.getByRole('button', { name: 'Adventure' });
    await user.click(adventureButton);
    expect(adventureButton).toHaveClass('bg-primary');
  });

  it('should not call onSubmit when no destination is selected', async () => {
    const user = userEvent.setup();
    render(<PlannerForm onSubmit={mockOnSubmit} loading={false} />);
    const button = screen.getByRole('button', { name: /generate itinerary/i });
    await user.click(button);
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
