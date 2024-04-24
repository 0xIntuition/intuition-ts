import { ThemeSwitch } from '~/routes/actions+/set-theme'

export interface ThemeTestProps {}

export function ThemeTest(props: ThemeTestProps) {
  return (
    <div className="flex items-start flex-col gap-4 m-5">
      <ThemeSwitch />
      <section className="mt-24">
        <div className="mt-2 flex flex-wrap items-center gap-6">
          <div className="flex overflow-hidden rounded-md" data-theme="dark">
            <div className="grid h-16 w-16 place-items-end bg-primary-50 p-1 font-semibold leading-none text-primary-900">
              50
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-100 p-1 font-semibold leading-none text-primary-900">
              100
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-200 p-1 font-semibold leading-none text-primary-900">
              200
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-300 p-1 font-semibold leading-none text-primary-900">
              300
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-400 p-1 font-semibold leading-none text-primary-900">
              400
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-500 p-1 font-semibold leading-none text-primary-50">
              500
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-600 p-1 font-semibold leading-none text-primary-50">
              600
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-700 p-1 font-semibold leading-none text-primary-50">
              700
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-800 p-1 font-semibold leading-none text-primary-50">
              800
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-900 p-1 font-semibold leading-none text-primary-50">
              900
            </div>
          </div>
          <div className="flex overflow-hidden rounded-md" data-theme="warlock">
            <div className="grid h-16 w-16 place-items-end bg-primary-50 p-1 font-semibold leading-none text-primary-900">
              50
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-100 p-1 font-semibold leading-none text-primary-900">
              100
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-200 p-1 font-semibold leading-none text-primary-900">
              200
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-300 p-1 font-semibold leading-none text-primary-900">
              300
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-400 p-1 font-semibold leading-none text-primary-900">
              400
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-500 p-1 font-semibold leading-none text-primary-50">
              500
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-600 p-1 font-semibold leading-none text-primary-50">
              600
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-700 p-1 font-semibold leading-none text-primary-50">
              700
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-800 p-1 font-semibold leading-none text-primary-50">
              800
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-900 p-1 font-semibold leading-none text-primary-50">
              900
            </div>
          </div>
          <div className="flex overflow-hidden rounded-md" data-theme="candy">
            <div className="grid h-16 w-16 place-items-end bg-primary-50 p-1 font-semibold leading-none text-primary-900">
              50
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-100 p-1 font-semibold leading-none text-primary-900">
              100
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-200 p-1 font-semibold leading-none text-primary-900">
              200
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-300 p-1 font-semibold leading-none text-primary-900">
              300
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-400 p-1 font-semibold leading-none text-primary-900">
              400
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-500 p-1 font-semibold leading-none text-primary-50">
              500
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-600 p-1 font-semibold leading-none text-primary-50">
              600
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-700 p-1 font-semibold leading-none text-primary-50">
              700
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-800 p-1 font-semibold leading-none text-primary-50">
              800
            </div>
            <div className="grid h-16 w-16 place-items-end bg-primary-900 p-1 font-semibold leading-none text-primary-50">
              900
            </div>
          </div>
        </div>
      </section>
      <div className="mt-2 grid gap-6">
        <div className="flex gap-4" data-theme="rose">
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            100%
          </div>
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md bg-opacity-70 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            70%
          </div>
          <div className="bg-primary-600/50 text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            50%
          </div>
          <div className="bg-primary-600 text-primary-900 grid h-16 w-16 place-items-end rounded-md bg-opacity-30 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            30%
          </div>
          <div className="bg-primary-600/[0.1] text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            10%
          </div>
        </div>
        <div className="flex gap-4" data-theme="warlock">
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            100%
          </div>
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md bg-opacity-70 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            70%
          </div>
          <div className="bg-primary-600/50 text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            50%
          </div>
          <div className="bg-primary-600 text-primary-900 grid h-16 w-16 place-items-end rounded-md bg-opacity-30 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            30%
          </div>
          <div className="bg-primary-600/[0.1] text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            10%
          </div>
        </div>
        <div className="flex gap-4" data-theme="candy">
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            100%
          </div>
          <div className="bg-primary-600 text-primary-50 grid h-16 w-16 place-items-end rounded-md bg-opacity-70 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            70%
          </div>
          <div className="bg-primary-600/50 text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            50%
          </div>
          <div className="bg-primary-600 text-primary-900 grid h-16 w-16 place-items-end rounded-md bg-opacity-30 p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            30%
          </div>
          <div className="bg-primary-600/[0.1] text-primary-900 grid h-16 w-16 place-items-end rounded-md p-1 font-semibold leading-none ring-2 ring-inset ring-black/10">
            10%
          </div>
        </div>
      </div>
    </div>
  )
}
