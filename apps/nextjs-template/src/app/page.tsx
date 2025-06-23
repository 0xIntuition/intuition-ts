'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Footer from 'src/components/Footer';
import { IntuitionCreateThingButton } from 'src/components/intuition/IntuitionCreateThingButton';
import { INTUITION_LINK } from 'src/links';

export default function Page() {

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="mt-6 mb-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a
            href={INTUITION_LINK}
            title="Intuition System Demo"
            target="_blank"
            rel="noreferrer"
          >
            Intuition System Demo
          </a>
          <div className="flex items-center gap-3">
            <ConnectButton/>
          </div>
        </div>
      </section>
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-300 px-2 py-4 md:grow ">
        <div className="flex h-[450px] w-[450px] max-w-full items-center justify-center rounded-xl">
          <div className="rounded-xl bg-[#F3F4F6] px-4 py-[11px]">
            <IntuitionCreateThingButton className="w-full"/>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
