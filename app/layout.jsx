import '@styles/globals.css'
import Nav from '@components/Nav'
import Providers from '@components/Providers'

export const metadata = {
    title:"layout",
    description:"promptopia .... An AI prompt"
}

function Rootlayout({children}) {
  return (
    <html lang='en'>
        <body>
            <Providers>
                <div className="main">
                    <div className="gradient">
                    </div>
                </div>
                <main className="app">
                    <Nav />
                    {children}
                </main>
            </Providers>
        </body>
    </html>
  )
}

export default Rootlayout