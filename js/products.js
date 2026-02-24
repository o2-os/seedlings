export const products = [
  {
    id: "2026newyearpostcard",
    name: "New Years Post Card",
    price: "Free",
    description: "Happy New Year!",
    img: "./images/IMG_1319.jpg",
    previewTrack: null,
    buyUrl: null,
    downloadable: false
  },
  {
    id: "seedling001",
    name: "o2.os - Start Where You Are",
    price: "$8",
    description: "",
    img: "./images/seedling001-cover.jpg",
    // Single file — one combined mix
    previewTrack: "previews/o2.os - Start Where You Are Mixed Side A.mp3",
    buyUrl: "#",
    downloadable: true
  },
  {
    id: "seedling002",
    name: "Some Multi-Track Release",
    price: "$10",
    description: "",
    img: "./images/seedling002-cover.jpg",
    // Multiple files — auto-advances track by track
    previewTrack: [
      "previews/seedling002-track01.mp3",
      "previews/seedling002-track02.mp3",
      "previews/seedling002-track03.mp3"
    ],
    buyUrl: "#",
    downloadable: true
  }
];