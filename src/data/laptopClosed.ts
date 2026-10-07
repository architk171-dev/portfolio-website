// Paste a Spotify share link here to show the song tile. While it is empty the tile is hidden.
export const spotifyUrl = "https://open.spotify.com/track/6XQHlsNu6so4PdglFkJQRJ";
// YouTube takes priority over Spotify when set. Add "?start=SECONDS" via youtubeStart.
export const youtubeUrl = "https://www.youtube.com/watch?v=cZAw8qxn0ZE";
export const youtubeStart = 0;
export const spotifyNote = "This song reminds me where I am headed, and not to stop, on my goals or in life.";

export type Tile = {
  id: string;
  ratio: string;
  tag: string;
  title: string;
  text: string;
  chips?: string[];
  media:
    | { kind: "video"; src: string; poster: string }
    | { kind: "image"; src: string }
    | { kind: "carousel"; srcs: string[] };
};

export const tiles: Tile[] = [
  {
    id: "united",
    ratio: "4 / 5",
    tag: "Football",
    title: "Red Devils since 2013",
    text: "A Manchester United fan since 2013 and an active member of the Delhi United Supporters Club. I got to catch their first game of the season live.",
    media: { kind: "video", src: "/closed/united.mp4", poster: "/closed/united-poster.webp" },
  },
  {
    id: "sneakers",
    ratio: "4 / 5",
    tag: "Street wear",
    title: "Sneakers and hype",
    text: "Deep into street wear and hype culture. I interned at CrepDogCrew before their stores opened, built a good collection of shoes and sourced sneakers for a couple of celebrities.",
    media: { kind: "video", src: "/closed/sneakers.mp4", poster: "/closed/sneakers-poster.webp" },
  },
  {
    id: "trek",
    ratio: "3 / 4",
    tag: "Trekking",
    title: "Himachal on foot",
    text: "I love being up in the mountains and have trekked across Himachal.",
    chips: ["Hampta Pass", "Triund", "Kheerganga", "Jalori Pass", "and more"],
    media: { kind: "image", src: "/closed/trek.webp" },
  },
  {
    id: "coco",
    ratio: "1 / 1",
    tag: "Dog lover",
    title: "Coco",
    text: "We adopted Coco when she was two months old. She is the softest, floofiest reason our home feels like home, and we are so grateful she is ours.",
    media: { kind: "video", src: "/closed/coco.mp4", poster: "/closed/coco-poster.webp" },
  },
  {
    id: "cocktails",
    ratio: "4 / 5",
    tag: "Cocktails",
    title: "Shaken, not rushed",
    text: "I love a good cocktail. Becoming a part-time bartender is still a dream.",
    media: { kind: "carousel", srcs: ["/closed/cocktail-1.webp", "/closed/cocktail-2.webp"] },
  },
];
