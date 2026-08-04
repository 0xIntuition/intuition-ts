---
'@0xintuition/sdk': minor
---

Forward the correct payable value when depositing into one or more vaults and when creating triple statements in a batch. `batchCreateTripleStatements` now warns once when its deprecated, ignored `depositAmount` parameter is passed with a nonzero value.
