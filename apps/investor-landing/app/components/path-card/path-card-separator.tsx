export default function PathCardSeparator() {
  return (
    <div className="flex items-center gap-0">
      <div className="w-6">
        <hr className="theme-border" />
      </div>
      <div className="w-fit h-auto theme-border bg-transparent rounded-md p-2.5">
        OR
      </div>
      <div className="w-6">
        <hr className="theme-border" />
      </div>
    </div>
  )
}
