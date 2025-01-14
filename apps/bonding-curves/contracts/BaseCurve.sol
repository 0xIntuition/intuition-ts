// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.27;

import {UD60x18, ud60x18} from "@prb/math/UD60x18.sol";

/**
 * @title  BaseCurve
 * @author 0xIntuition
 * @notice Abstract contract for a bonding curve. Defines the interface for converting assets to shares and vice versa.
 */
abstract contract BaseCurve {
    string public name;

    function maxShares() public view virtual returns (uint256);
    function maxAssets() public view virtual returns (uint256);

    /// @notice Internal function to adjust integrated values based on total ratios
    /// @param value The value to adjust - shares or assets being computed - i.e. shares or assets
    /// @param numerator The numerator for ratio adjustment - total in domain of value - i.e. totalShares or totalAssets
    /// @param denominator The denominator for ratio adjustment - total in *other domain* converted to value domain - i.e. totalAssetsInShareSpace or totalSharesInAssetSpace
    /// @return result The adjusted value accounting for pool ratios
    ///
    function _adjust(uint256 value, uint256 numerator, uint256 denominator) internal pure returns (uint256) {
        if (numerator == denominator) {
            return value;
        }
        if (numerator == 0 || denominator == 0) {
            return 0;
        }

        /// @dev: The numerator will the the total of the value domain
        /// @dev: (i.e. shares -> totalShares, assets -> totalAssets)
        /// @dev: And the denominator should be the total of the return domain converted to it's corresponding domain
        /// @dev: (i.e. shares -> totalAssetsInShareSpace, assets -> totalSharesInAssetSpace)
        // Utilize the same precision that the curves have with fixed point arithmetic
        return UD60x18.wrap(value).mul(UD60x18.wrap(numerator)).div(UD60x18.wrap(denominator)).unwrap();
    }

    /// @notice Preview how many shares would be minted for a deposit of assets
    ///
    /// @param assets Quantity of assets to deposit
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would be minted
    /// @dev The implementation of this function must call _adjust()
    function previewDeposit(uint256 assets, uint256 totalAssets, uint256 totalShares)
        public
        view
        virtual
        returns (uint256 shares);

    /// @notice Preview how many assets would be returned for burning a specific amount of shares
    ///
    /// @param shares Quantity of shares to burn
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be returned
    /// @dev The implementation of this function must call _adjust()
    function previewRedeem(uint256 shares, uint256 totalShares, uint256 totalAssets)
        public
        view
        virtual
        returns (uint256 assets);

    /// @notice Preview how many shares would be redeemed for a withdrawal of assets
    ///
    /// @param assets Quantity of assets to withdraw
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would need to be redeemed
    /// @dev The implementation of this function must call _adjust()
    function previewWithdraw(uint256 assets, uint256 totalAssets, uint256 totalShares)
        public
        view
        virtual
        returns (uint256 shares);

    /// @notice Preview how many assets would be required to mint a specific amount of shares
    ///
    /// @param shares Quantity of shares to mint
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be required to mint the shares
    /// @dev The implementation of this function must call _adjust()
    function previewMint(uint256 shares, uint256 totalShares, uint256 totalAssets)
        public
        view
        virtual
        returns (uint256 assets);

    /// @notice Convert assets to shares at a specific point on the curve
    ///
    /// @param assets Quantity of assets to convert to shares
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares equivalent to the given assets
    function convertToShares(uint256 assets, uint256 totalAssets, uint256 totalShares)
        public
        view
        virtual
        returns (uint256 shares);

    /// @notice Convert shares to assets at a specific point on the curve
    ///
    /// @param shares Quantity of shares to convert to assets
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets equivalent to the given shares
    function convertToAssets(uint256 shares, uint256 totalShares, uint256 totalAssets)
        public
        view
        virtual
        returns (uint256 assets);

    /// @notice Get the current price of a share
    ///
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return sharePrice The current price of a share
    function currentPrice(uint256 totalShares) public view virtual returns (uint256 sharePrice);

    /// @notice Construct the curve with a unique name
    ///
    /// @param _name Unique name for the curve
    constructor(string memory _name) {
        name = _name;
    }
}
