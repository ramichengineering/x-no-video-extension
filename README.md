# X Video Hider

A Firefox extension that hides posts containing video content from your X.com (Twitter) timeline.

## How it works

`content.js` scans the timeline for tweet articles containing a `<video>` element or X's video-player component, and hides the whole post. It re-scans continuously via a `MutationObserver` so it keeps working as you scroll. A toolbar popup lets you toggle the filter on/off.

get it at https://addons.mozilla.org/en-US/firefox/addon/x-com-video-hider/
