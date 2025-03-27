import React from "react";

type Button = React.HTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};
//same : interface ButtonDynamic extends  React.HTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, className, ...props }: Button) => {
    return (
        <button className={`${className && className}  px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                {...props}
        >
            {children}
        </button>
    );
};

export default Button;