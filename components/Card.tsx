import { AreaChart, ArrowDownToDot, BellRing, Check, FilePenLine, Files } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type DataProps = {
  name: string,
  longurl: string,
  shortlink: string
}


export function CardUi({name,longurl, shortlink}: DataProps) {
  return (
    <Card
      className={cn("w-[282px] my-2 md:w-[279px] lg:w-[262px] xl:w-[315px] ")}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between cursor-pointer">
            {name}
            <div>
              <Files className="mr-2 h-4 w-4" />
            </div>
          </div>
        </CardTitle>
        <CardDescription>{longurl}</CardDescription>
        <ArrowDownToDot className="h-4 w-4"/>
        <CardDescription>{shortlink}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex flex-col flex-1 gap-y-2">
          <Button variant="outline" className="w-full">
            <AreaChart className="mr-2 h-4 w-4" /> Check Stats
          </Button>
          <Button className="w-full">
            <FilePenLine className="mr-2 h-4 w-4" /> Update Link
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

