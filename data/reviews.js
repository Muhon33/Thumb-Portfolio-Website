// ─────────────────────────────────────────────────────────────────────────────
// CLIENT REVIEWS
//
// To add a review:
//   1. Put the cropped review screenshot in /public/reviews/
//      (and the client's YouTube profile photo in /public/reviews/avatars/)
//   2. Copy one of the entries below and fill it in.
//
// Fields:
//   platform     "upwork" | "fiverr"  (leave out for a video review sent to you directly)
//   text         the review, typed out exactly as written
//   screenshot   { src, width, height } of the screenshot
//   video        { src, poster, duration } for a video review — put the .mp4
//                and a poster .jpg in /public/reviews/videos/
//   thumbnails   list of { src, width, height, videoUrl, views } — your best
//                thumbnails for this client (1 or 2 looks best). Put the images
//                in /public/reviews/thumbnails/. They show big, beside the review.
//                videoUrl + views are optional (adds a "Watch on YouTube" link).
//   (every review needs text + screenshot, or a video)
//   project      the job title on Upwork / Fiverr              (optional)
//   date         when the review was left                      (optional)
//   name         client's name — leave out if the review has none,
//                the card then shows the platform logo instead
//   avatar       path to the client's profile photo            (optional)
//   youtube      { url, subscribers } if they have a channel   (optional)
//   featured     true = shows as the big card at the top (use on one review)
// ─────────────────────────────────────────────────────────────────────────────

export const PROFILE_LINKS = {
  upwork: "", // paste your Upwork profile URL here to show a "See all" link
  fiverr: "", // paste your Fiverr profile URL here to show a "See all" link
};

export const reviews = [
  {
    featured: true,
    platform: "fiverr",
    name: "Jenny Hoyos",
    avatar: "/reviews/avatars/jenny.jpg",
    youtube: { url: "https://www.youtube.com/@JennyHoyos", subscribers: "12.4M" },
    text: "best thumbnail designer on fiverr!",
    project: "YouTube Thumbnail",
    thumbnails: [
      {
        src: "/reviews/thumbnails/jenny-coins.webp",
        width: 1280,
        height: 720,
        videoUrl: "https://www.youtube.com/watch?v=q2EHTJsZEhI",
        views: "12M+",
      },
      {
        src: "/reviews/thumbnails/jenny-free-stuff.webp",
        width: 1280,
        height: 720,
        videoUrl: "https://www.youtube.com/watch?v=iT4tJ2xIxDE",
        views: "950K+",
      },
    ],
    screenshot: { src: "/reviews/jenny-fiverr.webp", width: 640, height: 135 },
  },
  {
    name: "Kimmy",
    avatar: "/reviews/avatars/kimmy.jpg",
    youtube: { url: "https://www.youtube.com/@kimmye9", subscribers: "99.2K" },
    video: {
      src: "/reviews/videos/kimmy.mp4",
      poster: "/reviews/videos/kimmy-poster.webp",
      duration: "0:27",
    },
  },
  {
    platform: "upwork",
    name: "Sergio",
    avatar: "/reviews/avatars/sergio.jpg",
    youtube: { url: "https://www.youtube.com/@FromSergio", subscribers: "110K" },
    text: "I have been working with Mahbub for several months now and he has been great to work with. Very skilled, delivers on time, and just an overall nice guy, really grateful to have him in the team.",
    project: "YT Thumbnails",
    date: "Jan 2025",
    screenshot: { src: "/reviews/sergio-upwork.webp", width: 1740, height: 250 },
    thumbnails: [
      {
        src: "/reviews/thumbnails/sergio-mac.webp",
        width: 1280,
        height: 720,
        videoUrl: "https://www.youtube.com/watch?v=Kft9Y33oc2I",
        views: "2.2M+",
      },
      {
        src: "/reviews/thumbnails/sergio-watchos.webp",
        width: 1280,
        height: 720,
        videoUrl: "https://www.youtube.com/watch?v=4FEiNiaFEtw",
        views: "1M+",
      },
    ],
  },
  {
    platform: "upwork",
    name: "Jake Call",
    avatar: "/reviews/avatars/jake.jpg",
    youtube: { url: "https://www.youtube.com/@jakeacall", subscribers: "43.9K" },
    text: "This freelancer was able to match my old thumbnail designer's style with ease. Very awesome person to work with, and good with being able to put your ideas into an image! He understands what you need!",
    project: "YouTube Thumbnails",
    date: "Sep 2023",
    screenshot: { src: "/reviews/jake-upwork.webp", width: 1540, height: 320 },
  },
  {
    platform: "fiverr",
    name: "Orson Lord",
    avatar: "/reviews/avatars/orson.jpg",
    youtube: { url: "https://www.youtube.com/@TheOrsonLord", subscribers: "15K" },
    text: "listened very well to suggestions and asked great questions.",
    project: "Social Media Design",
    screenshot: { src: "/reviews/orson-fiverr.webp", width: 900, height: 125 },
  },
  {
    platform: "upwork",
    text: "Has nailed every thumbnail I've asked him to, he also takes the initiative and gives great suggestions. 10/10 Very rare find!",
    project: "YouTube thumbnail designer for ongoing work",
    date: "Sep 2024",
    screenshot: { src: "/reviews/upwork-ongoing-thumbnails.webp", width: 1500, height: 345 },
  },
  {
    platform: "fiverr",
    name: "johnique36",
    text: "Awesome experience I love my design. Great customer service and did an amazing job with great quality thank you so much.",
    project: "Headers & Covers",
    date: "May 2023",
    screenshot: { src: "/reviews/johnique36-fiverr.webp", width: 1260, height: 160 },
  },
  {
    platform: "upwork",
    text: "It was really cool working together with Mahbub! Very communicative and milestones where reached in time. I enjoyed working with him. If I have future jobs- I will work again with him.",
    project: "YouTube thumbnail designer",
    date: "Sep 2023",
    screenshot: { src: "/reviews/upwork-thumbnail-designer.webp", width: 1500, height: 300 },
  },
  {
    platform: "upwork",
    text: "Mahbub did an amazing job and i was very impressed with his work!",
    project: "10 Canva Template Designs",
    date: "Sep 2025",
    screenshot: { src: "/reviews/upwork-canva-templates.webp", width: 950, height: 230 },
  },
  {
    platform: "upwork",
    text: "Great at what he does & quick replies",
    project: "YouTube Thumbnail for Tech Channel",
    date: "Dec 2022",
    screenshot: { src: "/reviews/upwork-tech-channel.webp", width: 760, height: 200 },
  },
];
