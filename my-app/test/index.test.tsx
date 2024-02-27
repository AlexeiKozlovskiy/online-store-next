import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders a heading', () => {
    const { getByText } = render(<Home />);

    const descriptionText = getByText('Get started by editing');
    expect(descriptionText).toBeInTheDocument();
  });
});
