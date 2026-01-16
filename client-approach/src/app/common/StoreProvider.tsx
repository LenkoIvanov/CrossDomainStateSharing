"use client"

import { store } from "@/store/store";
import { ReactNode } from "react"
import { Provider } from "react-redux";

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
    return <Provider store={store}>{children}</Provider>
}

export default StoreProvider;