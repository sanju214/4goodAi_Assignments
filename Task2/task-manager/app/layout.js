import './globals.css'; // Import your global styles
import Layout from './components/Layout.js'; // Import your custom Layout component

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Layout>
                    {children}
                </Layout>
            </body>
        </html>
    );
}
