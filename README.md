# X Video Hider

A Firefox extension that hides posts containing video content from your X.com (Twitter) timeline.

## How it works

`content.js` scans the timeline for tweet articles containing a `<video>` element or X's video-player component, and hides the whole post. It re-scans continuously via a `MutationObserver` so it keeps working as you scroll. A toolbar popup lets you toggle the filter on/off.

## Install (temporary, for development)

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Click **Load Temporary Add-on…**
3. Select `manifest.json` from this folder.

Temporary add-ons are removed when Firefox restarts.

## Install (signed, permanent)

See the signing instructions in the project notes, or submit `manifest.json` + source files to [addons.mozilla.org](https://addons.mozilla.org/developers/) for self-distribution signing.
