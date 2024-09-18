// tailwind.config.js
import withMT from "@material-tailwind/html/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        posey: ['PoseyTextured', 'Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
});
