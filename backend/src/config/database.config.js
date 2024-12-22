import { connect, set } from "mongoose";
import { UserModel } from "../models/user.model.js";
import { FoodModel } from "../models/food.model.js";
import { sample_users } from "../data.js";
import { sample_foods } from "../data.js";
import bcrypt from "bcryptjs";

const PASSWORD_HASH_SALT_ROUNDS = 10;
set("strictQuery", true);

export const dbconnect = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI không được thiết lập trong file .env");
        }
        await connect(process.env.MONGO_URI);
        console.log("Kết nối cơ sở dữ liệu thành công!");

        if (process.env.NODE_ENV === "development") {
            await seedUsers();
            await seedFoods();
        } else {
            console.log("Không seed dữ liệu trong môi trường production");
        }
    } catch (error) {
        console.error("Lỗi khi kết nối cơ sở dữ liệu:", error.message || error);
        process.exit(1); // Thoát nếu kết nối không thành công
    }
};

async function seedUsers() {
    console.log("Bắt đầu seed dữ liệu người dùng...");
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        console.log("Users seed is already done!");
        return;
    }

    const hashedUsers = await Promise.all(
        sample_users.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, PASSWORD_HASH_SALT_ROUNDS),
        }))
    );

    await UserModel.insertMany(hashedUsers);
    console.log("Users seed is done!");
}

async function seedFoods() {
    console.log("Bắt đầu seed dữ liệu món ăn...");
    const foodsCount = await FoodModel.countDocuments();
    if (foodsCount > 0) {
        console.log("Foods seed is already done!");
        return;
    }

    const updatedFoods = sample_foods.map((food) => ({
        ...food,
        imageUrl: `/foods/${food.imageUrl}`,
    }));

    await FoodModel.insertMany(updatedFoods);
    console.log("Foods seed is done!");
}
