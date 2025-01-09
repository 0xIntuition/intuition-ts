import { ethers } from 'ethers';
import { LinearCurve__factory, LogarithmicCurve__factory } from '../typechain-types';

async function main() {
  const provider = new ethers.JsonRpcProvider('http://localhost:8545');
  const signer = await provider.getSigner();

  // Deploy Linear Curve
  const linearCurveFactory = new LinearCurve__factory(signer);
  const linearCurve = await linearCurveFactory.deploy("Linear Curve");
  await linearCurve.waitForDeployment();
  console.log('LinearCurve deployed to:', await linearCurve.getAddress());

  // Deploy Logarithmic Curve
  const logarithmicCurveFactory = new LogarithmicCurve__factory(signer);
  const logarithmicCurve = await logarithmicCurveFactory.deploy(
    2n * 10n ** 18n, // scale: 2e18
    1n, // offset: 1
    "Logarithmic Curve (2e18, 1)"
  );
  await logarithmicCurve.waitForDeployment();
  console.log('LogarithmicCurve deployed to:', await logarithmicCurve.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 