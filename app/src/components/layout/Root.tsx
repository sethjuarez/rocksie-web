import { ReactNode } from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async";


type Props = {
  children?: ReactNode,
  title: string
}

const Root = ({ children, title }: Props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{ title }</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="Accept-CH" content="DPR,Width,Viewport-Width" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Helmet>
      <article className="flex flex-col justify-between min-h-screen bg-white">
        <div id="content" className="flex-grow">
          {children}
        </div>
      </article>
    </HelmetProvider>
  )
}

export default Root
