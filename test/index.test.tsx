import { act, render, screen } from '@testing-library/react';
// import Home from '@/app/page';
import Header from '@/components/header/header';
import ReduxProvider from '@/components/redux-provider';

// jest.mock('./utils', () => ({
//   getData: jest.fn().mockResolvedValue([
//     {
//       id: '15',
//       name: 'Nutcracker',
//       price: 10,
//       stock: 27,
//       collection: 2023,
//       color: 'blue',
//       size: 20,
//       favorite: true,
//       category: 'Christmas decorations',
//       images: ['/assets/products/nutcracker-polyresin-20-cm.jpg', '/assets/products/nutcracker-polyresin-20-cm(1).jpg'],
//     },
//   ]),
// }));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe('Home', () => {
  class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  global.ResizeObserver = ResizeObserverMock;

  // it('renders home page', async () => {
  //    render(<Home />);
  //   await waitFor(() => {
  //     const descriptionText = screen.getByText(/Find Christmas decorations/i);
  //     expect(descriptionText).toBeInTheDocument();
  //   });
  // });

  it('renders header', async () => {
    render(
      <ReduxProvider>
        <Header />
      </ReduxProvider>
    );

    await act(() => {
      const descriptionText = screen.getAllByText(/Christmas/i)[0];
      expect(descriptionText).toBeInTheDocument();
    });
  });
});
