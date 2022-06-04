use three_em_arweave::arweave::Arweave;
use three_em_arweave::cache::ArweaveCache;
use three_em_arweave::cache::CacheExt;
use three_em_executor::execute_contract;

#[tokio::main]
async fn main() {
  let arweave = Arweave::new(
    443,
    "arweave.net".to_string(),
    String::from("https"),
    ArweaveCache::new(),
  );

  execute_contract(
    "t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE".to_string(),
    None,
    true,
    false,
    None,
    None,
    &arweave,
  )
  .await
  .unwrap();
}
