"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Products() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await fetch("/api/contact");

      if (!res.ok) {
        console.error("API error:", res.statusText);
        return;
      }

      const result = await res.json();
      setData(result.data);
      console.log(result.data);
    };

    fetchContacts();
  }, []);
  return (
    <>
      <div className="flex items-center justify-start">
        <Button asChild className="flex items-center gap-x-2 ">
          <Link href="./products/create" className="flex items-center">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Products</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>View all your products</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>title</TableHead>
                <TableHead>category</TableHead>
                <TableHead>content</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index: number) => (
                <TableRow key={index}>
                  {/* <TableCell>{item.title}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.createAt.toLocaleDateString()}</TableCell> */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={"icon"}>
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className=" text-left py-2 border border-gray-300 border-opacity-50 rounded-lg"
                      >
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator className="mt-1" />
                        {/* <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${item.id}`}>Edite</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/products/${item.id}/delete`}>
                            delete
                          </Link>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
