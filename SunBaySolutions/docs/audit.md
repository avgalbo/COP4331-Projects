# API Audit

All documented endpoints have been reviewed for compliance against documentation on SwaggerHub.
    In some cases, implementation will vary slightly from docs,
        but this has been approved ahead of time if marked Compliant in this document.

## GET `/account/`
Owner: Jeffrey (reassigned)
- Compliant!
- Created `backwardsAccountGen(apiObj)` to assist; may be useful elsewhere.

## PATCH `/account/`
Owner: Jeffrey (reassigned)
- Compliant!
    - Please note that plain-text password storage is now deprecated and will result in reduced session lifetimes.

## POST `/account/login/`
Owner: Jeffrey (reassigned)
- Compliant!

## GET `/account/all/`
Owner: Jeffrey (on behalf of Kartik)
- Compliant!

## POST `/account/create/`
Owner: Chris (originally)
- Changed password behavior, who can create accounts.
- Added ID increment code, default values.
- Allow defining a pre-set password (optional)
- Compliant!

## GET `/hotel/`
Owner: Kartik
- URL fixed a bit.
- Use ErrorGen.
- Actually returned stuff.

## PATCH `/hotel/`
Owner: Kartik
- ⚠ Missing.

## GET `/room/:room_id`
Owner: Chris
- Compliant!

## POST `/room/:room_id`
Owner: Chris
- Fixed a bug where not giving a new room orders crashes the process in roomGen (might've been me, oops!)
- Set some things to null value.

## PATCH `/room/:room_id`
Owner: Chris
- 🔃 WIP.

## DELETE `/room/:room_id`
Owner: Chris
- Compliant!

## GET `/floor/:floor_number`
Owner: Chris
- Compliant!

## POST `/inventory/`
Owner: Jeffrey
- Needed incremention code. **Was resolved.**
    - Required overhauling because MongoDB deprecations and bugs with original SO code.

## PATCH `/inventory/:inventory_id`
Owner: Jeffrey
- Needed some output fixes.

## DELETE `/inventory/:inventory_id`
Owner: Jeffrey
- Compliant!

## GET `/room/`
Owner: Johnny
- Implemented `/room/:room_id` by mistake, and then Chris did too.
- Needs to only return active user's assigned room.

## GET `/inventory/`
Owner: Johnny
- Compliant!

## GET `/inventory/:inventory_id/:quantity`
Owner: Johnny
- ⚠ Missing!

## GET `/inventory/:inventory_id`
Owner: Jeffrey (on behalf of Johnny)
- Returned a single-item array. **Resolved.**

## GET `/orders/unclaimed/`
📌 Assigned to Johnny.

## GET `/orders/my/`
📌 Assigned to Johnny.

## GET `/orders/claim/:order_id`
📌 Assigned to Kartik.

## GET `/orders/claim/:fulfill`
📌 Assigned to Kartik.
