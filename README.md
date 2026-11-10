# Weekend Window - React

Find the best time of the day for popular outdoor activities in the next 7 days.

## Use of AI

I used the Codex CLI.

Prompt examples:

- Extract the localStorage use to a custom React hook.
- When I switch between activities, update the results without fetching the forecast again.

## Autopsy

1. Saving the latest forecast in `localStorage` to avoid repeating the same request after reloading.
   The cached data will expire in 30 minutes, or can be updated with the refresh button.
2. I used AbortController to cancel previous request that might still be active, to prevent unwanted
   updates to cache and UI.
