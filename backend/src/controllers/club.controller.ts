import { Request, Response } from "express";

import prisma from "../db/db.config";

enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export const createClub = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const { name, description, members } = req.body;

    const checkStudent = await prisma.student.findUnique({
      where: { id: Number(studentId) },
    });

    if (!checkStudent) {
      return res.status(404).json({ error: "Unauthorised Access" });
    }

    const isClub = await prisma.club.findUnique({
      where: { name: name },
    });

    if (isClub) {
      return res.status(400).json({ error: "Try Someother Name" });
    }

    const newClub = await prisma.club.create({
      data: {
        name,
        description,
        creatorId: Number(studentId),
        members: {
          connect: [{ id: Number(studentId) }],
        },
        collegeId: 1,
      },
    });

    console.log(newClub);
    return res.status(200).json({ newClub: "Club Created Successfully" });
  } catch (error) {
    console.error("error in createClub:", error);
    res.status(404).json({ error: "internal server error" });
  }
};

export const updateClub = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.error("Error in updateClub:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addToClub = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;

    const { creatorId, members } = req.body;

    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (club.creatorId !== Number(creatorId)) {
      return res
        .status(403)
        .json({ error: "Unauthorized: Only the club creator can add members" });
    }

    if (!Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: "No members provided" });
    }

    const updatedClub = await prisma.club.update({
      where: { id: Number(clubId) },
      data: {
        members: {
          connect: members.map((id: number) => ({ id })),
        },
      },
      include: {
        members: true,
      },
    });

    return res.status(200).json(updatedClub);
  } catch (error) {
    console.error("error in createClub:", error);
    res.status(404).json({ error: "internal server error" });
  }
};

export const getAllClubs = async (req: Request, res: Response) => {
  try {
    const clubs = await prisma.club.findMany({});

    return res.status(200).json(clubs);
  } catch (error) {
    console.error("error in getAllClubs:", error);
    res.status(404).json({ error: "internal server error" });
  }
};

export const sendMessages = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;
    const { content } = req.body;

    console.log(content);

    const userId = req.user.id;
    const role = req.user.role as Role;

    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const checkUser = await prisma.student.findUnique({
      where: { id: userId },
    });

    if (!checkUser) {
      return res.status(400).json({ erorr: "User Not Found " });
    }

    let conversation = await prisma.conversations.findFirst({
      where: {
        clubId: Number(clubId),
      },
    });

    if (!conversation) {
      conversation = await prisma.conversations.create({
        data: {
          clubId: Number(clubId),
          senderId: userId,
          content,
          senderType: role,
        },
      });
    }

    const message = await prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId: userId,
        body: content,
      },
    });

    console.log(message);

    res.status(201).json({
      message: "Message sent successfully",
      messageData: message,
    });
  } catch (error) {
    console.error("Error in sendMessages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMessages = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;

    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const messages = await prisma.message.findMany({
      where: {
        conversation: { clubId: Number(clubId) },
      },
    });

    return res.status(404).json(messages);
  } catch (error) {
    console.error("Error in getAllMessages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const joinClubRequest = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;

    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    const userId = req.user.id;

    let existingRequest = await prisma.joinRequest.findFirst({
      where: {
        clubId: Number(clubId),
        studentId: userId,
        status: "PENDING",
      },
    });

    if (existingRequest) {
      return res.status(400).json({
        message: "You have already requested to join this club.",
      });
    }

    const newRequest = await prisma.joinRequest.create({
      data: {
        clubId: Number(clubId),
        studentId: userId,
      },
    });

    res.status(201).json({
      message: "Join request sent successfully",
      joinRequest: newRequest,
    });
  } catch (error) {
    console.error("Error in joinClubRequest:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllJoinRequests = async (req: Request, res: Response) => {
  try {
    const { clubId } = req.params;

    console.log("req.user:", req.user);

    const club = await prisma.club.findUnique({
      where: { id: Number(clubId) },
      select: {
        id: true,
        creatorId: true,
      },
    });

    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }

    if (club.creatorId !== req.user.id) {
      return res.status(403).json({
        error: "You are not authorized to view join requests for this club.",
      });
    }

    const joinRequests = await prisma.joinRequest.findMany({
      where: {
        clubId: Number(clubId),
      },
    });

    if (!joinRequests) {
      return res.json({ message: "No Joining Requests." });
    }

    return res.json(joinRequests);
  } catch (error) {
    console.error("Error in getAllJoinRequests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
