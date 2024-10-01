"use client";

import { useCopy } from "@/shared/hooks/use-copy";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const Row = ({
  name,
  value,
  className,
  children,
}: {
  className?: string;
  name: React.ReactNode;
  value: React.ReactNode;
  children?: React.ReactNode;
}) => {
  const { onCopy } = useCopy();
  if (!value) return;

  return (
    <div className={cn("flex gap-2 items-start", className)}>
      <div>{name}</div>
      <div
        className="flex items-center bg-neutral-500/10 select-all px-1 py-0.5 rounded break-all font-mono"
        onClick={() => onCopy(String(value))}
      >
        {children || value}
      </div>
    </div>
  );
};

const URLComponent = ({ value }: { value: string }) => {
  const [open, setOpen] = useState(false);
  const safeParse = (url: string) => {
    try {
      return new URL(url);
    } catch (error) {
      return "";
    }
  };

  const result = safeParse(value);

  if (!result) return;

  const params = result.searchParams.entries();

  return (
    <Card className="flex flex-col gap-1 p-4 my-2">
      <>
        <Row name="Protocol" value={result.protocol} />
        <Row name="Host" value={result.host} />

        <Row className="text-blue-500" name="Origin" value={result.origin} />
        <Row name="Hash" value={result.hash} />

        {result.pathname !== "/" && (
          <Row name="Pathname" value={result.pathname} />
        )}

        <Row name="Port" value={result.port} />

        {result.searchParams.size !== 0 && (
          <div>
            <p className="text-lg mb-2 font-bold">Параметры поиска</p>

            <ul className="list list-disc space-y-1">
              {Array.from(params).map(([key, value]) => (
                <li key={key} className="flex flex-col">
                  <Row name={key} value={value}>
                    {value}
                    {safeParse(value) && (
                      <Button
                        variant={"secondary"}
                        size={"icon"}
                        className="ml-2 size-6"
                        type="button"
                        onClick={() => setOpen((prev) => !prev)}
                      >
                        {open ? (
                          <Minus className="size-4" />
                        ) : (
                          <Plus className="size-4" />
                        )}
                      </Button>
                    )}
                  </Row>

                  {open && <URLComponent value={value} />}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    </Card>
  );
};

export default function Home() {
  const [value, setValue] = useState(
    "https://news/url-parser?param1=value1&param2=value2"
  );

  return (
    <div className="w-full grow p-4">
      <p className="text-sm font-medium">Введите URL</p>
      <Input
        className="mb-4"
        placeholder="Enter url"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <URLComponent value={value} />
    </div>
  );
}
