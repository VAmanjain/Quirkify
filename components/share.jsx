'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { RiShareForwardLine } from "react-icons/ri"

const ShareUrl=({link})=> {
    const [copied, setCopied] = useState('');
    const inputRef = useRef(null);
  
    const handleCopy = () => {
      const inputValue = inputRef.current.value;
      setCopied(inputValue);
      navigator.clipboard.writeText(inputValue);
      setTimeout(() => setCopied(false), 3000);
    };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full flex text-sm text-[0.8rem] ">Share
          <RiShareForwardLine className="mx-1 sm:mx-2" size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={link}
              readOnly
              ref={inputRef}
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            {/* <CopyIcon className="h-4 w-4" /> */}
            <Image
            src={
              copied !==""
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied !=="" ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
            className="mx-2"
            onClick={handleCopy}
          />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareUrl