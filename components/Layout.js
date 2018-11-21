import Head from 'next/head'
import Link from './Link'
import Container from './Container'

export default (props) => (
  <main>
    <Head>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/0.5.0/modern-normalize.min.css" />
    </Head>
    <header>
      <nav>
        <Container>
          <Link href="/">home</Link>
          <Link href="/jsacman">jsacman</Link>
        </Container>
      </nav>
    </header>
    <section>
      <Container>
        <div {...props} />
      </Container>
    </section>
    <footer />
    <style global jsx>{`
      html, body {
        background-color: #222;
        color: #efefef;
      }
      nav {
        display: flex;
        background-color: #444;
        padding: 0.5em 0;
        margin-bottom: 1em;
      }
      nav a {
        margin-right: 1em;
        color: inherit;
      }
    `}</style>
  </main>
)
