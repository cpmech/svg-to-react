export interface ICustomer {
  itemId: string; // userId: same as Cognito's username
  aspect: 'CUSTOMER';
  indexSK: string; // createdAt
  email: string;

  fullName?: string | null; // 'null' is important for GraphQL
}

export type ICustomerOptional = {
  [P in keyof Required<Omit<ICustomer, 'itemId' | 'aspect' | 'indexSK' | 'email'>>]: boolean;
};

export const newZeroCustomer = (): ICustomer => ({
  itemId: '',
  aspect: 'CUSTOMER',
  indexSK: '',
  email: '',

  fullName: '',
});

export const refCustomer: ICustomer = {
  itemId: '',
  aspect: 'CUSTOMER',
  indexSK: '',
  email: '',

  fullName: '',
};

export const optionalCustomer: ICustomerOptional = {
  fullName: true,
};
