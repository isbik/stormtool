"use client";

import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Input } from "@/shared/ui/input";
import { Card } from "@/shared/ui/card";

const JWTComponent = ({ value }: { value: string }) => {
  try {
    const header = jwtDecode(value, { header: true });
    const payload = jwtDecode(value);

    const headerEntries = Object.entries(header);
    const payloadEntries = Object.entries(payload);

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
        <Card className="p-4">
          <h2 className="text-2xl font-bold pb-2">Header</h2>
          <ul className="">
            {headerEntries.map(([key, value]) => (
              <li key={key} className="flex items-center mb-2">
                <span className="font-bold text-[#0074D9]">{key}</span>:&nbsp;
                <span className="">{value}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="text-2xl font-bold pb-2">Payload</h2>
          <ul className="">
            {payloadEntries.map(([key, value]) => (
              <li key={key} className="flex items-center mb-2">
                <span className="font-bold text-[#2ECC40]">{key}</span>:&nbsp;
                <span className="">{value}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    );
  } catch {
    return <p className="text-[#FF4136] font-bold">Invalid token</p>;
  }
};

export default function Home() {
  const [value, setValue] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  );
  const [error, setError] = useState<string | null>(null);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setError(null);
  };

  const handleBlur = () => {
    try {
      jwtDecode(value);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <p className="text-sm font-medium">JWT Token</p>
      <Input
        className="border w-full p-2"
        placeholder="Enter JWT token"
        value={value}
        onChange={handleInput}
        onBlur={handleBlur}
      />
      {error && <p className="text-red-500">{error}</p>}
      {value && <JWTComponent value={value} />}
    </div>
  );
}
