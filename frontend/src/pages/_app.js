import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css"; // अगर आपके पास global styles हैं

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
