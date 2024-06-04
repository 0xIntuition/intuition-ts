// @generated
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct Service {
    /// Containing both create table statements and index creation statements
    #[prost(string, tag="1")]
    pub schema: ::prost::alloc::string::String,
    #[prost(string, tag="2")]
    pub subgraph_yaml: ::prost::alloc::string::String,
    #[prost(bool, tag="3")]
    pub postgres_direct_protocol_access: bool,
    #[prost(message, optional, tag="4")]
    pub pgweb_frontend: ::core::option::Option<PgWebFrontend>,
}
#[allow(clippy::derive_partial_eq_without_eq)]
#[derive(Clone, PartialEq, ::prost::Message)]
pub struct PgWebFrontend {
    #[prost(bool, tag="1")]
    pub enabled: bool,
}
// @@protoc_insertion_point(module)
