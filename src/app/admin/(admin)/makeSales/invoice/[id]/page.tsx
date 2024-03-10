"use client"; 
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { CircleDotDashed } from "lucide-react";
import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import styles from "./invoice"; // Import the CSS fileles from

export default function InvoicePage() {
    const { id } = useParams();

    // Define shop details manually
    const shopName = "ABC Enterprize";
    const shopAddress = "Chittagong, Bangladesh";
    const shopPhone = "+88054154141";

    type ProductType = {
        name: string;
		category: string;
		grade: string;
		code: string;
		company: string;
        quantity: number;
        price: number;
    };

    type SalesType = {
        id: string;
        customerName: string;
        customerEmail: string;
        customerPhone: string;
        customerAddress: string;
        products: ProductType[];
        totalPrice: number;
        date: string;
    };

    const [data, setData] = React.useState<SalesType | null>(null);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            const snap = await getDoc(doc(firestore, `sales/${id}`));
            setData(snap.data() as SalesType);
            setLoading(false);
        }
        getData();
    }, [id]); // Added id to the dependency array to ensure useEffect runs when id changes

    // Function to print the invoice
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full p-4" id="invoicePage">
            {loading && <CircleDotDashed className="w-6 h-6 animate-spin" />}
            {!loading && !data && (
                <div className="w-full h-full flex justify-center items-center">
                    No Data Found
                </div>
            )}
            {!loading && data && (
                <>
                    {/* Render shop details */}
                    <div className="border-b-2 border-gray-300 mb-4 pb-4">
                        <h1 className="text-2xl font-bold mb-2">{shopName}</h1>
                        <p className="text-sm">{shopAddress}</p>
                        <p className="text-sm">{shopPhone}</p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold">Invoice Details</h2>
                        <p className="text-sm">Invoice ID: #{id}</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold">Customer Details</h2>
                        <p>Name: {data.customerName}</p>
                        <p>Email: {data.customerEmail}</p>
                        <p>Phone: {data.customerPhone}</p>
                        <p>Address: {data.customerAddress}</p>
                        <p>Date: {data.date || new Date().toDateString()}</p>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-semibold">Products</h2>
                        {data.products.map((product, index) => (
                            <div key={index} className="flex justify-between items-center mb-2">
                                <div>
								    <p className="text-sm">Company: {product.company}</p>
                                    <p className="text-sm">Product Name: {product.name}</p>
									<p className="text-sm">Category: {product.category}</p>
									<p className="text-sm">Code: {product.code}</p>
									<p className="text-sm">Grade: {product.grade}</p>
                                    <p className="text-lg">Quantity: {product.quantity}</p>
                                </div>
                                <p className="text-lg">Price: {product.price * product.quantity} ৳</p>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-100 rounded-lg p-4">
                        <h2 className="text-lg font-semibold">Total Price</h2>
                        <p className="text-lg">{data.totalPrice} ৳</p>
                    </div>
                    {/* Button to print the invoice */}
                    <button onClick={handlePrint} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Print Invoice
                    </button>
                </>
            )}
        </div>
    );
}
