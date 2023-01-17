import { db } from "../src/utils/db.server";

type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

async function seed() {
    await Promise.all(
        getUsers().map((user) => {
            return db.user.create({
                data: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                },
            });
        })
    );
    const user = await db.user.findFirst({
        where: {
            firstName: "Gaby Silva",
        },
    });
}

seed();

function getUsers(): Array<User> {
    return [
        {
            firstName: "Gaby",
            lastName: "Silva",
            email: "gaby@gmail.com",
            password: "abc123"
        },
        {
            firstName: "Jose",
            lastName: "Victor",
            email: "jose@gmail.com",
            password: "abc123"
        }
    ];
}
