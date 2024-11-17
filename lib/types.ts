export type IEfrogrTgJson = {
  authDate: number;
  firstName: string;
  lastName: string;
  username: string;
  id: number;
  photoURL: string;
  hash: string;
  iat: number;
};

export type IEfrogrUser = {
  id?: string;
  dynamicUserId: string;
  address: string;
  tgJson: IEfrogrTgJson;
  croakLeft: string;
};
