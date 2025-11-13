import type { ReactNode } from "react";
import Navbar from "../modules/common/Navbar";
import Footer from "../modules/common/Footer";

interface IProps {
    children: ReactNode
}

const CommonLayout = ({children}: IProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="grow">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;
