export const DEFAULT_NODE_COLOR = '#7B7D7D';
export const DEFAULT_NODE_COLOR_RATIO = ['#ff00ff', '#ffff00'];

// From https://github.com/PimpTrizkit/PJs/wiki/12.-Shade,-Blend-and-Convert-a-Web-Color-(pSBC.js)#--version-2-hex--

export function shadeHexColor(color: string, percent: number) {
  const f = parseInt(color.slice(1), 16);
  const t = percent < 0 ? 0 : 255;
  const p = percent < 0 ? percent * -1 : percent;
  // eslint-disable-next-line no-bitwise
  const R = f >> 16;
  // eslint-disable-next-line no-bitwise,no-mixed-operators
  const G = f >> 8 & 0x00FF;
  // eslint-disable-next-line no-bitwise
  const B = f & 0x0000FF;
  return `#${(0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)}`;
}

/**
 * Parse an Hex color string to its rgb values
 * @param hex
 */
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : {
    r: 0,
    g: 0,
    b: 0,
  };
}

/**
 * Get a hex color that is
 * @param ratio color to pick on the gradient. In range [0, 1]
 * @param firstHexColor First (lowest) hex color in the gradient
 * @param secondHexColor Second hex color in the gradient
 * @param remainingHexColors Optional extra colors in the gradient
 */
export function getRatioColor(
  ratio: number,
  firstHexColor: string,
  secondHexColor: string,
  ...remainingHexColors: string[]
): string {
  const colors = [firstHexColor, secondHexColor, ...remainingHexColors]
    .filter((c) => c !== undefined);
  const absoluteRatio = ratio * (colors.length - 1);

  let colorIndex = Math.floor(absoluteRatio);
  if (colorIndex === colors.length - 1) {
    colorIndex -= 1;
  }

  const firstColor = hexToRgb(colors[colorIndex]);
  const secondColor = hexToRgb(colors[colorIndex + 1]);

  const red = Math.round(firstColor.r * (1 - ratio) + secondColor.r * (ratio));
  const green = Math.round(firstColor.g * (1 - ratio) + secondColor.g * (ratio));
  const blue = Math.round(firstColor.b * (1 - ratio) + secondColor.b * (ratio));

  return `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
}
