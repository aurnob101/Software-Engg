"use client";
import Header from "@/components/home/header";
import CartContextProvider from "@/contexts/CartContext";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen min-w-screen">
			<CartContextProvider>
				{/* <Header /> */}
				{children}
			</CartContextProvider>
		</main>
	);
}
