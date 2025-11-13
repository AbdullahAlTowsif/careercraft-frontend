"use client";

import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const toggleSelection = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((v) => v !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          className="w-full"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div
            className={cn(
              "flex w-full min-h-[42px] items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
              selected.length === 0 && "text-muted-foreground"
            )}
          >
            {selected.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selected.map((item) => (
                  <Badge key={item} variant="secondary" className="px-2 flex items-center gap-1">
                    {item}
                    <X
                      size={14}
                      className="cursor-pointer hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelection(item);
                      }}
                    />
                  </Badge>
                ))}
              </div>
            ) : (
              <span>{placeholder}</span>
            )}

            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0 w-full">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup className="max-h-[200px] overflow-y-auto">
              {options.map((item) => {
                const isSelected = selected.includes(item);
                return (
                  <CommandItem
                    key={item}
                    onSelect={() => toggleSelection(item)}
                    className="justify-between"
                  >
                    <span>{item}</span>
                    {isSelected && <Check className="h-4 w-4" />}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
