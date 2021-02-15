import { checkType } from '@cpmech/js2ts';
import { newZeroCustomer } from '..';
import { optionalCustomer, refCustomer } from '../customer';

describe('customer', () => {
  it('should generate newZeroCustomer', () => {
    expect(newZeroCustomer()).toEqual({
      itemId: '',
      aspect: 'CUSTOMER',
      indexSK: '',
      email: '',
      fullName: '',
    });
  });

  it('reference should equal zero object', () => {
    expect(refCustomer).toStrictEqual(newZeroCustomer());
  });

  it('"reference" and "optional" should help to check "Iany" type', () => {
    const bad1 = { itemId: '', aspect: 'CUSTOMER', indexSK: '' };
    const ok1 = {
      itemId: '',
      aspect: 'CUSTOMER',
      indexSK: '',
      email: '',
      fullName: '',
    };
    const ok2 = {
      itemId: '',
      aspect: 'CUSTOMER',
      indexSK: '',
      email: '',
    };
    expect(checkType(refCustomer, bad1, optionalCustomer)).toBeNull();
    expect(checkType(refCustomer, ok1, optionalCustomer)).toStrictEqual(ok1);
    expect(checkType(refCustomer, ok2, optionalCustomer)).toStrictEqual(ok2);
  });
});
