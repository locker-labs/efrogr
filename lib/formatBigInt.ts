export default function formatBigInt(value: bigint): string {
  const num = Number(value);

  if (num < 1000) {
    return num.toString();
  }

  const units = ["", "K", "M", "B", "T"];
  let unitIndex = 0;
  let formattedNum = num;

  while (formattedNum >= 1000 && unitIndex < units.length - 1) {
    formattedNum /= 1000;
    unitIndex++;
  }

  if (unitIndex >= units.length - 1 && formattedNum >= 1000) {
    return "LOL";
  }

  const isWholeNumber = formattedNum % 1 === 0;
  return (
    (isWholeNumber ? Math.round(formattedNum) : formattedNum.toFixed(1)) +
    units[unitIndex]
  );
}
