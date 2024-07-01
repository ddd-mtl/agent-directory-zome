/// Copied from hdk/hash_path
/// TODO: Remove this once hdk/hash_path is moved to hdi and can be imported normally
mod component_copypasta;
mod validation;



use hdi::prelude::*;


/// List of all Link kinds handled by this Zome
#[hdk_link_types]
pub enum AgentDirectoryLinkType {
   Agent,
}

/// Entry types not really necessary but it is defined because we don't want entry_defs() to fail

#[hdk_entry_types]
#[unit_enum(AgentDirectoryEntryTypes)]
pub enum AgentDirectoryEntry {
   #[entry_type(required_validations = 1, visibility = "private")]
   Stub(Stub),
}


/// Bogus Entry
#[hdk_entry_helper]
#[derive(Clone, PartialEq)]
pub struct Stub {}
