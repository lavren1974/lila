import { storage } from 'lib/storage';
import { confirm } from 'lib/dialogs';

const variantConfirms: Record<string, string> = {
  chess960:
    "This is a Chess960 game!\n\nThe starting position of the pieces on the players' home ranks is randomized.",
  kingOfTheHill:
    'This is a King of the Hill game!\n\nThe game can be won by bringing the king to the center.',
  threeCheck: 'This is a Three-check game!\n\nThe game can be won by checking the opponent three times.',
  antichess:
    'This is an Antichess game!\n\nIf you can take a piece, you must. The game can be won by losing all your pieces, or by being stalemated.',
  atomic:
    "This is an Atomic chess game!\n\nCapturing a piece causes an explosion, taking out your piece and surrounding non-pawns. Win by mating or exploding your opponent's king.",
  horde:
    'This is a Horde chess game!\nBlack must take all White pawns to win. White must checkmate the Black king.',
  racingKings:
    'This is a Racing Kings game!\n\nPlayers must race their kings to the eighth rank. Checks are not allowed.',
  crazyhouse:
    'This is a Crazyhouse game!\n\nEvery time a piece is captured, the capturing player gets a piece of the same type and of their color in their pocket.',
};

const storageKey = (key: string) => 'lobby.variant.' + key;

export default async function (variant: string | undefined) {
  if (!variant || !variantConfirms[variant] || storage.get(storageKey(variant))) return true;
  const confirmed = await confirm(variantConfirms[variant]);
  if (confirmed) storage.set(storageKey(variant), '1');
  return confirmed;
}
