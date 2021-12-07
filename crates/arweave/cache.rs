use crate::arweave::LoadedContract;
use crate::gql_result::GQLEdgeInterface;
use deno_core::serde_json::{json, Value};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs::{create_dir_all, remove_file, File};
use std::io::BufReader;
use std::path::PathBuf;

pub struct ArweaveCache {
  pub contracts_cache_folder: PathBuf,
  pub interactions_cache_folder: PathBuf,
  pub states_cache_folder: PathBuf,
}

#[derive(Serialize, Deserialize)]
pub struct StateResult {
  pub state: Value,
  pub validity: HashMap<String, bool>,
}

impl ArweaveCache {
  pub fn new() -> ArweaveCache {
    if let Some(cache_dir) = dirs::cache_dir() {
      let root_cache_dir = cache_dir.join("3em").join("contracts");
      let interactions_cache_dir = cache_dir.join("3em").join("interactions");
      let states_cache_dir = cache_dir.join("3em").join("states");

      create_dir_all(root_cache_dir.to_owned()).unwrap();
      create_dir_all(interactions_cache_dir.to_owned()).unwrap();
      create_dir_all(states_cache_dir.to_owned()).unwrap();

      ArweaveCache {
        contracts_cache_folder: root_cache_dir,
        interactions_cache_folder: interactions_cache_dir,
        states_cache_folder: states_cache_dir,
      }
    } else {
      panic!("Cache folder could not be set");
    }
  }

  pub async fn find_contract(
    &self,
    contract_id: String,
  ) -> Option<LoadedContract> {
    let cache_file = self.get_cache_file(contract_id);

    let file = File::open(cache_file);

    match file {
      Ok(data) => {
        let reader = BufReader::new(data);
        let loaded_contract: LoadedContract =
          deno_core::serde_json::from_reader(reader).unwrap();
        Some(loaded_contract)
      }
      Err(_) => None,
    }
  }

  pub async fn find_interactions(
    &self,
    contract_id: String,
  ) -> Option<Vec<GQLEdgeInterface>> {
    let cache_file = self.get_cache_interaction_file(contract_id);

    let file = File::open(cache_file);

    match file {
      Ok(data) => {
        let reader = BufReader::new(data);
        let interactions: Vec<GQLEdgeInterface> =
          deno_core::serde_json::from_reader(reader).unwrap();
        Some(interactions)
      }
      Err(_) => None,
    }
  }

  pub async fn find_state(&self, contract_id: String) -> Option<StateResult> {
    let cache_file = self.get_cache_state_file(contract_id);

    let file = File::open(cache_file);

    match file {
      Ok(data) => {
        let reader = BufReader::new(data);
        let state: StateResult =
          deno_core::serde_json::from_reader(reader).unwrap();
        Some(state)
      }
      Err(_) => None,
    }
  }

  pub async fn cache_contract(&self, loaded_contract: &LoadedContract) {
    let cache_file = self.get_cache_file(loaded_contract.id.to_owned());
    deno_core::serde_json::to_writer(
      &File::create(cache_file).unwrap(),
      loaded_contract,
    )
    .unwrap();
  }

  pub async fn cache_interactions(
    &self,
    contract_id: String,
    interactions: &Vec<GQLEdgeInterface>,
  ) {
    let cache_file = self.get_cache_interaction_file(contract_id.to_owned());
    deno_core::serde_json::to_writer(
      &File::create(cache_file).unwrap(),
      interactions,
    )
    .unwrap();
  }

  pub async fn cache_states(
    &self,
    contract_id: String,
    state: &Value,
    validity: &HashMap<String, bool>,
  ) {
    let cache_file = self.get_cache_state_file(contract_id.to_owned());

    let content = json!({
        "state": state,
        "validity": validity
    });

    deno_core::serde_json::to_writer(
      &File::create(cache_file).unwrap(),
      &content,
    )
    .unwrap();
  }

  pub async fn delete_cache_interactions(&self, contract_id: String) {
    let cache_file = self.get_cache_interaction_file(contract_id.to_owned());
    remove_file(cache_file).unwrap();
  }

  fn get_cache_file(&self, contract_id: String) -> PathBuf {
    let mut cache_file = self.contracts_cache_folder.to_owned();

    cache_file.push(format!("{}.json", contract_id));

    cache_file
  }

  fn get_cache_interaction_file(&self, contract_id: String) -> PathBuf {
    let mut cache_file = self.interactions_cache_folder.to_owned();

    cache_file.push(format!("{}.json", contract_id));

    cache_file
  }

  fn get_cache_state_file(&self, contract_id: String) -> PathBuf {
    let mut cache_file = self.states_cache_folder.to_owned();

    cache_file.push(format!("{}_result.json", contract_id));

    cache_file
  }
}
