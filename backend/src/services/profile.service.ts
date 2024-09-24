export const profileService = async (userId: string, model: any, body: any) => {
  try {
    const userExists = await model.findUnique({ where: { id: Number(userId) } });

    if (!userExists) throw new Error("User not found");

    const updatedUser = await model.update({
      where: { id: Number(userId) },
      data: { ...body },
    });

    return { data: updatedUser };
  } catch (error) {
    console.error("Error in profileService:", error);
    throw new Error("Internal server error");
  }
};
