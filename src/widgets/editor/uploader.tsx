import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Upload } from "lucide-react";
import React, { useState } from "react";

type Props = {
  onChange?: (value: string) => void;
};

const Uploader = ({ onChange }: Props) => {
  const [fetchingUrl, setFetchingUrl] = useState("");

  const [openFilePicker, setOpenFilePicker] = useState(false);

  const onFilePicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!(files && files.length)) return;
    const file = files[0];
    const reader = new FileReader();

    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      const result = reader.result as string;
      onChange?.(result);
      setOpenFilePicker(false);
    };
  };

  const fetchFile = async () => {
    if (!fetchingUrl) return;
    try {
      const res = await fetch(fetchingUrl);
      const value = await res.text();
      setFetchingUrl("");
      onChange?.(value);
      setOpenFilePicker(false);
    } finally {
      // pass
    }
  };

  return (
    <Popover open={openFilePicker} onOpenChange={setOpenFilePicker}>
      <PopoverTrigger>
        <Upload aria-label="Загрузить файл" role="button" className="size-4" />
      </PopoverTrigger>
      <PopoverContent
        className="space-y-2 flex flex-col"
        sideOffset={16}
        align="start"
      >
        <div className="flex gap-2">
          <Input
            value={fetchingUrl}
            onChange={(event) => setFetchingUrl(event.target.value)}
            type="url"
            placeholder="Введите ссылку"
          />
          <Button onClick={fetchFile}>Загрузить</Button>
        </div>
        <label className="flex items-center gap-2 text-right justify-between">
          Или
          <input className="hidden" type="file" onChange={onFilePicked} />
          <Button asChild>
            <span>
              <Upload className="size-4 mr-2" />
              Выбрать файл
            </span>
          </Button>
        </label>
      </PopoverContent>
    </Popover>
  );
};

export { Uploader };
