import { render } from '@testing-library/react';

import ThemeSwitcher from '.';

describe('ThemeSwitcher', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ThemeSwitcher />);
    expect(baseElement).toBeTruthy();
  });
});
