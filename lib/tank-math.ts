export function calculateTankVolumeLiters(
  lengthCm: number,
  widthCm: number,
  heightCm: number,
) {
  return Math.round((lengthCm * widthCm * heightCm) / 1000);
}

export function calculateTankVolumeGallons(liters: number) {
  return Number((liters * 0.264172).toFixed(1));
}
