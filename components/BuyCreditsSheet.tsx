import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";

export function BuyCreditsSheet({ open }: { open: boolean }) {
  return (
    <Sheet open={open}>
      <SheetContent className="no-close">
        <SheetHeader>
          <SheetTitle>Buy credits to play</SheetTitle>
          <SheetDescription className="text-sm">
            Qualify for the jackpot and save every time you play.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col items-center text-center my-16 space-y-4">
          <button className="bg-locker-500 text-white px-8 py-4 text-lg font-bold rounded-md">
            Buy now
          </button>
          <p className="text-xs text-muted-foreground">
            10 lives for 1,000 CROAK
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
