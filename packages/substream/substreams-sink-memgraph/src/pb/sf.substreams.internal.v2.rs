// @generated
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct StoreDeltas {
    #[prost(message, repeated, tag="1")]
    pub store_deltas: ::prost::alloc::vec::Vec<StoreDelta>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct StoreDelta {
    #[prost(enumeration="store_delta::Operation", tag="1")]
    pub operation: i32,
    #[prost(uint64, tag="2")]
    pub ordinal: u64,
    #[prost(string, tag="3")]
    pub key: ::prost::alloc::string::String,
    #[prost(bytes="vec", tag="4")]
    pub old_value: ::prost::alloc::vec::Vec<u8>,
    #[prost(bytes="vec", tag="5")]
    pub new_value: ::prost::alloc::vec::Vec<u8>,
}
/// Nested message and enum types in `StoreDelta`.
pub mod store_delta {
    #[derive(Clone, Copy, Debug, PartialEq, Eq, Hash, PartialOrd, Ord, ::prost::Enumeration)]
    #[repr(i32)]
    pub enum Operation {
        Unset = 0,
        Create = 1,
        Update = 2,
        Delete = 3,
    }
    impl Operation {
        /// String value of the enum field names used in the ProtoBuf definition.
        ///
        /// The values are not transformed in any way and thus are considered stable
        /// (if the ProtoBuf definition does not change) and safe for programmatic use.
        pub fn as_str_name(&self) -> &'static str {
            match self {
                Operation::Unset => "UNSET",
                Operation::Create => "CREATE",
                Operation::Update => "UPDATE",
                Operation::Delete => "DELETE",
            }
        }
        /// Creates an enum from field names used in the ProtoBuf definition.
        pub fn from_str_name(value: &str) -> ::core::option::Option<Self> {
            match value {
                "UNSET" => Some(Self::Unset),
                "CREATE" => Some(Self::Create),
                "UPDATE" => Some(Self::Update),
                "DELETE" => Some(Self::Delete),
                _ => None,
            }
        }
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ModuleOutput {
    #[prost(string, tag="1")]
    pub module_name: ::prost::alloc::string::String,
    #[prost(string, repeated, tag="4")]
    pub logs: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    #[prost(bool, tag="5")]
    pub debug_logs_truncated: bool,
    #[prost(bool, tag="6")]
    pub cached: bool,
    #[prost(oneof="module_output::Data", tags="2, 3")]
    pub data: ::core::option::Option<module_output::Data>,
}
/// Nested message and enum types in `ModuleOutput`.
pub mod module_output {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Oneof)]
    pub enum Data {
        #[prost(message, tag="2")]
        MapOutput(::prost_types::Any),
        #[prost(message, tag="3")]
        StoreDeltas(super::StoreDeltas),
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ProcessRangeRequest {
    #[prost(uint64, tag="1")]
    pub start_block_num: u64,
    #[prost(uint64, tag="2")]
    pub stop_block_num: u64,
    #[prost(string, tag="3")]
    pub output_module: ::prost::alloc::string::String,
    #[prost(message, optional, tag="4")]
    pub modules: ::core::option::Option<super::super::v1::Modules>,
    /// 0-based index of stage to execute up to
    #[prost(uint32, tag="5")]
    pub stage: u32,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ProcessRangeResponse {
    #[prost(string, tag="1")]
    pub module_name: ::prost::alloc::string::String,
    #[prost(oneof="process_range_response::Type", tags="2, 3, 4, 5")]
    pub r#type: ::core::option::Option<process_range_response::Type>,
}
/// Nested message and enum types in `ProcessRangeResponse`.
pub mod process_range_response {
    #[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Oneof)]
    pub enum Type {
        #[prost(message, tag="2")]
        ProcessedRange(super::BlockRange),
        #[prost(message, tag="3")]
        ProcessedBytes(super::ProcessedBytes),
        #[prost(message, tag="4")]
        Failed(super::Failed),
        #[prost(message, tag="5")]
        Completed(super::Completed),
    }
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Completed {
    #[prost(message, repeated, tag="1")]
    pub all_processed_ranges: ::prost::alloc::vec::Vec<BlockRange>,
    /// TraceId represents the producer's trace id that produced the partial files.
    /// This is present here so that the consumer can use it to identify the
    /// right partial files that needs to be squashed together.
    ///
    /// The TraceId can be empty in which case it should be assumed by the tier1
    /// consuming this message that the tier2 that produced those partial files
    /// is not yet updated to produce a trace id and a such, the tier1 should
    /// generate a legacy partial file name.
    #[prost(string, tag="2")]
    pub trace_id: ::prost::alloc::string::String,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct ProcessedBytes {
    #[prost(uint64, tag="1")]
    pub total_bytes_read: u64,
    #[prost(uint64, tag="2")]
    pub total_bytes_written: u64,
    #[prost(uint64, tag="3")]
    pub bytes_read_delta: u64,
    #[prost(uint64, tag="4")]
    pub bytes_written_delta: u64,
    #[prost(uint64, tag="5")]
    pub nano_seconds_delta: u64,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Failed {
    #[prost(string, tag="1")]
    pub reason: ::prost::alloc::string::String,
    #[prost(string, repeated, tag="2")]
    pub logs: ::prost::alloc::vec::Vec<::prost::alloc::string::String>,
    /// FailureLogsTruncated is a flag that tells you if you received all the logs or if they
    /// were truncated because you logged too much (fixed limit currently is set to 128 KiB).
    #[prost(bool, tag="3")]
    pub logs_truncated: bool,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct BlockRange {
    #[prost(uint64, tag="2")]
    pub start_block: u64,
    #[prost(uint64, tag="3")]
    pub end_block: u64,
}
include!("sf.substreams.internal.v2.tonic.rs");
// @@protoc_insertion_point(module)