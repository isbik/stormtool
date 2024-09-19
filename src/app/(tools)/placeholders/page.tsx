"use client";

import { Download } from "lucide-react";

const examples = [
  {
    title: "Image",
    type: "image/jpeg",
    url: "https://placehold.co/600x400",
  },
  {
    title: "Video",
    type: "video/mp4",
    url: "https://media.geeksforgeeks.org/wp-content/uploads/20210314115545/sample-video.mp4",
  },
  {
    title: "Audio",
    type: "audio/mpeg",
    url: "https://media.geeksforgeeks.org/wp-content/uploads/20230524142525/gfg_offline_classes_en.mp3",
  },
  {
    title: "Document (PDF)",
    type: "application/pdf",
    url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

export default function PlaceholdersPage() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-2 h-fit w-full">
      {examples.map((example) => (
        <a
          key={example.title}
          href={example.url}
          className="rounded-lg border border-white/50 p-4 shadow hover:bg-white/10"
          download
          target="_blank"
        >
          <p className="text-xl font-bold">{example.title}</p>
          <p className="text-sm mb-2">{example.type}</p>
          <Download />
        </a>
      ))}
    </div>
  );
}
