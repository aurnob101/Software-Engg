'use server'
import AuthPage from "@/components/auth/AuthPage";
import Header from "@/components/home/header";
import Products from "@/components/home/products";
import React from "react";
import { redirect } from "next/navigation";

export default async function Page() {
	redirect('/admin/login')
	return (
		<>
		</>
	);
}
