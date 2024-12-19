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

    function maxShares() public view virtual returns (uint256);
    function maxAssets() public view virtual returns (uint256);

    /// @notice Internal function to adjust integrated values based on total ratios
    /// @param value The value to adjust
    /// @param numerator The numerator for ratio adjustment (totalShares or totalAssets)
    /// @param denominator The denominator for ratio adjustment (totalAssets or totalShares)
    /// @return result The adjusted value accounting for pool ratios
    function _adjust(uint256 value, uint256 numerator, uint256 denominator) internal pure returns (uint256) {
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
    function previewDeposit(uint256 assets, uint256 totalAssets, uint256 totalShares) public view virtual returns (uint256 shares);

    // Deposit Adjustment Logic:
    // 1. Calculate the shares to mint
    // 2. Calculate the total assets in shares space
    // 3. Adjust the shares to mint by the ratio of total shares to totalAssetsInShareSpace
    // This cannot be abstracted because domain conversion is dependent on conversion domain
    // Put it in the preview overloads

    /// @notice Preview how many assets would be returned for burning a specific amount of shares
    ///
    /// @param shares Quantity of shares to burn
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be returned
    function previewRedeem(uint256 shares, uint256 totalShares, uint256 totalAssets) public view virtual returns (uint256 assets);

    // Redeem Adjustment Logic:
    // 1. Calculate the assets to return
    // 2. Calculate the total shares in assets space
    // 3. Adjust the assets to return by the ratio of total assets to totalSharesInAssetsSpace
    // This cannot be abstracted because domain conversion is dependent on conversion domain
    // Put it in the preview overloads

    /// @notice Construct the curve with a unique name
    ///
    /// @param _name Unique name for the curve
    constructor(string memory _name) {
        name = _name;
    }
}
