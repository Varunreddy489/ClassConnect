import { v4 as uuidv4 } from "uuid";
import fs from 'node:fs'
import { supportedMimes } from "../config/imageType";
import path from "node:path";

export const imageValidator = (size: number, mime: string) => {
  if (bytesToMb(size) > 5) {
    return "Image size too large";
  } else if (!Object.keys(supportedMimes).includes(mime)) {
    return "Invalid image type";
  }
  return null;
};

export const bytesToMb = (bytes: number) => {
  return bytes / (1024 * 1024);
};

export const generateRandomNumber = () => {
  return uuidv4();
};

export const getImageUrl = (imgName:string) => {
  return `${process.env.APP_URL}/images/${imgName}`
};

export const removeImage = (imageName:string) => {
  const path = process.cwd() + "/public/images/" + imageName;
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
};

export const uploadImage = (image: any): string | null => {
  try {
    // Safely get the file extension
    const ext = path.extname(image.name);
    const imageName = generateRandomNumber() + ext;
    const uploadPath = path.join(process.cwd(), "public", "images", imageName);

    // Move the image to the destination path
    image.mv(uploadPath, (err: Error) => {
      if (err) {
        console.error("Error moving image:", err);
        throw new Error("Image upload failed");
      }
    });

    return imageName;
  } catch (error) {
    console.error("Error during image upload:", error);
    return null;
  }
};