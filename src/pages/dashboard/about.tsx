import { Image } from '@nextui-org/image'
import packageJson from '../../../package.json'

import logo from '@/assets/images/logo.png'
import { BietiaopIcon, WebUIIcon } from '@/components/icons'
import { Chip } from '@nextui-org/chip'
import NapCatRepoInfo from '@/components/napcat_repo_info'
import { title } from '@/components/primitives'
import clsx from 'clsx'

function VersionInfo() {
  return (
    <div className="flex items-center gap-2 mb-5">
      <Chip
        startContent={
          <Chip color="danger" size="sm" className="-ml-0.5 select-none">
            WebUI
          </Chip>
        }
      >
        {packageJson.version}
      </Chip>
    </div>
  )
}

export default function AboutPage() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="max-w-full w-[1000px] px-5 flex flex-col items-center">
        <div className="flex flex-col md:flex-row items-center">
          <Image
            alt="logo"
            className="-mt-5 flex-shrink-0 w-52 md:w-48 mr-2"
            src={logo}
          />
          <div className="flex -mt-9 md:mt-0">
            <WebUIIcon />
          </div>
        </div>
        <div className="flex opacity-60 items-center gap-2 mb-2 font-ubuntu">
          Created By
          <div className="flex scale-80 -ml-5 -mr-5">
            <BietiaopIcon />
          </div>
        </div>
        <VersionInfo />
        <div className="mb-6 flex flex-col items-center gap-4">
          <p
            className={clsx(
              title({
                color: 'cyan',
                shadow: true
              }),
              '!text-3xl'
            )}
          >
            NapCat Contributors
          </p>
          <Image
            className="w-[600px] max-w-full pointer-events-none select-none"
            src="https://contrib.rocks/image?repo=bietiaop/NapCatQQ"
            alt="Contributors"
          />
        </div>
        <NapCatRepoInfo />
      </div>
    </section>
  )
}
