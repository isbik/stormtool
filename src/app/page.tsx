"use client";

import { Sidebar } from "@/shared/ui/sidebar";
import { useState } from "react";

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
    <div>
      <p>
        <span className="font-bold">Host</span>: {result.host}
      </p>
      {result.hash && (
        <p>
          <span className="font-bold">Hash</span>: {result.hash}
        </p>
      )}

      {result.pathname !== "/" && (
        <p>
          <span className="font-bold">Path</span>: {result.pathname}
        </p>
      )}

      {result.searchParams.size !== 0 && (
        <>
          <p className="font-bold">Search Params:</p>

          <ul className="list pl-4">
            {Array.from(params).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold">{key}</span>: {value}
                {safeParse(value) && (
                  <button
                    type="button"
                    onClick={() => setOpen((prev) => !prev)}
                    className="bg-slate-500 border rounded px-2 text-white ml-2"
                  >
                    {open ? "Close" : "Open"}
                  </button>
                )}
                <div className="pl-2">
                  {open && <URLComponent value={value} />}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default function Home() {
  const [value, setValue] = useState(
    "https://rss.app/new-rss-feed/rss-builder?jsTimeout=auto&url=https%3A%2F%2Frss.app%3Futm%3D12%26url%3Dhttps%3A%2F%2Fcom.a&contentType=NEWS"
  );

  return (
    <main className="flex gap-4 grow min-h-screen">
      <Sidebar />

      <div className="w-full grow p-2 overflow-hidden">
        <p>Enter url</p>
        <input
          className="border w-full p-2"
          placeholder="Enter url"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <URLComponent value={value} />
      </div>
    </main>
  );
}
