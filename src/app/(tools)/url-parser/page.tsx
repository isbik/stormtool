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
  const { isCopied, onCopy } = useCopy();
  if (!value) return;

  return (
    <div className={cn("flex gap-2 items-center", className)}>
      <div className="font-bold">{name}</div>
      <div className="flex items-center" onClick={() => onCopy(String(value))}>
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
            <p className="font-bold text-lg">Параметры поиска:</p>

            <ul className="list list-disc pl-4 space-y-1">
              {Array.from(params).map(([key, value]) => (
                <li key={key} className="flex flex-col">
                  <Row name={key} value={value}>
                    {value}
                    {safeParse(value) && (
                      <Button
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
    "https://test.app/new/create?myParam=auto&url=https%3A%2F%2Ftest.com%3Futm%3D12%26url%3Dhttps%3A%2F%2Fcom.a&type=news"
  );

  return (
    <div className="w-full grow p-4 overflow-hidden">
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
