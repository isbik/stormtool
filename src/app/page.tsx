"use client";

import React from "react";
import Link from "next/link";
import { Code, Laptop, Pencil, SmileIcon, Text, WholeWord } from "lucide-react";

type Props = {};

const IndexPage = (props: Props) => {
  const tools = [
    {
      name: "CSS TO JS (React styles)",
      url: "css-to-js",
      icon: Laptop,
    },

    {
      name: "HTML to JSX",
      url: "html-to-jsx",
      icon: Pencil,
    },
    {
      name: "JSON to XML",
      url: "json-to-xml",
      icon: Code,
    },
    {
      name: "CSV to JSON",
      url: "csv-to-json",
      icon: Code,
    },
    {
      name: "XML to JSON",
      url: "xml-to-json",
      icon: Code,
    },
    {
      name: "JavaScript to TypeScript",
      url: "js-object-to-typescript",
      icon: Code,
    },
    {
      name: "JavaScript to JSON",
      url: "js-object-to-json",
      icon: Code,
    },
  ];

  const internalServices = [
    {
      name: "URL parser",
      url: "url-parser",
      icon: Code,
    },
    {
      name: "JWT decoder",
      url: "jwt",
      icon: Code,
    },
    {
      name: "Text analyze",
      url: "text-analyze",
      icon: WholeWord,
    },
    {
      name: "Diff Text",
      url: "diff-text",
      icon: Text,
    },
    {
      name: "Emoji",
      url: "emoji",
      icon: SmileIcon,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Storm Tool</h1>
      <h2 className="text-2xl font-bold mb-4">Code converters</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link key={tool.url} href={`/${tool.url}`}>
            <div className="bg-gray-100 rounded-lg shadow-lg p-4 flex items-center hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 mr-4 flex items-center justify-center">
                <tool.icon className="w-6 h-6 text-gray-700" />
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {tool.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-8 mb-4">Other tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {internalServices.map((service) => (
          <Link key={service.url} href={`/${service.url}`}>
            <div className="bg-white rounded-md p-4 flex items-center shadow-md hover:shadow-lg transition duration-300">
              <div className="w-6 h-6 mr-4 flex items-center justify-center">
                <service.icon className="w-full h-full" />
              </div>
              <div className="text-lg font-semibold">{service.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;
