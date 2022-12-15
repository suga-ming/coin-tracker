import Router from "./Router";
import styled, {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider,
} from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
// import { purpleTheme, blueTheme, pinkTheme } from "./theme";
import { useState } from "react";
import { useRecoilState } from "recoil";
// import { isTheme, colorTheme } from "./atoms";
import { isTheme } from "./atoms";
import { pinkTheme } from "./theme";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500&family=Source+Sans+Pro:wght@300;400&display=swap');
   html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
		box-sizing:border-box;
 }
 body {
   font-family: 'Noto Sans KR', sans-serif;
   background-color:${(props) => props.theme.bgColor};
   color:${(props) => props.theme.textColor};
 }
 a {
	text-decoration: none;
  color:inherit;
 }
 `;

  const [Theme] = useRecoilState(isTheme);
  // const [Theme] = useRecoilState(colorTheme);
  // const [Theme] = useRecoilState(darkTheme);
  // const [Theme, setTheme] = useState(purpleTheme);
  // const toggleTheme = () => setTheme((current) => !current);
  // const purpleTheme = () => setTheme(purpleTheme);
  // const blueTheme = () => setTheme(blueTheme);

  return (
    <>
      {/* <ThemeProvider theme={Theme ? purpleTheme : blueTheme}> */}
      <ThemeProvider theme={Theme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools initialIsOpen />
      </ThemeProvider>
    </>
  );
}

export default App;
