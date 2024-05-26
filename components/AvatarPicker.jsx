"use client";

import { useState } from "react";
import "@./styles/globals.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Example({ onSelect }) {
  const [selectGender, setSelectGender] = useState("");

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const maleAvatars = [
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    // Add more avatar options here
  ];
  const femaleAvatars = [
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",
    "Assests/male3.jpeg",
    "Assests/male1.jpeg",

    // Add more avatar options here
  ];

  const handlegenderImage = ({ gender }) => {
    setSelectGender(gender);
    console.log(selectGender);
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar); // Pass selected avatar to parent component
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Change</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Choose Your Avatar</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="male" className="">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="male">Male</TabsTrigger>
              <TabsTrigger value="female">Female</TabsTrigger>
            </TabsList>
            <TabsContent value="male">
              <Card className="h-[400px] overflow-y-scroll py-2 ">
                <CardContent className="grid grid-cols-2 gap-2 ">
                  {maleAvatars.map((avatar, index) => (
                    <div key={index} className=" ">
                      <DialogClose asChild>
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar
                              ? "selected rounded-xl "
                              : "rounded-xl"
                          }
                          onClick={() => {
                            handleSelectAvatar(avatar);
                          }}
                        />
                      </DialogClose>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="female">
              <Card className="h-[400px] overflow-y-scroll py-2 ">
                <CardContent className="grid grid-cols-2 gap-2 ">
                  {femaleAvatars.map((avatar, index) => (
                    <div key={index} className=" ">
                      <DialogClose asChild>
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className={
                            selectedAvatar === avatar
                              ? "selected rounded-xl "
                              : "rounded-xl"
                          }
                          onClick={() => {
                            handleSelectAvatar(avatar);
                          }}
                        />
                      </DialogClose>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
