import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
export const register = async ({
  firstName,
  lastName,
  email,
  password,
  isAdmin = false,
}: RegisterParams) => {
  const findUser = await userModel.findOne({ email });

  if (findUser) {
    return { data: "User already exist!", statusCode: 400 };
  }

  const hashedPassword = await bcrypt.hash(password, 10); // since it's also return a promise I have to wait until it hashs the password before storing it in db
  const newUser = new userModel({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    isAdmin,
  });
  await newUser.save();

  return {
    data:  generateJWT({ firstName, lastName, email, isAdmin }),
    statusCode: 200,
  };
};

interface LoginParams {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginParams) => {
  const findUser = await userModel.findOne({ email });

  if (!findUser) {
    return { data: "Incorrect email or password", statusCode: 400 };
  }

  const passwordMatch = await bcrypt.compare(password, findUser.password);

  if (passwordMatch) {
    const token = generateJWT({
      email,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      isAdmin: findUser.isAdmin,
    });

    return {
      data: {
        token,
        isAdmin: findUser.isAdmin,
        username: findUser.firstName,
      },
      statusCode: 200,
    };
  }

  return { data: "Incorrect email or password", statusCode: 400 };
};

export const resetPassword = async (userId: string, newPassword: string) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userModel.findByIdAndUpdate(userId, { password: hashedPassword });
    return { statusCode: 200, data: "Password reset successful" };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, data: "Error resetting password" };
  }
};

export const getAllUsers = async () => {
  try {
    const users = await userModel
      .find({}, "firstName lastName email isAdmin")
      .exec();
    return { statusCode: 200, data: users };
  } catch (err) {
    console.error("Error fetching users:", err);
    return { statusCode: 400, data: "Something went wrong!" };
  }
};

interface DeleteUser {
  userId: string;
}

export const deleteUser = async ({ userId }: DeleteUser) => {
  try {
    console.log(`Attempting to delete user with ID: ${userId}`); // Add log
    const user = await userModel.findByIdAndDelete(userId).exec();
    if (!user) {
      return { statusCode: 404, data: "User not found" };
    }
    console.log(`User deleted successfully: ${userId}`); // Add log
    return { statusCode: 200, data: "User deleted successfully" };
  } catch (err) {
    console.error("Error deleting user:", err); // Add log
    return { statusCode: 400, data: "Something went wrong!" };
  }
};

export const updateUserStatus = async ({
  userId,
  isAdmin,
}: {
  userId: string;
  isAdmin: boolean;
}) => {
  try {
    const user = await userModel
      .findByIdAndUpdate(userId, { isAdmin }, { new: true })
      .exec();
    return { statusCode: 200, data: user };
  } catch (err) {
    return { statusCode: 400, data: "Something went wrong!" };
  }
};

const generateJWT = (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRET || ""); // this key used to encrypt token
};
