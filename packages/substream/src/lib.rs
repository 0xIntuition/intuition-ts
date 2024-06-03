mod abi;
mod pb;
use hex_literal::hex;
use pb::contract::v1 as contract;
use substreams::Hex;
use substreams_ethereum::pb::eth::v2 as eth;
use substreams_ethereum::Event;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;

substreams_ethereum::init!();

const CONTRACT: [u8; 20] = hex!("04056c43d0498b22f7a0c60d4c3584fb5fa881cc");

fn map_hello_events(blk: &eth::Block, events: &mut contract::Events) {
    events.atom_createds.append(
        &mut blk
            .receipts()
            .flat_map(|view| {
                view.receipt
                    .logs
                    .iter()
                    .filter(|log| log.address == CONTRACT)
                    .filter_map(|log| {
                        if let Some(event) =
                            abi::eth_multi_vault::events::AtomCreated::match_and_decode(log)
                        {
                            return Some(contract::AtomCreated {
                                evt_tx_hash: Hex(&view.transaction.hash).to_string(),
                                evt_index: log.block_index,
                                evt_block_time: Some(blk.timestamp().to_owned()),
                                evt_block_number: blk.number,
                                creator: event.creator,
                                wallet: event.atom_wallet,
                                vault_id: event.vault_id.to_string(),
                            });
                        }

                        None
                    })
            })
            .collect(),
    );
}

#[substreams::handlers::map]
fn map_events(blk: eth::Block) -> Result<contract::Events, substreams::errors::Error> {
    let mut events = contract::Events::default();
    map_hello_events(&blk, &mut events);
    Ok(events)
}
