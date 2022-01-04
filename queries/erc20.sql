CREATE TABLE IF NOT EXISTS erc20(
    id SERIAL PRIMARY KEY,
    contract_address VARCHAR(45) NOT NULL,
    token_network VARCHAR(10) NOT NULL,
    token_name VARCHAR(10) NOT NULL,
    token_symbol VARCHAR(10) NOT NULL,
    total_supply VARCHAR(45) NOT NULL,
    sender_address VARCHAR(45) NOT NULL,
    token_description VARCHAR DEFAULT '',
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO erc20(contract_address, token_network, token_name, token_symbol, total_supply, sender_address, token_description) VALUES ('0x771BbBA78cD9CB11AD7481D5F157efDa2b0dAC60', 'goerli', 'ERC20Mock', 'ERC20M', '10000000000000000000000', '0x1474CfFA8f8E1B48a37543510de18bC8Cc835406', '');


SELECT * FROM erc20;