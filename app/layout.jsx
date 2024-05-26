import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "Quirkify",
  discription: "thoughts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="px-6">
        <Provider>
          <div className="main ">
            <div className="dark" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
