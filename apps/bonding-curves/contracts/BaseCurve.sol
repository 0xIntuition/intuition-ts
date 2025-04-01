// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.27;

import {Errors} from "./Errors.sol";
import {IBaseCurve} from "./IBaseCurve.sol";

/**
 * @title  BaseCurve
 * @author 0xIntuition
 * @notice Abstract contract for a bonding curve. Defines the interface for converting assets to shares and vice versa.
 * @dev This contract is designed to be inherited by other bonding curve contracts, providing a common interface for
 *      converting between assets and shares.
 * @dev These curves handle the pure mathematical relationship for share price.  Pool ratio adjustments (such as
 *      accomodating for the effect of fees, supply burn, airdrops, etc) are handled by the EthMultiVault instead
 *      of the curves themselves.
 */
abstract contract BaseCurve is IBaseCurve {
    /// @notice The name of the curve
    string public name;

    /// @notice Construct the curve with a unique name
    ///
    /// @param _name Unique name for the curve
    constructor(string memory _name) {
        if (bytes(_name).length == 0) {
            revert Errors.BaseCurve_EmptyStringNotAllowed();
        }

        name = _name;
    }

    /// @notice The maximum number of shares that this curve can handle without overflowing.
    /// @dev Checked by the EthMultiVault before transacting
    function maxShares() external view virtual returns (uint256);

    /// @notice The maximum number of assets that this curve can handle without overflowing.
    /// @dev Checked by the EthMultiVault before transacting
    function maxAssets() external view virtual returns (uint256);

    /// @notice Preview how many shares would be minted for a deposit of assets
    ///
    /// @param assets Quantity of assets to deposit
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would be minted
    function previewDeposit(uint256 assets, uint256 totalAssets, uint256 totalShares)
        external
        view
        virtual
        returns (uint256 shares);

    /// @notice Preview how many assets would be required to mint a specific amount of shares
    ///
    /// @param shares Quantity of shares to mint
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be required to mint the shares
    function previewMint(uint256 shares, uint256 totalShares, uint256 totalAssets)
        external
        view
        virtual
        returns (uint256 assets);

    /// @notice Preview how many shares would be redeemed for a withdrawal of assets
    ///
    /// @param assets Quantity of assets to withdraw
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would need to be redeemed
    function previewWithdraw(uint256 assets, uint256 totalAssets, uint256 totalShares)
        external
        view
        virtual
        returns (uint256 shares);

    /// @notice Preview how many assets would be returned for burning a specific amount of shares
    ///
    /// @param shares Quantity of shares to burn
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be returned
    function previewRedeem(uint256 shares, uint256 totalShares, uint256 totalAssets)
        external
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
        external
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
        external
        view
        virtual
        returns (uint256 assets);

    /// @notice Get the current price of a share
    ///
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return sharePrice The current price of a share, scaled by 1e18
    function currentPrice(uint256 totalShares) public view virtual returns (uint256 sharePrice);
}
