"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Trash } from "lucide-react";
import React, { useState } from "react";

const ImageToFavicon = () => {
  const [image, setImage] = React.useState<string | null>(null);
  const [size, setSize] = useState(16);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, size, size);

          const pngDataUrl = canvas.toDataURL(file.type);

          // Trigger download as .ico
          const link = document.createElement("a");
          link.href = pngDataUrl.replace(file.type, "image/x-icon");
          link.download = "favicon.ico";
          setImage(link.href);
        }
      };
    };

    reader.readAsDataURL(file); // Read file as Data URL
  };

  return (
    <div className="p-4 w-fit">
      <h1 className="text-2xl font-bold mb-4">
        Конвертер изображения в favicon
      </h1>
      <div className="flex gap-2">
        <Input
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          type="number"
          onBlur={(e) => setSize(parseInt(e.target.value) || 16)}
          max={1024}
          placeholder="Размер"
        />
        <Input
          className="mb-4"
          onChange={handleSelectFile}
          type="file"
          accept="image/*"
        />
      </div>
      {image && (
        <div className="flex flex-col justify-center items-center gap-2">
          <img className="size-32 border shadow-lg" src={image} alt="" />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = image;
                link.download = "favicon.ico";
                link.click();
              }}
              type="button"
            >
              Скачать
            </Button>
            <Button
              onClick={() => setImage(null)}
              size={"icon"}
              variant={"destructive"}
              type="button"
            >
              <Trash className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageToFavicon;
