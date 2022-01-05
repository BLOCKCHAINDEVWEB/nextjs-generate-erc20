//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(
      string memory name_,
      string memory symbol_,
      address owner_,
      uint totalSupply_
    ) ERC20(name_, symbol_) {
        _mint(owner_, totalSupply_);
    }
}