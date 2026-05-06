import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PricingPage from '../index';
import { ThemeProvider } from '../../../context/ThemeContext';
import { SidebarProvider } from '../../../context/SidebarContext';
import { DashboardModeProvider } from '../../../context/DashboardModeContext';

describe('PricingPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <DashboardModeProvider>
            <SidebarProvider>
              <PricingPage />
            </SidebarProvider>
          </DashboardModeProvider>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
