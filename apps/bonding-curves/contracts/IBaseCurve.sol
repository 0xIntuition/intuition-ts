// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.27;

/**
 * @title  IBaseCurve
 * @author 0xIntuition
 * @notice Interface for bonding curves in the Intuition protocol.
 *         All curves must implement these functions to be compatible with the protocol.
 */
interface IBaseCurve {
    /// @notice Get the name of the curve
    /// @return name The name of the curve
    function name() external view returns (string memory);

    /// @notice Get the maximum number of shares the curve can handle
    /// @return The maximum number of shares
    function maxShares() external view returns (uint256);

    /// @notice Get the maximum number of assets the curve can handle
    /// @return The maximum number of assets
    function maxAssets() external view returns (uint256);

    /// @notice Preview how many shares would be minted for a deposit of assets
    /// @param assets Quantity of assets to deposit
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would be minted
    function previewDeposit(uint256 assets, uint256 totalAssets, uint256 totalShares)
        external
        view
        returns (uint256 shares);

    /// @notice Preview how many assets would be returned for burning a specific amount of shares
    /// @param shares Quantity of shares to burn
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be returned
    function previewRedeem(uint256 shares, uint256 totalShares, uint256 totalAssets)
        external
        view
        returns (uint256 assets);

    /// @notice Preview how many shares would be redeemed for a withdrawal of assets
    /// @param assets Quantity of assets to withdraw
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares that would need to be redeemed
    function previewWithdraw(uint256 assets, uint256 totalAssets, uint256 totalShares)
        external
        view
        returns (uint256 shares);

    /// @notice Preview how many assets would be required to mint a specific amount of shares
    /// @param shares Quantity of shares to mint
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets that would be required to mint the shares
    function previewMint(uint256 shares, uint256 totalShares, uint256 totalAssets)
        external
        view
        returns (uint256 assets);

    /// @notice Convert assets to shares at a specific point on the curve
    /// @param assets Quantity of assets to convert to shares
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return shares The number of shares equivalent to the given assets
    function convertToShares(uint256 assets, uint256 totalAssets, uint256 totalShares)
        external
        view
        returns (uint256 shares);

    /// @notice Convert shares to assets at a specific point on the curve
    /// @param shares Quantity of shares to convert to assets
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @param totalAssets Total quantity of assets already staked into the curve
    /// @return assets The number of assets equivalent to the given shares
    function convertToAssets(uint256 shares, uint256 totalShares, uint256 totalAssets)
        external
        view
        returns (uint256 assets);

    /// @notice Get the current price of a share
    /// @param totalShares Total quantity of shares already awarded by the curve
    /// @return sharePrice The current price of a share, scaled by 1e18
    function currentPrice(uint256 totalShares) external view returns (uint256 sharePrice);
}
