export const calculateAssets = (shares: bigint, sharePrice: bigint) => {
  if (shares === 0n || sharePrice === 0n) {
    return 0n
  }

  return (shares * sharePrice) / BigInt(10 ** 18)
}
