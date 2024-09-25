import { Request, Response } from "express";
import prisma from "../db/db.config";

export const createCollege = async (req: Request, res: Response) => {
  try {
    const { name, address, contactEmail, contactNumber } = req.body;

    if (!name || !contactEmail) {
      return res
        .status(400)
        .json({ error: "Name and contactEmail are required." });
    }

    const existingCollege = await prisma.college.findUnique({
      where: { name },
    });

    if (existingCollege) {
      const updatedCollege = await prisma.college.update({
        where: { name },
        data: {
          address: address || existingCollege.address,
          contactEmail: contactEmail || existingCollege.contactEmail,
          contactPhone: contactNumber || existingCollege.contactPhone,
        },
      });

      return res.status(200).json(updatedCollege);
    } else {
      const newCollege = await prisma.college.create({
        data: {
          name,
          address,
          contactEmail,
          contactPhone: contactNumber,
        },
      });

      return res.status(201).json({
        id: newCollege.id,
        name: newCollege.name,
        address: newCollege.address,
        contactEmail: newCollege.contactEmail,
        contactPhone: newCollege.contactPhone,
        createdAt: newCollege.createdAt,
        updatedAt: newCollege.updatedAt,
      });
    }
  } catch (error) {
    console.error("Error in createCollege:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
