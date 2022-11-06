export const normalize = (x: number, min: number, max: number, scale = 100) => {
  return +(((x - min) / (max - min)) * scale).toFixed(2);
};

export const getNewXFromRange = (
  value: number,
  newMin: number,
  newMax: number
) => {
  const newRange = newMax - newMin;
  return +((value * newRange) / 100 + newMin).toFixed(2);
};

export const getNewXFromSet = (value: number, set: number[]) => {
  const rescaledValue = getNewXFromRange(value, set[0], set[set.length - 1]);
  const closest = set.reduce(function (prev, curr) {
    return Math.abs(curr - rescaledValue) < Math.abs(prev - rescaledValue)
      ? curr
      : prev;
  });
  return closest;
};

export const checkForValidCharacter = (
  e: React.KeyboardEvent<HTMLDivElement>
) => {
  const periodCharCode = 190;
  const enterCharCode = 13;
  const acceptedCharCodes = [8, 35, 36, 37, 38, 39, 40, 46, periodCharCode];
  var x = e.charCode || e.keyCode;
  console.log(x);
  if (
    (isNaN(+String.fromCharCode(e.which)) && !acceptedCharCodes.includes(x)) ||
    x === enterCharCode ||
    (x === periodCharCode && e.currentTarget.innerText.includes('.')) ||
    (x === periodCharCode && !e.currentTarget.innerText)
  )
    return false;
  return true;
};
