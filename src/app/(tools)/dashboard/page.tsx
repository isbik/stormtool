import { Button } from "@/shared/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Search, Star } from "lucide-react";
import React from "react";

const tools = [
  {
    name: "ChatGPT",
    description: "OpenAI's powerful language model for various tasks",
    category: "AI & Machine Learning",
  },
  {
    name: "GitHub Copilot",
    description: "AI pair programmer that helps you write code faster",
    category: "AI & Machine Learning",
  },
  {
    name: "VS Code",
    description: "Popular, extensible code editor from Microsoft",
    category: "Code Editors",
  },
  {
    name: "GitKraken",
    description: "Powerful Git GUI for version control",
    category: "Version Control",
  },
  {
    name: "MongoDB Compass",
    description: "GUI for MongoDB database management",
    category: "Databases",
  },
  {
    name: "Postman",
    description: "API development and testing tool",
    category: "API Tools",
  },
  {
    name: "Docker",
    description:
      "Container platform for building, shipping, and running applications",
    category: "DevOps",
  },
  {
    name: "Jest",
    description: "JavaScript testing framework",
    category: "Testing",
  },
  {
    name: "Slack",
    description: "Team communication and collaboration platform",
    category: "Collaboration",
  },
];

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-red-500 text-3xl mb-96">IN DEVELOPMENT</h1>
      <h1 className="text-2xl font-bold mb-3">Все инструменты</h1>

      <div className="relative mb-6">
        <Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="search"
          placeholder="Поиск инструмента"
          className="pl-8 w-full md:w-96"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.name}>
            <CardHeader>
              <CardTitle>{tool.name}</CardTitle>
              <CardDescription>{tool.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{tool.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Learn More</Button>
              <Button variant="ghost" size="icon">
                <Star className="h-4 w-4" />
                <span className="sr-only">Add to favorites</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
