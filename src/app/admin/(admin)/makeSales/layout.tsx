import Products from "@/components/home/products"
import Header from '@/components/home/header'
import CartContextProvider from "@/contexts/CartContext"

export default function Layout({children}:any) {
    return (
        <div className="p-4">
            <CartContextProvider>

            <Header/>
            {children}
            </CartContextProvider>
        </div>
    )
}