import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from '../index';
import { ThemeProvider } from '../../../context/ThemeContext';
import { SidebarProvider } from '../../../context/SidebarContext';
import { DashboardModeProvider } from '../../../context/DashboardModeContext';
import { StatsProvider } from '../../../context/StatsContext';

describe('LandingPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ThemeProvider>
          <DashboardModeProvider>
            <SidebarProvider>
              <StatsProvider>
                <LandingPage />
              </StatsProvider>
            </SidebarProvider>
          </DashboardModeProvider>
        </ThemeProvider>
      </MemoryRouter>,
    );
    expect(container.firstChild).toBeTruthy();
  });
});
