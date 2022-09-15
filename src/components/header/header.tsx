import React from "react";
import { ReactComponent as Humburger } from "../../assets/svg/humburger.svg";
import { ReactComponent as Back } from "../../assets/svg/back.svg";
import "./header.css";

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    button: "menu" | "back" | null;
}

function Header(props: HeaderProps) {
    return (
        <header>
            {props.button === "menu" ? (
                <button>
                    <Humburger />
                </button>
            ) : props.button === "back" ? (
                <button>
                    <Back />
                </button>
            ) : null}
            <h1 style={{ marginInlineEnd: "auto" }}>{props.title}</h1>

            {props.children}
        </header>
    );
}

export default Header;
