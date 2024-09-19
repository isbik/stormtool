"use client";

import { Button } from "@/shared/ui/button";
import { useState, useEffect } from "react";

const EmojiPage = () => {
  useEffect(() => {
    fetch("/emojis-en-v5.0.json")
      .then((res) => res.json())
      .then((data) => {
        return setEmojis(
          data.reduce(
            (acc, category) => [
              ...acc,
              ...category.emojis.map((emoji) => emoji[0]),
            ],
            []
          )
        );
      });
  }, []);

  const [emojis, setEmojis] = useState<string[]>([]);
  const [randomEmojis, setRandomEmojis] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [page, setPage] = useState(1);

  const handleCopy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleGenerateRandom = () => {
    const randomEmojisList: string[] = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * emojis.length);
      randomEmojisList.push(emojis[randomIndex]);
    }
    setRandomEmojis(randomEmojisList);
  };

  const loadMoreEmojis = () => {
    setPage(page + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <Button className="mb-4" onClick={handleGenerateRandom}>
        Сгенерировать случайные эмодзи
      </Button>

      {randomEmojis.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-bold">Случайные эмодзи:</h2>
          <div
            className="p-2 text-xl border border-white/30 flex items-center w-fit rounded"
            onClick={() => handleCopy(randomEmojis.join(""))}
          >
            {randomEmojis.join("")}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold">Все эмодзи:</h2>

      <div className="flex flex-wrap gap-1">
        {emojis.slice(0, page * 250).map((emoji) => (
          <button
            key={emoji}
            className="p-2 text-xl flex items-center justify-center rounded min-w-10"
            onClick={() => handleCopy(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>

      {emojis.length > page * 250 && (
        <Button onClick={loadMoreEmojis} className="mt-4">
          Загрузить еще
        </Button>
      )}
    </div>
  );
};

export default EmojiPage;
