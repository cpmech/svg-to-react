export interface IData {
  email: string;
}

export const newZeroData = (): IData => ({ email: '' });

export const refData: IData = { email: '' };
