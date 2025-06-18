import React from "react";
import UserProfile from "../../components/UserProfile";
import { User } from "@/app/core/models/user.model";


const mockUser = {
    firstname: "Laura",
    lastname: "Gómez",
    username: "laurag",
    email: "laura@example.com",
    roleId: "usuario",
    extension: "123",
    cellPhone: "+34 612 345 678",
    address: "Calle Falsa 123, Barcelona",
    businessId: "EMP00123",
    rnc: "1-23-45678-9",
} satisfies User;

const Page = () => {
    return <UserProfile user={mockUser} />;
};

export default Page;
