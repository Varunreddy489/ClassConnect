import { z } from "zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EventTypes } from "@/types/Client-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Plus, Upload } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const CreateEvents = () => {
  const schema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    image: z.instanceof(File).optional(),
    location: z.string(),
  });

  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register: event,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EventTypes>({
    resolver: zodResolver(schema),
  });

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
    console.log("handleFileUploadClick");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
    console.log("handleFileChange");

  };

  const onSubmit = (data: EventTypes) => {
    const transformedData = {
      ...data,
      startDate: data.startDate?.toISOString(),
      endDate: data.endDate?.toISOString(),
    };
    console.log("Form Data Submitted:", transformedData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-center">Add New Event</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div
              onClick={handleFileUploadClick}
              className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            >
              <input
                type="file"
                accept="image/*"
                {...event("image")}
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Event Preview"
                    className="mb-2 w-24 h-24 object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                      <Upload className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="text-sm text-zinc-400 mb-2">
                      Upload Image for Event
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">
                      Choose File
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Title Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                className="bg-zinc-800 border-zinc-700"
                {...event("title", { required: true })}
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                className="bg-zinc-800 border-zinc-700"
                {...event("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Date Selection */}
            <div className="flex gap-2 justify-between">
              <div className="">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-start text-left font-normal",
                        startDate ? "text-white" : "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate
                        ? startDate.toLocaleDateString()
                        : "Pick a Start Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate || undefined}
                      onSelect={(date) => {
                        setStartDate(date || null);
                        setValue("startDate", date || new Date());
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-fit">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal",
                        "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate
                        ? endDate.toLocaleDateString()
                        : "Pick an End Date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate || undefined}
                      onSelect={(date) => {
                        setEndDate(date || null);
                        if (date) setValue("endDate", date);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                className="bg-zinc-800 border-zinc-700"
                {...event("location", { required: true })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {}}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};


export default CreateEvents;
