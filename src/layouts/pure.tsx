import { GithubIcon } from '@/components/icons'
import { Link } from '@nextui-org/link'
import { Tooltip } from '@nextui-org/tooltip'
export default function PureLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <div className="absolute right-0 top-0 p-2">
        <Tooltip
          content="View source code on GitHub"
          placement="left"
          showArrow
        >
          <Link isExternal href="https://github.com/bietiaop/NextNapCatWebUI">
            <GithubIcon className="text-default-900 hover:text-default-600 w-10 h-10 hover:drop-shadow-lg transition-all" />
          </Link>
        </Tooltip>
      </div>
      <main className="flex-grow w-full flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  )
}
