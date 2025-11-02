
import { priceBedsBaths } from '../../apps/web/lib/format';

it('shows Studio for 0 bedrooms', () => {
  expect(priceBedsBaths(1200, 0, 1)).toBe('$1,200/mo • Studio • 1 ba');
});

it('shows full line when beds & baths exist', () => {
  expect(priceBedsBaths(1800, 2, 1)).toBe('$1,800/mo • 2 bd • 1 ba');
});

it('omits missing parts (beds present, baths missing)', () => {
  expect(priceBedsBaths(2200, 3, null)).toBe('$2,200/mo • 3 bd');
});

it('omits missing parts (baths present, beds missing)', () => {
  expect(priceBedsBaths(1500, null, 2)).toBe('$1,500/mo • 2 ba');
});

it('shows price only when both beds and baths are missing', () => {
  expect(priceBedsBaths(1800, null, null)).toBe('$1,800/mo');
});

it('shows Studio even when baths are missing', () => {
  expect(priceBedsBaths(995, 0, null)).toBe('$995/mo • Studio');
});
