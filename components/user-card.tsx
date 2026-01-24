"use client";
import { Card,CardTitle, CardContent, CardDescription, CardFooter} from "@/components/ui/card";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"
import { StarIcon } from 'lucide-react'

export function UserCardDemo() {
  return (
    <Card className='max-w-md  mx-auto border px-2 border-pink-500 not-prose'>
    <CardContent className="border border-violet-500 p-2">
  <p>
    A minimal card UI composed of reusable components.
  </p>
</CardContent> 
      <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch border border-cyan-500 p-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='ring-ring ring-2'>
            <AvatarImage src='https://github.com/sankalpaacharya.png' alt='Hallie Richards' />
            <AvatarFallback className='text-xs'>SG</AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5 border border-purple-500'>
            <CardTitle className='flex items-center gap-1 text-sm'>Sanku</CardTitle>
            <CardDescription>@sankalpa_02</CardDescription>
          </div>
        </div>
        <div className='flex items-center gap-1 border border-red-500 p-1'>
          <StarIcon className='size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400'></StarIcon>
          <StarIcon className='size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400'></StarIcon>
          <StarIcon className='size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400'></StarIcon>
          <StarIcon className='size-5 fill-amber-500 stroke-amber-500 dark:fill-amber-400 dark:stroke-amber-400'></StarIcon>
          <StarIcon className='size-5 stroke-amber-500 dark:stroke-amber-400'></StarIcon>
        </div>
      </CardFooter>
    </Card>
  );
}