import { checkType } from '@cpmech/js2ts';
import { newZeroData, refData } from '..';

describe('data', () => {
  it('should return zero data', () => {
    expect(newZeroData()).toEqual({ email: '' });
  });

  it('reference should help to check "Iany" type', () => {
    const bad1 = { notEmail: '' };
    const ok1 = { email: '' };
    expect(checkType(refData, bad1)).toBeNull();
    expect(checkType(refData, ok1)).toEqual({ email: '' });
  });
});
