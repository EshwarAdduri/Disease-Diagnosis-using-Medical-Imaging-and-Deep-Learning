import React from 'react'
import { cn } from './utils/cn'

export default function Card({children,className,...props}) {
  return (
    <article className="flex-1 flex flex-col justify-center items-center gap-4 " {...props}>
      <aside className={cn(className,"bg-white/80 rounded p-4 flex gap-2 flex-col items-center justify-center")}>
        {children}
      </aside>
		</article>
  )
}
