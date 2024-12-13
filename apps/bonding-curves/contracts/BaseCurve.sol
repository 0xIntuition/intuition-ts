// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.27;

import {FixedPointMathLib} from "solady/utils/FixedPointMathLib.sol";

/**
 * @title  BaseCurve
 * @author 0xIntuition
 * @notice Abstract contract for a bonding curve. Defines the interface for converting assets to shares and vice versa.
 */
abstract contract BaseCurve {
    using FixedPointMathLib for uint256;

    string public name;

    /// @notice The number of intervals to use for integration
    uint256 public immutable INTEGRATION_INTERVALS;

    /// @notice Pure function to convert assets to shares at a specific point
    ///
    /// @param assets Quantity of assets to convert to shares
    /// @return shares The number of shares equivalent to the given assets
    function assetsToShares(uint256 assets) external view virtual returns (uint256);

    /// @notice Pure function to convert shares to assets at a specific point
    ///
    /// @param shares Quantity of shares to convert to assets
    /// @return assets The number of assets equivalent to the given shares
    function sharesToAssets(uint256 shares) external view virtual returns (uint256);

    /// @notice Pure function to convert assets to shares over a range
    ///
    /// @param assets Quantity of assets to convert to shares
    /// @return shares The number of shares equivalent to the given assets
    function integrateAssetsToShares(uint256 assets) public view virtual returns (uint256) {
        return _integrate(0, assets, true, true);
    }

    /// @notice Pure function to convert shares to assets over a range
    ///
    /// @param shares Quantity of shares to convert to assets
    /// @return assets The number of assets equivalent to the given shares
    function integrateSharesToAssets(uint256 shares) public view virtual returns (uint256) {
        return _integrate(0, shares, false, true);
    }

    /// @notice Validate a deposit operation
    /// @param assets Amount of assets to deposit
    /// @param totalAssets Current total assets
    function validateDeposit(uint256 assets, uint256 totalAssets) internal view virtual {
        require(totalAssets == totalAssets, "No limit by default");
        // require(assets > 0, "Cannot deposit zero assets"); // Commented out because now we are depositing 0 assets on creation
        require(assets == assets, "No restrictions by default");
    }

    /// @notice Validate a mint operation
    /// @param shares Amount of shares to mint
    /// @param totalShares Current total shares
    function validateMint(uint256 shares, uint256 totalShares) internal view virtual {
        require(totalShares == totalShares, "No limit by default");
        // require(shares > 0, "Cannot mint zero shares");
        require(shares == shares, "No restrictions by default");
    }

    /// @notice Validate a withdraw operation
    /// @param assets Amount of assets to withdraw
    /// @param totalAssets Current total assets
    function validateWithdraw(uint256 assets, uint256 totalAssets) internal view virtual {
        require(totalAssets == totalAssets, "No limit by default");
        //require(assets > 0, "Cannot withdraw zero assets");
        require(assets <= totalAssets, "Cannot withdraw more than total assets");
    }

    /// @notice Validate a redeem operation
    /// @param shares Amount of shares to redeem
    /// @param totalShares Current total shares
    function validateRedeem(uint256 shares, uint256 totalShares) internal view virtual {
        require(totalShares == totalShares, "No limit by default");
        //require(shares > 0, "Cannot redeem zero shares");
        require(shares <= totalShares, "Cannot redeem more than total shares");
    }

    /// @notice Internal function to compute the integral between two points
    /// @param startPoint Starting point for integration
    /// @param delta Change in value to integrate over
    /// @param isAssetsToShares True if converting assets to shares, false if shares to assets
    /// @param isForward True if integrating forward (deposit/mint), false if backward (withdraw/redeem)
    /// @return result The computed integral result
    function _integrate(uint256 startPoint, uint256 delta, bool isAssetsToShares, bool isForward)
        internal
        view
        virtual
        returns (uint256 result)
    {
        // Scale down inputs if they're too large
        uint256 scaleFactor = 1;
        while (startPoint > type(uint256).max >> 64 || delta > type(uint256).max >> 64) {
            startPoint = startPoint >> 32;
            delta = delta >> 32;
            scaleFactor = scaleFactor << 32;
        }

        // Use uniform intervals for integration
        uint256 numIntervals = INTEGRATION_INTERVALS;
        uint256 intervalSize = delta / numIntervals;
        if (intervalSize == 0) intervalSize = 1; // Ensure minimum interval size

        uint256 sum;
        uint256 lastPoint = startPoint;

        for (uint256 i = 1; i <= numIntervals; i++) {
            uint256 point;
            if (isForward) {
                point = startPoint + (i * intervalSize);
                if (i == numIntervals) point = startPoint + delta; // Ensure we hit the exact end point
            } else {
                point = startPoint - delta + (i * intervalSize);
                if (i == numIntervals) point = startPoint; // Ensure we hit the exact end point
            }

            // Get values at this point and the last point with scaled inputs
            uint256 y1 = isAssetsToShares
                ? this.assetsToShares(lastPoint * scaleFactor) / scaleFactor
                : this.sharesToAssets(lastPoint * scaleFactor) / scaleFactor;

            uint256 y2 = isAssetsToShares
                ? this.assetsToShares(point * scaleFactor) / scaleFactor
                : this.sharesToAssets(point * scaleFactor) / scaleFactor;

            // Use trapezoidal rule for better accuracy
            sum += (y1 + y2) / 2;

            lastPoint = point;
        }

        // Average the sum and scale back up
        result = (sum / numIntervals) * scaleFactor;
    }

    /// @notice Internal function to adjust integrated values based on total ratios
    /// @param value The value to adjust
    /// @param numerator The numerator for ratio adjustment (totalShares or totalAssets)
    /// @param denominator The denominator for ratio adjustment (totalAssets or totalShares)
    /// @return result The adjusted value accounting for pool ratios
    function _adjust(uint256 value, uint256 numerator, uint256 denominator) internal view returns (uint256) {
        if (numerator == denominator) {
            return value;
        }
        if (numerator == 0 || denominator == 0) {
            return 0;
        }

        // Scale down inputs if they're too large
        uint256 scaleFactor = 1;
        while (
            value > type(uint256).max >> 64 || numerator > type(uint256).max >> 64
                || denominator > type(uint256).max >> 64
        ) {
            value = value >> 32;
            numerator = numerator >> 32;
            denominator = denominator >> 32;
            scaleFactor = scaleFactor << 32;
        }

        // Perform the division with scaled values
        uint256 result = FixedPointMathLib.fullMulDiv(value, numerator, denominator);

        // Scale the result back up
        return result * scaleFactor;
    }

    /// @notice Preview how many shares would be minted for a deposit of assets
    ///
    /// @param assets Quantity of assets to deposit
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would be minted
    function previewDeposit(uint256 assets, uint256 totalAssets, uint256 totalShares)
        public
        view
        returns (uint256 shares)
    {
        validateDeposit(assets, totalAssets);

        // For first deposit or very small pools, use direct conversion
        // We need to integrate still, but we don't need to adjust at least (TODO)
        // if (totalAssets == 0 || totalShares == 0) {
        //     return this.assetsToShares(assets);
        // }

        // Get relative shares from curve
        uint256 assetsToShares = _integrate(totalAssets, assets, true, true);

        uint256 totalAssetsInShares = this.integrateAssetsToShares(totalAssets);

        // Adjust to maintain proportional ownership in share-space
        return _adjust(assetsToShares, totalShares, totalAssetsInShares);
    }

    /// @notice Preview how many assets would be needed to mint a specific amount of shares
    ///
    /// @param shares Quantity of shares to mint
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be required
    function previewMint(uint256 shares, uint256 totalShares, uint256 totalAssets)
        public
        view
        returns (uint256 assets)
    {
        validateMint(shares, totalShares);

        // if (totalAssets == 0 || totalShares == 0) {
        //     return this.sharesToAssets(shares);
        // }

        // Get relative assets from curve
        uint256 sharesToAssets = _integrate(totalShares, shares, false, true);

        uint256 totalSharesInAssets = this.integrateSharesToAssets(totalShares);

        // Adjust to maintain proportional ownership in asset-space
        return _adjust(sharesToAssets, totalAssets, totalSharesInAssets);
    }

    /// @notice Preview how many shares would be burned for a withdrawal of assets
    ///
    /// @param assets Quantity of assets to withdraw
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would be burned
    function previewWithdraw(uint256 assets, uint256 totalAssets, uint256 totalShares)
        public
        view
        returns (uint256 shares)
    {
        validateWithdraw(assets, totalAssets);

        // // For first deposit or very small pools, use direct conversion
        // if (totalAssets == 0 || totalShares == 0) {
        //     return this.assetsToShares(assets);
        // }

        // Get relative shares from curve
        uint256 assetsToShares = _integrate(totalAssets, assets, true, false);

        // Convert totalAssets to share-space before adjustment
        uint256 totalAssetsInShares = this.integrateAssetsToShares(totalAssets);
        // Adjust to maintain proportional ownership in share-space
        return _adjust(assetsToShares, totalShares, totalAssetsInShares);
    }

    /// @notice Preview how many assets would be returned for burning a specific amount of shares
    ///
    /// @param shares Quantity of shares to burn
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be returned
    function previewRedeem(uint256 shares, uint256 totalShares, uint256 totalAssets)
        public
        view
        returns (uint256 assets)
    {
        validateRedeem(shares, totalShares);

        // Get relative assets from curve
        uint256 sharesToAssets = _integrate(totalShares, shares, false, false);

        // Convert totalShares to asset-space before adjustment
        uint256 totalSharesInAssets = this.integrateSharesToAssets(totalShares);

        // Adjust to maintain proportional ownership in asset-space
        return _adjust(sharesToAssets, totalAssets, totalSharesInAssets);
    }

    /// @notice Construct the curve with a unique name and number of integration intervals
    ///
    /// @param _name Unique name for the curve
    /// @param _integrationIntervals Number of intervals to use for integration calculations
    constructor(string memory _name, uint256 _integrationIntervals) {
        require(_integrationIntervals > 0, "Integration intervals must be greater than 0");
        name = _name;
        INTEGRATION_INTERVALS = _integrationIntervals;
    }
}
