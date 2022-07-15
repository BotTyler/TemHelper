export const kGamesFeatures = new Map<number, string[]>([
  // Temtem nothing is there yet waiting for the temtem api to be released
  [
    21636,
    [
    ]
  ],
]);

export const kGameClassIds = Array.from(kGamesFeatures.keys());

export const kWindowNames = {
  inGame: 'in_game',
  desktop: 'desktop',
  damageCalculator: 'damageCalculator',
  breedingCalc: 'breedingCalc',
  freeTem: 'freeTem',
  teamCreator: 'teamCreator',
  TemTemSelector: 'TemTemSelector'
};
