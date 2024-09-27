"use client";
import { Button } from "@/shared/ui/button";
import { useEffect, useState } from "react";
import { base, ru, en, Faker } from "@faker-js/faker";
import { useCopy } from "@/shared/hooks/use-copy";
import { cn } from "@/shared/lib/cn";
import { CopyCheck, Copy } from "lucide-react";

const faker = new Faker({
  locale: [ru, en, base],
});

type RowProps = React.ComponentPropsWithoutRef<"div"> & {
  name: string;
  value: string;
};

const Row = ({ name, value, className, ...props }: RowProps) => {
  const { isCopied, onCopy } = useCopy();

  return (
    <div
      className={cn("flex flex-row gap-2 items-center", className)}
      {...props}
    >
      <p className="font-bold">{name}</p>
      <div className="flex items-center gap-2">
        <p className="flex-1">{value}</p>
        <Button
          size="sm"
          className={isCopied ? "text-green-500" : ""}
          onClick={() => onCopy(value)}
        >
          {isCopied ? (
            <CopyCheck className="size-4" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

function FakeDataPage() {
  const [data, setData] = useState<{
    name: string;
    card: string;
    address: string;
    phone: string;
    email: string;
    company: string;
    description: string;
  }>({
    name: "",
    card: "",
    address: "",
    phone: "",
    email: "",
    company: "",
    description: "",
  });

  useEffect(() => {
    generate();
  }, []);

  const generate = () => {
    setData({
      name: faker.person.fullName(),
      card: faker.finance.creditCardNumber(),
      address: faker.location.city() + ", " + faker.location.streetAddress(),
      phone: faker.phone.number(),
      email: faker.internet.email(),
      company: faker.company.name(),
      description: faker.lorem.paragraph({ min: 3, max: 10 }),
    });
  };

  return (
    <div className="w-full grow p-2 overflow-hidden">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row space-x-2">
          <Button onClick={generate}>Сгенерировать</Button>
        </div>
        <div className="flex flex-col space-y-2">
          <Row name="ФИО:" value={data.name} />
          <Row name="Номер карты:" value={data.card} />
          <Row name="Адрес:" value={data.address} />
          <Row name="Телефон:" value={data.phone} />
          <Row name="Email:" value={data.email} />
          <Row name="Компания:" value={data.company} />
          <Row
            className="flex-col items-start gap-0"
            name="Описание:"
            value={data.description}
          />
        </div>
      </div>
    </div>
  );
}

export default FakeDataPage;
