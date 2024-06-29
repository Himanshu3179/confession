import { NextAuthOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export async function getUserDetails() {
  try {
    const session = await getServerSession(NextAuthOptions);
    if (!session || !session.user) {
      return null;
    }
    const email = session.user.email;
    if (!email) {
      return null;
    }
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isAdmin: true,
        image: true,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get userid
export async function getUserId() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// return true or false based on user authentication
export async function isAuthenticated() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
// get email

export async function getEmail() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.email;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserDetailsWithEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function isAdmin() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    return user.isAdmin;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get name of the user
export async function getName() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.name;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get image of the user
export async function getImage() {
  try {
    const user = await getUserDetails();
    if (!user) {
      return null;
    }
    return user.image;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get confession link= t is mage of appurl+username

// export async function getConfessionLink() {
//   try {
//     const username = await getName();
//     if (!username) {
//       return null;
//     }
//     return `${process.env.APP_URL}/confess/${username}`;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

// get id from name

export async function getIdFromName(name: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return null;
    }
    return user.id;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// getallconfession of current user

export async function getAllConfessions(page: number) {
  if (page < 1) {
    return null;
  }
  try {
    const userId = await getUserId();
    if (!userId) {
      return null;
    }
    const confessions = await db.confession.findMany({
      where: {
        toId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        from: {
          select: {
            name: true,
          },
        },
        likes: true,
        isAnonymous: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 9,
      take: 9,
    });

    // set from to null if it is anonymous

    const processedConfessions = confessions.map((confession) => {
      if (confession.isAnonymous) {
        confession.from = null;
      }
      return confession;
    });

    return processedConfessions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get total pages of allConfessions
export async function getTotalPagesAllConfessions() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }
    const count = await db.confession.count({
      where: {
        toId: userId,
      },
    });
    return Math.ceil(count / 9);
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// get total count of confessions
export async function getTotalConfessions() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }
    const count = await db.confession.count({
      where: {
        toId: userId,
      },
    });
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

export async function getPublicConfessions(page: number) {
  try {
    const confessions = await db.confession.findMany({
      where: {
        isPublic: true,
        to: null,
      },
      include: {
        from: {
          select: {
            name: true,
          },
        },
        to: {
          select: {
            name: true,
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 9,
      take: 9,
    });
    const processedConfessions = confessions.map((confession) => {
      if (confession.isAnonymous) {
        // set from.name to null
        confession.from = null;
      }
      return confession;
    });
    return processedConfessions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// getTotalPublicConfessions

export async function getTotalPublicConfessions() {
  try {
    const count = await db.confession.count({
      where: {
        isPublic: true,
        to: null,
      },
    });
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// like heart with confessio id

export async function likeConfession(confessionId: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return false;
    }
    const like = await db.like.findFirst({
      where: {
        confessionId,
        userId,
      },
    });
    if (like) {
      return false;
    }
    await db.like.create({
      data: {
        confessionId,
        userId,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get all confessions only liked by user

export async function getLikedConfessions(page: number) {
  try {
    const userId = await getUserId();
    if (!userId) {
      return null;
    }

    const confessions = await db.like.findMany({
      where: {
        userId,
      },
      select: {
        confession: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            from: {
              select: {
                name: true,
              },
            },
            likes: true,
            isAnonymous: true,
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 9,
      take: 9,
    });

    const processedConfessions = confessions.map((confession) => {
      // if confession is anonymous then set from to null
      if (confession.confession.isAnonymous) {
        confession.confession.from = null;
      }
      return confession.confession;
    });

    return processedConfessions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get total liked confessions

export async function getTotalLikedConfessions() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }
    const count = await db.confession.count({
      where: {
        toId: userId,
        likes: {
          some: {
            userId,
          },
        },
      },
    });
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// user present with name

export async function userPresentWithName(name: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        name,
      },
    });
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// top confession ,return 5 top confession of public confessions having highest likes

export async function getTopConfessions() {
  try {
    // get confession with toId as null
    const confessions = await db.confession.findMany({
      where: {
        isPublic: true,
        to: null,
      },
      include: {
        from: {
          select: {
            name: true,
          },
        },
        likes: true,
      },
      orderBy: [
        {
          likes: {
            _count: "desc",
          },
        },
        {
          createdAt: "desc",
        },
      ],
      take: 5,
    });
    return confessions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// change name accroding after google signin
// remove spaces between spaces if there are already default spaces
// change to unique username then if already present add random number to it

export async function changeName(name: string) {
  try {
    const user = await getUserDetails();
    if (!user) {
      return false;
    }
    const newName = name.trim().replace(/\s+/g, " ");
    const userWithNewName = await db.user.findUnique({
      where: {
        name: newName,
      },
    });
    if (userWithNewName) {
      return false;
    }
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: newName,
      },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// get public confession by id

export async function getPublicConfessionById(id: string) {
  try {
    const confession = await db.confession.findUnique({
      where: {
        id,
        isPublic: true,
        to: null,
      },
      include: {
        from: {
          select: {
            name: true,
          },
        },
        likes: true,
      },
    });

    if (!confession) {
      return null;
    }
    // if confession.isAnonymous then return confession.from as null

    if (confession.isAnonymous) {
      confession.from = null;
    }

    return confession;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to generate a unique username
export async function generateUniqueName(name: string) {
  let username = name.replace(/\s+/g, "").toLowerCase();
  let num = 1;
  while (true) {
    const existingUser = await db.user.findUnique({
      where: { name: username },
    });
    if (!existingUser) {
      break;
    }
    username = `${name.replace(/\s+/g, "").toLowerCase()}${num}`;
    num++;
  }
  return username;
}

// find all users and send their name and total count of received confessions count and order by confession count

export async function getAllUsers() {
  try {
    const users = await db.user.findMany({
      select: {
        name: true,
        _count: {
          select: { receivedConfessions: true },
        },
        image: true,
      },
      orderBy: {
        receivedConfessions: {
          _count: "desc",
        },
      },
      take: 10,
    });

    const username = await getName();
    const index = users.findIndex((user) => user.name === username);
    if (index !== -1) {
      users.splice(index, 1);
    }
    return users;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get all confessions sent by user

export async function getSentConfessions(page: number) {
  if (page < 1) {
    return null;
  }
  try {
    const userId = await getUserId();
    if (!userId) {
      return null;
    }
    const confessions = await db.confession.findMany({
      where: {
        fromId: userId,
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        isPublic: true,
        isAnonymous: true,
        to: {
          select: {
            name: true,
          },
        },
        likes: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 9,
      take: 9,
    });
    return confessions;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// get total of sent confessions

export async function getTotalSentConfessions() {
  try {
    const userId = await getUserId();
    if (!userId) {
      return 0;
    }
    const count = await db.confession.count({
      where: {
        fromId: userId,
      },
    });
    return count;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

// delete confession with id also verify that userId is same as fromId
export async function deleteConfession(id: string) {
  try {
    const userId = await getUserId();
    if (!userId) {
      console.log("User not found");
      return false;
    }
    const confession = await db.confession.findUnique({
      where: {
        id,
      },
    });
    if (!confession || confession.fromId !== userId) {
      console.log("Confession not found or user is not the author");
      return false;
    }

    // Delete associated likes
    await db.like.deleteMany({
      where: {
        confessionId: id,
      },
    });

    // Delete the confession
    await db.confession.delete({
      where: {
        id,
      },
    });
    console.log("Confession deleted successfully");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// model User {
//   id                  String       @id @default(auto()) @map("_id") @db.ObjectId
//   name                String       @unique
//   email               String       @unique
//   isVerified          Boolean      @default(false)
//   emailVerified       DateTime?
//   image               String?
//   contact             String?
//   hashedPassword      String?
//   resetToken          String?
//   resetTokenExpires   DateTime?
//   createdAt           DateTime     @default(now())
//   updatedAt           DateTime     @updatedAt
//   accounts            Account[]
//   sessions            Session[]
//   isAdmin             Boolean      @default(false)
//   sentConfessions     Confession[] @relation("from")
//   receivedConfessions Confession[] @relation("to")
//   likes               Like[]
// }

// model Confession {
//   id          String  @id @default(auto()) @map("_id") @db.ObjectId
//   content     String
//   from        User?   @relation("from", fields: [fromId], references: [id])
//   fromId      String? @db.ObjectId
//   to          User?   @relation("to", fields: [toId], references: [id])
//   toId        String? @db.ObjectId
//   isPublic    Boolean @default(true)
//   isAnonymous Boolean @default(false)

//   likes Like[]

//   createdAt DateTime @default(now())
//   updatedAt DateTime @updatedAt
// }

// model Like {
//   id           String     @id @default(auto()) @map("_id") @db.ObjectId
//   confession   Confession @relation(fields: [confessionId], references: [id])
//   confessionId String     @db.ObjectId
//   user         User       @relation(fields: [userId], references: [id])
//   userId       String     @db.ObjectId
//   createdAt    DateTime   @default(now())
// }
