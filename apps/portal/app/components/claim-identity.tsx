interface ClaimIdentityProps {
  image: string
  display_name: string
  isUser?: boolean
}

export function ClaimIdentity({
  image,
  display_name,
  isUser,
}: ClaimIdentityProps) {
  const maxChars = 18
  const truncatedDisplayName =
    display_name?.length > maxChars
      ? `${display_name.slice(0, maxChars)}...`
      : display_name

  return (
    <div
      className={`flex w-fit flex-row items-center gap-1 border bg-card p-0.5 pr-2 ${
        isUser ? 'rounded-full' : 'rounded-[3px]'
      }`}
    >
      <img
        src={image}
        alt={truncatedDisplayName}
        className={`${isUser ? 'rounded-full' : 'rounded-[3px]'}`}
        width={18}
        height={18}
      />
      <span className="text-xs text-primary-foreground">
        {truncatedDisplayName}
      </span>
    </div>
  )
}
