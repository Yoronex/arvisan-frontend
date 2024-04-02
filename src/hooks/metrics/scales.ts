export interface MetricScale {
  name?: string,
  mapper?: ((x: number) => number),
}

export const linearScale: MetricScale = {
  name: undefined,
  mapper: undefined,
};

export const sqrtScale: MetricScale = {
  name: 'sqrt',
  mapper: (x: number) => Math.sqrt(x),
};

export const logScale: MetricScale = {
  name: 'log',
  mapper: (x: number) => Math.log(x + 1),
};
