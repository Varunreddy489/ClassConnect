export interface StudentAuthTypes {
  name: string;
  email: string;
  password: string;
  phoneNumber: number;
  studentId: string;
  department: string;
}

export interface StudentLoginTypes {
  email: string;
  password: string;
}

export interface ClubTypes {
  id: string;
  name: string;
  description: string;
  profilePic: string;
  friends?: Student[];
}

export type CardFeatures = {
  image: string;
  icon: string;
  text: string;
  description: string;
};

export type ClubMembers = {
  id?: string;
  name?: string;
  email?: string;
  profilePic?: string;
  studentId?: string;
};

export type CreateClubTypes = {
  id: string;
  name: string;
  description: string;
  members: ClubMembers[];
  profilePic?: string;
};

export type AuthUserType = {
  id: string;
  name: string;
  email: string;
  profilePic?: string | null;
  year: string;
  course: string;
  studentId: string;
  semester: string;
  department: string;
  phoneNumber: number;
  isStudent: Student;
};

export type Student = {
  id?: string;
  year?: string;
  name?: string;
  email?: string;
  course?: string;
  semester?: string;
  studentId?: string;
  department?: string;
  phoneNumber?: number;
  profilePic?: string | null;
  students?: AuthUserType;
  clubs: ClubTypes[];
  connections: any;
};

export type StudentsResponse = {
  students: Student[];
};

export type UserClubsResponse = {
  id?: string;
  name?: string;
  description?: string;
  profilePic?: string;
  members?: ClubMembers[];
  creator?: ClubMembers;
  friends?: Student[];
};

export type MessageTypes = {
  id: string;
  body?: string;
  chatId: string;
  conversationId?: string;
  fileType?: string;
  fileUrl?: string;
  teacherId?: string;
  sender: Student;
  senderId?: string;
  createdAt: string;
  shouldShake?: boolean;
};

export interface Notification {
  id: string;
  clubId?: string;
  content: string;
  senderId: number;
  recipientId: number;
  type: string;
  isRead: boolean;
  joinRequestId: string;
  student: Student;
  createdAt: string;
}
