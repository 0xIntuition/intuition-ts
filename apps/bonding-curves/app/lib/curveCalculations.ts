import type { CurveParameters } from '~/components/CurveControls';

export interface CurvePoint {
  assets: number;
  shares: number;
}

export function generateCurvePoints(
  params: CurveParameters,
  numPoints: number = 100
): CurvePoint[] {
  const points: CurvePoint[] = [];
  const maxAssets = params.maxAssets || 1000;
  const step = maxAssets / (numPoints - 1);

  let totalShares = 0;
  let totalAssets = 0;

  for (let i = 0; i < numPoints; i++) {
    const assets = i * step;
    const shares = calculateShares(assets, totalShares, totalAssets, params);
    points.push({ assets, shares });
    totalAssets += assets;
    totalShares += shares;
  }

  return points;
}

function calculateShares(
  assets: number,
  totalShares: number,
  totalAssets: number,
  params: CurveParameters
): number {
  const { curveType } = params;

  switch (curveType) {
    case 'linear':
      return totalShares === 0 ? assets : (assets * totalShares) / totalAssets;

    case 'logarithmic': {
      if (totalAssets === 0) return assets;
      const scale = params.scale || 2e18;
      const offset = params.offset || 1;
      const newTotalAssets = totalAssets + assets;
      const lnOld = Math.log(totalAssets + offset);
      const lnNew = Math.log(newTotalAssets + offset);
      const deltaLn = lnNew - lnOld;
      return (deltaLn * scale) / 1e18;
    }

    default:
      return 0;
  }
}

export function calculateAssets(
  shares: number,
  totalShares: number,
  totalAssets: number,
  params: CurveParameters
): number {
  const { curveType } = params;

  switch (curveType) {
    case 'linear':
      return totalShares === 0 ? shares : (shares * totalAssets) / totalShares;

    case 'logarithmic': {
      if (shares === totalShares) return totalAssets;
      if (totalShares === 0) return 0;

      const scale = params.scale || 2e18;
      const offset = params.offset || 1;
      const remainingShares = totalShares - shares;
      const lnTotalShares = Math.log(totalShares + offset);
      const lnRemainingShares = Math.log(remainingShares + offset);
      const assetsRemaining = (totalAssets * lnRemainingShares) / lnTotalShares;
      return totalAssets - assetsRemaining;
    }

    default:
      return 0;
  }
} 