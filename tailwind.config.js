/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            height: theme => ({
                "h-15": "60px",
            }),
        },
        screens: {
            sm: "640px",
            md: "768px",
            md2: "900px", // my own addition
            lg: "1024px",
            xl: "1280px",
        },
    },
    plugins: [],
};
