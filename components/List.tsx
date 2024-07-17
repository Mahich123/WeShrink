"use client"

import { CardUi } from "./Card"

type LinkData = {
  id: string,
  name: string,
  longurl: string,
  shortenedUrl: string
}

type ListProps = {
  linkData: LinkData[] | LinkData | undefined;
}

const List = ({ linkData }: ListProps) => {

  if(!linkData) {
    return <p>Start creating your short urls</p>
  }

  const linkArray  =Array.isArray(linkData) ? linkData : [linkData]
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:gap-4 ">

{linkArray.map((link, index) => (
        <CardUi 
          key={link.id || index}
          name={link.name}
          longurl={link.longurl}
          shortlink={link.shortenedUrl}
        />
      ))}
      
     
    </div>
  )
}

export default List