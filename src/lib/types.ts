export interface IDims {
  width: string;
  height: string;
}

export interface ISvg {
  name: string; // e.g houseThreeD
  dims: IDims;
  content: string;
}

export interface IReact {
  componentName: string; // e.g HouseThreeD
  code: string;
}
