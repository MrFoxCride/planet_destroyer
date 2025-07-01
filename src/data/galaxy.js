export const sectors = Array.from({ length: 10 }).map((_, i) => {
  const id = `S${i + 1}`;
  const x = i % 5;
  const y = Math.floor(i / 5);
  return {
    id,
    position: { x, y },
    unlocked: i < 2, // first two unlocked
    cost: 20 * (i + 1),
    entities: [
      {
        id: `${id}-P1`,
        type: 'planet',
        name: `Planet ${i + 1}`,
      },
    ],
  };
});
